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
          background: "#050505",
        }}
      >
        <div
          style={{
            width: 150,
            height: 150,
            borderRadius: 999,
            border: "2px solid #C99445",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#E4BB73",
            fontSize: 96,
            fontFamily: "serif",
          }}
        >
          B
        </div>
      </div>
    ),
    size,
  );
}
