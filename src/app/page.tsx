import { AboutSection } from "@/components/portafolio/AboutSection";
import { ContactSection } from "@/components/portafolio/ContactSection";
import { EducationSection } from "@/components/portafolio/EducationSection";
import { ExperienceSection } from "@/components/portafolio/ExperienceSection";
import { HeroSection } from "@/components/portafolio/HeroSection";
import { PortafolioSection } from "@/components/portafolio/PortafolioSection";
import { ServicesSection } from "@/components/portafolio/ServicesSection";
import { TutorialsSection } from "@/components/portafolio/TutorialsSection";
import { getHomeData } from "@/lib/data";
import { sectionRoute } from "@/lib/navigation";

// ISR: la home se genera como HTML estático y se regenera como máximo cada hora.
// Ninguna visita consulta la base de datos.
export const revalidate = 3600;

export default async function HomePage() {
  const { profile, services, projects, tutorials, skills, experiences, education, sectionHeaders } =
    await getHomeData();

  return (
    <>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} skills={skills} header={sectionHeaders["sobre-mi"]} />
      <ServicesSection id="servicios" services={services} header={sectionHeaders.servicios} moreHref={sectionRoute("servicios")} />
      <ExperienceSection id="experiencia" experiences={experiences} header={sectionHeaders.experiencia} moreHref={sectionRoute("experiencia")} />
      <EducationSection id="formacion" education={education} header={sectionHeaders.formacion} moreHref={sectionRoute("formacion")} />
      <PortafolioSection id="portafolio" projects={projects} header={sectionHeaders.portafolio} moreHref={sectionRoute("portafolio")} />
      <TutorialsSection id="tutoriales" tutorials={tutorials} header={sectionHeaders.tutoriales} moreHref={sectionRoute("tutoriales")} />
      <ContactSection profile={profile} header={sectionHeaders.contacto} />
    </>
  );
}
