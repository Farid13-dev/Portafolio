import type { Metadata } from "next";
import { BackToHome } from "@/components/layout/BackToHome";
import { TutorialsSection } from "@/components/portafolio/TutorialsSection";
import { getSectionHeaders, getTutorials } from "@/lib/data";
import { sectionRoute } from "@/lib/navigation";

const SECTION = "tutoriales";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const headers = await getSectionHeaders();
  return {
    title: headers.tutoriales?.title ?? "Tutoriales",
    description: headers.tutoriales?.description,
    alternates: { canonical: sectionRoute(SECTION) },
  };
}

export default async function TutorialesPage() {
  const [tutorials, headers] = await Promise.all([getTutorials(), getSectionHeaders()]);
  return (
    <>
      <BackToHome section={SECTION} />
      <TutorialsSection tutorials={tutorials} header={headers.tutoriales} isFullPage />
    </>
  );
}
