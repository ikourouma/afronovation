import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#151a24",
        }}
      >
        <span
          style={{
            fontSize: 108,
            fontWeight: 700,
            color: "#e3b23c",
            lineHeight: 1,
            fontFamily: "sans-serif",
          }}
        >
          a
        </span>
      </div>
    ),
    { ...size },
  );
}
