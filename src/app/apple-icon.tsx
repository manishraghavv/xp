import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 90,
          background: "#04080F",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#F59E0B",
          fontWeight: 900,
          borderRadius: "36px",
          border: "4px solid rgba(245, 158, 11, 0.4)",
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
