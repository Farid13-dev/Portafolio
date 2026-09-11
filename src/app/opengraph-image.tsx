import { ImageResponse } from "next/og";
import { getProfile } from "@/lib/data";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} - Portafolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const profile = await getProfile();
  const name = profile ? `${profile.firstName} ${profile.lastName}` : "Oliver Farid Rodríguez Morales";
  const title = profile?.title ?? "Ingeniero de Software";

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
          background: "linear-gradient(135deg, #18181b 0%, #3f3f46 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#a1a1aa", letterSpacing: 4, textTransform: "uppercase" }}>{SITE_NAME}</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>{name}</div>
        <div style={{ fontSize: 40, color: "#d4d4d8", marginTop: 24 }}>{title}</div>
      </div>
    ),
    size,
  );
}
