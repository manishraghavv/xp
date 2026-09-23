import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "XpmindGlobal | Enterprise SAP® Solutions That Drive Growth";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #04080F 0%, #070D1C 50%, #0D1830 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 24px",
              borderRadius: "12px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
            }}
          >
            <span style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "1px" }}>
              XpmindGlobal
            </span>
          </div>
          <div
            style={{
              padding: "8px 20px",
              borderRadius: "50px",
              background: "rgba(6, 182, 212, 0.15)",
              border: "1px solid rgba(6, 182, 212, 0.3)",
              color: "#06B6D4",
              fontSize: "16px",
              fontWeight: "700",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            20+ Years SAP® Excellence
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "900",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              color: "#FFFFFF",
              margin: 0,
            }}
          >
            Enterprise SAP® Solutions That Drive Growth.
          </h1>
          <p style={{ fontSize: "24px", color: "#94A3B8", margin: 0, maxWidth: "900px" }}>
            S/4HANA Migration · Cloud BTP · Financial Analytics · GRC & Compliance · AMS Support
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "24px",
            fontSize: "18px",
            color: "#64748B",
          }}
        >
          <span>Greater Noida West, India · info@xpmindglobal.com</span>
          <span style={{ color: "#06B6D4", fontWeight: "700" }}>www.xpmindglobal.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
