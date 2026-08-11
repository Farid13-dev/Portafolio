'use client';

import { useState, HTMLAttributes, ImgHTMLAttributes, useEffect } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ImageWrapperProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: React.ReactNode;
  showFallback?: boolean;
  className?: string;
  containerClassName?: string;
  priority?: boolean; // Para logos y hero images
}

/**
 * Componente de imagen optimizado que soporta múltiples formatos:
 * - PNG
 * - JPG/JPEG
 * - WebP
 * - SVG
 * - GIF
 *
 * Soporta fuentes:
 * - URLs online (http://, https://)
 * - Rutas locales (/images/, ../, etc.)
 * - Base64 (data:image/...)
 *
 * Características:
 * - Manejo de errores automático
 * - Fallback personalizable
 * - Loading states
 * - Lazy loading opcional
 * - Priority loading para imágenes críticas
 */
export function ImageWrapper({
  src,
  alt,
  fallback,
  showFallback = true,
  className = '',
  containerClassName = '',
  loading = 'lazy',
  priority = false,
  ...props
}: ImageWrapperProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
    setImageLoaded(true);
  };

  // Preload para imágenes priority
  useEffect(() => {
    if (priority && typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, priority]);

  // Fallback predeterminado
  const defaultFallback = (
    <div className="w-full h-full flex items-center justify-center bg-muted">
      <ImageIcon className="h-12 w-12 text-muted-foreground/50" />
    </div>
  );

  // Si hay error y se debe mostrar fallback
  if (imageError && showFallback) {
    return (
      <div className={containerClassName || className}>
        {fallback || defaultFallback}
      </div>
    );
  }

  return (
    <div className={`relative ${containerClassName}`}>
      {isLoading && !imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="h-8 w-8 animate-pulse rounded-full bg-primary/20" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
        className={`w-full h-full object-cover ${className}`}
        style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
        {...props}
      />
    </div>
  );
}

/**
 * Componente de imagen para logotipos
 * Optimizado para mostrar solo cuando la imagen está cargada
 */
export function LogoImage({
  src,
  alt = 'Logo',
  className = '',
  fallbackText,
  ...props
}: Omit<ImageWrapperProps, 'fallback' | 'showFallback'> & {
  fallbackText?: string;
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleError = () => {
    setImageError(true);
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  // Preload del logo para que cargue más rápido
  useEffect(() => {
    if (typeof window !== 'undefined' && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => setImageLoaded(true);
      img.onerror = () => setImageError(true);
    }
  }, [src]);

  // Mostrar el fallback solo si hay error, no mientras carga
  if (imageError) {
    const fallback = fallbackText ? (
      <span className="text-2xl font-bold text-primary">
        {fallbackText}
      </span>
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-primary/10">
        <ImageIcon className="h-8 w-8 text-primary" />
      </div>
    );
    return <div className={className}>{fallback}</div>;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="eager"
      onError={handleError}
      onLoad={handleLoad}
      className={className}
      style={{
        opacity: imageLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        display: 'block',
      }}
      {...props}
    />
  );
}
