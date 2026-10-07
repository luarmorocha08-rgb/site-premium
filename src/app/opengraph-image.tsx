import { ImageResponse } from "next/og";

export const alt = "Bárbara Presentes — Presentes que encantam. Momentos que ficam.";
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
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 45%, #3a2614 0%, #12100E 45%, #050505 80%)",
          color: "#F7F4EE",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            width: 130,
            height: 130,
            borderRadius: 999,
            border: "2px solid #C99445",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#E4BB73",
            fontSize: 80,
          }}
        >
          B
        </div>
        <div style={{ marginTop: 34, fontSize: 22, letterSpacing: 14, color: "#C99445" }}>BÁRBARA PRESENTES</div>
        <div style={{ marginTop: 26, fontSize: 64, fontWeight: 300 }}>Presentes que encantam.</div>
        <div style={{ fontSize: 64, fontStyle: "italic", color: "#E7D1AC" }}>Momentos que ficam.</div>
        <div style={{ marginTop: 30, fontSize: 20, letterSpacing: 6, color: "rgba(247,244,238,0.6)" }}>
          PERFUMES · COSMÉTICOS · PRESENTES
        </div>
      </div>
    ),
    size,
  );
}
