import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { getProfile } from "@/lib/data";
import { FALLBACK_PROFILE } from "@/lib/profile-fallback";
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: ["Ingeniero de Software", "Backend", "Next.js", "TypeScript", "React", "IA", "Colombia"],
  authors: [{ name: SITE_AUTHOR }],
  // El favicon lo resuelve src/app/icon.svg por convención del App Router.
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: SITE_NAME,
    title: `${SITE_NAME} - Portafolio`,
    description: SITE_DESCRIPTION,
    // La imagen la genera src/app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - Portafolio`,
    description: SITE_DESCRIPTION,
  },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const profile = await getProfile();

  return (
    // suppressHydrationWarning: next-themes añade la clase del tema en cliente
    <html lang="es" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className={`${geistSans.variable} flex min-h-screen flex-col bg-background text-foreground antialiased`}>
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only z-[100] rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
          >
            Saltar al contenido principal
          </a>
          <Navigation
            logoImage={profile?.logoImage ?? null}
            firstName={profile?.firstName ?? FALLBACK_PROFILE.firstName}
            lastName={profile?.lastName ?? FALLBACK_PROFILE.lastName}
          />
          <main id="main-content" tabIndex={-1} className="flex-1 pt-16">
            {children}
          </main>
          <Footer profile={profile} />
        </ThemeProvider>
      </body>
    </html>
  );
}
