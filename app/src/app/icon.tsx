import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 7,
        }}
      >
        <span
          style={{
            fontSize: 21,
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
