import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Las imágenes (perfil, logo, proyectos, tutoriales) se guardan en la BD como URL.
      // "**" acepta cualquier host https; restringe a tus hosts reales cuando los tengas fijados.
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
