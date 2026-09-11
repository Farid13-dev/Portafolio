"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type SafeImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string | null | undefined;
  alt: string;
  /** Qué mostrar si no hay src o la imagen falla al cargar */
  fallback?: React.ReactNode;
};

/**
 * next/image con fallback. Es la única pieza cliente de las imágenes:
 * next/image necesita `onError` en cliente para poder degradar a un fallback.
 * Las `src` tipo data: se sirven sin optimizar automáticamente.
 */
export function SafeImage({ src, alt, fallback, className, ...props }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      fallback ?? (
        <div
          role="img"
          aria-label={alt}
          className={cn("flex h-full w-full items-center justify-center bg-muted", className)}
        >
          <ImageIcon className="h-12 w-12 text-muted-foreground/50" aria-hidden="true" />
        </div>
      )
    );
  }

  return <Image src={src} alt={alt} className={className} onError={() => setFailed(true)} {...props} />;
}
