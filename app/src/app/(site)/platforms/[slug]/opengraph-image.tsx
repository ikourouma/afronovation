import { ImageResponse } from "next/og";

import { getCollection } from "@/lib/cms/read";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  const platforms = await getCollection("platformPages");
  return platforms.map((platform) => ({ slug: platform.slug }));
}

export default async function PlatformOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const platform = (await getCollection("platformPages")).find((item) => item.slug === slug);
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
            "radial-gradient(circle at 100% 0%, rgba(109,82,216,0.45), transparent 55%), radial-gradient(circle at 0% 100%, rgba(226,92,158,0.22), transparent 50%), #02132c",
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
              color: "#f3a9cf",
              marginBottom: 16,
            }}
          >
            {sector}
          </div>
        ) : null}
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, color: "#f4f6fb" }}>
          {name}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 32,
            color: "#c9b8ff",
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
            color: "#f4f6fb",
          }}
        >
          <span style={{ color: "#c9b8ff" }}>a</span>fronovation
        </div>
      </div>
    ),
    { ...size },
  );
}
