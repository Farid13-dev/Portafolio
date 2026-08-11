import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/toaster";
import {Providers} from "@/components/providers/providers";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Farid.ing",
    description: "Portafolio de Oliver Farid Rodríguez Morales - Ingeniero de Software",
    keywords: ["Z.ai", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "AI development", "React"],
    authors: [{name: "Oliver Farid Rodriguez Morales"}],
    icons: {
        icon: [
            { url: "/images/gg.png", sizes: "256x256", type: "image/png" },
        ],
    },
    openGraph: {
        title: "Farid.ing - Portafolio",
        description: "Ingeniero de Software apasionado por crear soluciones tecnológicas innovadoras",
        url: "https://tudominio.com",
        siteName: "Farid.ing",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Farid.ing - Portafolio",
        description: "Ingeniero de Software apasionado por crear soluciones tecnológicas innovadoras",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        >
        <Providers>
            {children}
            <Toaster/>
        </Providers>
        </body>
        </html>
    );
}
