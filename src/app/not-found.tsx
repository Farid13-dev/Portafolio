import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h1 className="mb-4 text-3xl font-bold">Página no encontrada</h1>
      <p className="mb-6 text-muted-foreground">La dirección que abriste no existe o fue movida.</p>
      <Button asChild>
        <Link href="/">Volver al inicio</Link>
      </Button>
    </section>
  );
}
