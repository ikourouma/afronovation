/**
 * Resolves a stored media reference to a URL. Accepts full URLs and site
 * paths as-is (e.g. admin uploads), and turns bare keys ("team/x.jpg") into
 * R2 URLs, or local staging paths until R2_PUBLIC_URL is configured.
 */
export function media(key: string): string {
  if (/^https?:\/\//.test(key) || key.startsWith("/")) {
    return key;
  }
  const base = process.env.R2_PUBLIC_URL;
  if (base) {
    return `${base.replace(/\/$/, "")}/${key}`;
  }
  return `/media-staging/${key}`;
}

export function mediaImage(key: string, alt: string) {
  return {
    src: media(key),
    alt,
  };
}
