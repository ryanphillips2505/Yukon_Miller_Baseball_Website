import "server-only";

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

export async function ensureMinutesBlobStoreId() {
  if (process.env.BLOB_STORE_ID) return process.env.BLOB_STORE_ID;
  if (!process.env.VERCEL_OIDC_TOKEN || !process.env.VERCEL_PROJECT_ID) {
    return null;
  }

  const projectId = process.env.VERCEL_PROJECT_ID;
  const listed = await vercelJson(
    `/v1/storage/stores?projectId=${encodeURIComponent(projectId)}`,
  );
  const stores: BlobStore[] = Array.isArray(listed.data)
    ? listed.data
    : ((listed.data as { stores?: BlobStore[] } | null)?.stores ?? []);
  const existing =
    stores.find((store) => store.kind === "project-default") ??
    stores.find((store) => store.name?.toLowerCase().includes("minute")) ??
    stores[0];
  const existingId = storeIdOf(existing);
  if (existingId) return existingId;

  const created = await vercelJson("/v1/storage/stores/blob", {
    method: "POST",
    body: JSON.stringify({
      name: "yukon-minutes",
      region: "iad1",
      access: "private",
      projectId,
    }),
  });
  const createdStore = (created.data as { store?: BlobStore } | null)?.store;
  const createdId = storeIdOf(createdStore);
  if (createdId) return createdId;

  const alt = await vercelJson("/storage/stores/blob", {
    method: "POST",
    body: JSON.stringify({
      name: "yukon-minutes",
      region: "iad1",
      access: "private",
      projectId,
    }),
  });
  const altStore = (alt.data as { store?: BlobStore } | null)?.store;
  return storeIdOf(altStore);
}
