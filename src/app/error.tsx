"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h1 className="mb-4 text-3xl font-bold">No se pudo cargar el contenido</h1>
      <p className="mb-6 text-muted-foreground">
        Inténtalo de nuevo en unos segundos.
        {error.digest && <span className="ml-2 font-mono text-xs">Ref: {error.digest}</span>}
      </p>
      <Button onClick={reset}>Reintentar</Button>
    </section>
  );
}
