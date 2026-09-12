import type { Metadata } from "next";
import { BackToHome } from "@/components/layout/BackToHome";
import { ExperienceSection } from "@/components/portafolio/ExperienceSection";
import { getExperiences, getSectionHeaders } from "@/lib/data";
import { sectionRoute } from "@/lib/navigation";

const SECTION = "experiencia";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const headers = await getSectionHeaders();
  return {
    title: headers.experiencia?.title ?? "Experiencia",
    description: headers.experiencia?.description,
    alternates: { canonical: sectionRoute(SECTION) },
  };
}

export default async function ExperienciaPage() {
  const [experiences, headers] = await Promise.all([getExperiences(), getSectionHeaders()]);
  return (
    <>
      <BackToHome section={SECTION} />
      <ExperienceSection experiences={experiences} header={headers.experiencia} isFullPage />
    </>
  );
}
