import { ImageResponse } from "next/og";

import { tagline } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
        <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#e3b23c" }}>
          <span style={{ color: "#e3b23c" }}>a</span>
          <span style={{ color: "#f5f5f0" }}>fronovation</span>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 52,
            fontWeight: 600,
            color: "#f5f5f0",
            maxWidth: 980,
            lineHeight: 1.2,
          }}
        >
          {tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
