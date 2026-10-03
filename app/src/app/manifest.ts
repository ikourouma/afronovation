import type { MetadataRoute } from "next";

import { tagline } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Afronovation, Inc.",
    short_name: "Afronovation",
    description: tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#02132c",
    theme_color: "#02132c",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
