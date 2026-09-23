import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#04080F",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F59E0B",
          fontWeight: 900,
          borderRadius: "6px",
          border: "1px solid rgba(245, 158, 11, 0.5)",
        }}
      >
        XP
      </div>
    ),
    {
      ...size,
    }
  );
}
