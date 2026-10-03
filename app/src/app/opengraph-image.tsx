import { ImageResponse } from "next/og";

import { tagline } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Afronovation - strategy, technology and digital transformation";

/** Default share image, in the Capabilities Portfolio style. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 100% 0%, rgba(109,82,216,0.45), transparent 55%), radial-gradient(circle at 0% 100%, rgba(226,92,158,0.22), transparent 50%), #02132c",
          color: "#f4f6fb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", fontSize: 44, fontWeight: 700 }}>
          afronovation
          <span style={{ color: "#e25c9e", marginLeft: 2 }}>.</span>
        </div>
        <div style={{ display: "flex", fontSize: 54, fontWeight: 700, lineHeight: 1.15, maxWidth: 1000 }}>
          {tagline}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 6, width: 360, background: "linear-gradient(90deg, #e25c9e, #6d52d8)" }} />
          <div style={{ display: "flex", marginTop: 20, fontSize: 26, color: "#b4bfd2" }}>
            United States · Côte d&apos;Ivoire · Guinea · Sierra Leone
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
