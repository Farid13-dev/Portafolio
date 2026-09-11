import type { Metadata } from "next";
import { BackToHome } from "@/components/layout/BackToHome";
import { PortafolioSection } from "@/components/portafolio/PortafolioSection";
import { getProjects, getSectionHeaders } from "@/lib/data";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const headers = await getSectionHeaders();
  return {
    title: headers.portafolio?.title ?? "Portafolio",
    description: headers.portafolio?.description,
    alternates: { canonical: "/portafolio" },
  };
}

export default async function PortafolioPage() {
  const [projects, headers] = await Promise.all([getProjects(), getSectionHeaders()]);
  return (
    <>
      <BackToHome />
      <PortafolioSection projects={projects} header={headers.portafolio} isFullPage />
    </>
  );
}
