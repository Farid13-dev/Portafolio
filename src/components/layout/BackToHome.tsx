import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sectionAnchor, type FullPageSectionId } from "@/lib/navigation";

interface BackToHomeProps {
  /** Sección de la home a la que devuelve el botón (la que originó esta página). */
  section: FullPageSectionId;
}

/**
 * Vuelve a la home aterrizando en la sección de la que salió el usuario, no
 * arriba del todo. Es Server Component a propósito: la sección se conoce en
 * build, así que no hace falta usePathname() ni bajar JS a estas 5 rutas.
 */
export function BackToHome({ section }: BackToHomeProps) {
  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <Button variant="outline" asChild>
        <Link href={sectionAnchor(section)}>
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Volver al inicio
        </Link>
      </Button>
    </div>
  );
}
