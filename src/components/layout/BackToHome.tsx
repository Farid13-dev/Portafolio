import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function BackToHome() {
  return (
    <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <Button variant="outline" asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
          Volver al inicio
        </Link>
      </Button>
    </div>
  );
}
