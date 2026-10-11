import "server-only";

/**
 * Store id for OIDC auth. When the connected read-write token is set, return
 * null so callers do not pass storeId. @vercel/blob ignores BLOB_READ_WRITE_TOKEN
 * if an OIDC token and a store id are both present.
 */
export async function ensureMinutesBlobStoreId() {
  if (process.env.BLOB_READ_WRITE_TOKEN?.trim()) return null;
  const storeId = process.env.BLOB_STORE_ID?.trim();
  return storeId || null;
}
