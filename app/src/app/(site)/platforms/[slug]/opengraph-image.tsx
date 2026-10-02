import { ImageResponse } from "next/og";

import { getPlatformBySlug, platforms } from "@/content/platforms";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return platforms.map((platform) => ({ slug: platform.slug }));
}

export default async function PlatformOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const platform = getPlatformBySlug(slug);
  const name = platform?.name ?? "Afronovation Platform";
  const tagline = platform?.tagline ?? "";
  const sector = platform?.sector ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background:
            "radial-gradient(circle at 15% 0%, rgba(227,178,60,0.25), transparent 55%), radial-gradient(circle at 100% 100%, rgba(66,168,155,0.22), transparent 55%), #10141c",
        }}
      >
        {sector ? (
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#42a89b",
              marginBottom: 16,
            }}
          >
            {sector}
          </div>
        ) : null}
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#f5f5f0" }}>
          {name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 32,
            color: "#e3b23c",
            maxWidth: 980,
            lineHeight: 1.3,
          }}
        >
          {tagline}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 26,
            fontWeight: 600,
            color: "#f5f5f0",
          }}
        >
          <span style={{ color: "#e3b23c" }}>a</span>fronovation
        </div>
      </div>
    ),
    { ...size },
  );
}
