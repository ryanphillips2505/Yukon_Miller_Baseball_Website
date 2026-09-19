import "server-only";

export const MINUTES_BLOB_STORE_NAME = "yukon-meeting-minutes";

type BlobStore = {
  id?: string;
  storeId?: string;
  name?: string;
  kind?: string;
  projectId?: string;
};

function vercelAuthHeaders() {
  const token = process.env.VERCEL_OIDC_TOKEN;
  if (!token) return null;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const teamId = process.env.VERCEL_TEAM_ID;
  if (teamId) headers["x-vercel-team-id"] = teamId;
  return headers;
}

function storeIdOf(store: BlobStore | null | undefined) {
  const id = store?.id || store?.storeId;
  return id ? id.replace(/^store_/, "") : null;
}

function storesFrom(data: unknown): BlobStore[] {
  if (Array.isArray(data)) return data as BlobStore[];
  if (data && typeof data === "object") {
    const record = data as {
      stores?: BlobStore[];
      storage?: BlobStore[];
    };
    if (Array.isArray(record.stores)) return record.stores;
    if (Array.isArray(record.storage)) return record.storage;
  }
  return [];
}

async function vercelJson(path: string, init?: RequestInit) {
  const headers = vercelAuthHeaders();
  if (!headers) return { ok: false, status: 401, data: null };
  const url = new URL(path, "https://api.vercel.com");
  const teamId = process.env.VERCEL_TEAM_ID;
  if (teamId && !url.searchParams.has("teamId")) {
    url.searchParams.set("teamId", teamId);
  }
  const response = await fetch(url, {
    ...init,
    headers: { ...headers, ...(init?.headers as Record<string, string>) },
  });
  const data = await response.json().catch(() => null);
  return { ok: response.ok, status: response.status, data };
}

function pickMinutesStore(stores: BlobStore[]) {
  const named = MINUTES_BLOB_STORE_NAME.toLowerCase();
  return (
    stores.find((store) => store.name?.toLowerCase() === named) ??
    stores.find((store) => store.name?.toLowerCase().includes("minute")) ??
    stores.find((store) => store.kind === "project-default") ??
    null
  );
}

async function listBlobStores() {
  const projectId = process.env.VERCEL_PROJECT_ID;
  const paths = [
    "/v1/storage/stores",
    projectId
      ? `/v1/storage/stores?projectId=${encodeURIComponent(projectId)}`
      : null,
    "/v1/storage",
  ].filter((path): path is string => Boolean(path));

  const found: BlobStore[] = [];
  const seen = new Set<string>();
  for (const path of paths) {
    const listed = await vercelJson(path);
    for (const store of storesFrom(listed.data)) {
      const id = storeIdOf(store) || store.name || JSON.stringify(store);
      if (seen.has(id)) continue;
      seen.add(id);
      found.push(store);
    }
  }
  return found;
}

async function connectStoreToProject(storeId: string) {
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!projectId) return;
  const body = JSON.stringify({
    projectId,
    environments: ["production", "preview"],
  });
  const id = storeId.startsWith("store_") ? storeId : `store_${storeId}`;
  await vercelJson(`/v1/storage/stores/${id}/connections`, {
    method: "POST",
    body,
  });
  await vercelJson(`/v1/storage/stores/blob/${id}/connections`, {
    method: "POST",
    body,
  });
}

export async function ensureMinutesBlobStoreId() {
  if (process.env.BLOB_STORE_ID && !process.env.VERCEL_OIDC_TOKEN) {
    return process.env.BLOB_STORE_ID;
  }
  if (!process.env.VERCEL_OIDC_TOKEN && !process.env.BLOB_READ_WRITE_TOKEN) {
    return process.env.BLOB_STORE_ID || null;
  }

  const stores = await listBlobStores();
  const named = pickMinutesStore(stores);
  const namedId = storeIdOf(named);
  if (namedId) {
    void connectStoreToProject(namedId);
    return namedId;
  }

  if (process.env.BLOB_STORE_ID) return process.env.BLOB_STORE_ID;

  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!projectId || !process.env.VERCEL_OIDC_TOKEN) return null;

  const created = await vercelJson("/v1/storage/stores/blob", {
    method: "POST",
    body: JSON.stringify({
      name: MINUTES_BLOB_STORE_NAME,
      region: "iad1",
      access: "private",
      projectId,
    }),
  });
  const createdStore = (created.data as { store?: BlobStore } | null)?.store;
  const createdId = storeIdOf(createdStore);
  if (createdId) {
    void connectStoreToProject(createdId);
    return createdId;
  }

  return null;
}
