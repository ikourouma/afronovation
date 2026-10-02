export function media(key: string): string {
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
