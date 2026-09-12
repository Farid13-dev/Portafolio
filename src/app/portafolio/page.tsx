import type { Metadata } from "next";
import { BackToHome } from "@/components/layout/BackToHome";
import { PortafolioSection } from "@/components/portafolio/PortafolioSection";
import { getProjects, getSectionHeaders } from "@/lib/data";
import { sectionRoute } from "@/lib/navigation";

const SECTION = "portafolio";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const headers = await getSectionHeaders();
  return {
    title: headers.portafolio?.title ?? "Portafolio",
    description: headers.portafolio?.description,
    alternates: { canonical: sectionRoute(SECTION) },
  };
}

export default async function PortafolioPage() {
  const [projects, headers] = await Promise.all([getProjects(), getSectionHeaders()]);
  return (
    <>
      <BackToHome section={SECTION} />
      <PortafolioSection projects={projects} header={headers.portafolio} isFullPage />
    </>
  );
}
