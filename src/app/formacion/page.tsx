import type { Metadata } from "next";
import { BackToHome } from "@/components/layout/BackToHome";
import { EducationSection } from "@/components/portafolio/EducationSection";
import { getEducation, getSectionHeaders } from "@/lib/data";
import { sectionRoute } from "@/lib/navigation";

const SECTION = "formacion";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const headers = await getSectionHeaders();
  return {
    title: headers.formacion?.title ?? "Formación Académica",
    description: headers.formacion?.description,
    alternates: { canonical: sectionRoute(SECTION) },
  };
}

export default async function FormacionPage() {
  const [education, headers] = await Promise.all([getEducation(), getSectionHeaders()]);
  return (
    <>
      <BackToHome section={SECTION} />
      <EducationSection education={education} header={headers.formacion} isFullPage />
    </>
  );
}
