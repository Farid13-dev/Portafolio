import type { Metadata } from "next";
import { BackToHome } from "@/components/layout/BackToHome";
import { ServicesSection } from "@/components/portafolio/ServicesSection";
import { getSectionHeaders, getServices } from "@/lib/data";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const headers = await getSectionHeaders();
  return {
    title: headers.servicios?.title ?? "Servicios",
    description: headers.servicios?.description,
    alternates: { canonical: "/servicios" },
  };
}

export default async function ServiciosPage() {
  const [services, headers] = await Promise.all([getServices(), getSectionHeaders()]);
  return (
    <>
      <BackToHome />
      <ServicesSection services={services} header={headers.servicios} isFullPage />
    </>
  );
}
