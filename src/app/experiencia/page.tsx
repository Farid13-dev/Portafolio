import type { Metadata } from "next";
import { BackToHome } from "@/components/layout/BackToHome";
import { ExperienceSection } from "@/components/portafolio/ExperienceSection";
import { getExperiences, getSectionHeaders } from "@/lib/data";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const headers = await getSectionHeaders();
  return {
    title: headers.experiencia?.title ?? "Experiencia",
    description: headers.experiencia?.description,
    alternates: { canonical: "/experiencia" },
  };
}

export default async function ExperienciaPage() {
  const [experiences, headers] = await Promise.all([getExperiences(), getSectionHeaders()]);
  return (
    <>
      <BackToHome />
      <ExperienceSection experiences={experiences} header={headers.experiencia} isFullPage />
    </>
  );
}
