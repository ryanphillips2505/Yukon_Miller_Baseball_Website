export function mediaRequestAllowed(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  let url: URL;
  try {
    url = new URL(origin);
  } catch {
    return false;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return false;
  const forwarded = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!forwarded) return false;
  const host = forwarded.split(",")[0]?.trim().toLowerCase();
  return Boolean(host) && url.host.toLowerCase() === host;
}
