"use client";

import { useState, useEffect, useCallback } from "react";

export interface GalleryItem {
  src?: string;
  alt?: string;
  color?: string;
  /**
   * full  → ancho completo (6 cols)
   * large → 2/3 de ancho (4 cols)
   * half  → mitad de ancho (3 cols)  ← default
   * small → 1/3 de ancho (2 cols)
   */
  size?: "full" | "large" | "half" | "small";
  /**
   * panoramic → banner ultra-wide, scroll horizontal en mobile
   */
  layout?: "panoramic";
  /**
   * contain → object-contain con altura fija, ideal para logos sobre fondo blanco
   */
  contain?: boolean;
  /**
   * aspect → fuerza un aspect ratio fijo (ej. "9/16"). Usa object-cover para llenar el espacio.
   */
  aspect?: string;
  /**
   * rows → cuántas filas del grid ocupa el elemento (ej. 2 para row-span-2)
   */
  rows?: number;
}

export type GalleryImage = GalleryItem;

export default function OverlapGallery({ images }: { images: GalleryItem[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Solo imágenes reales (con src) forman parte del lightbox
  const lightboxImages = images.filter((img) => img.src);

  const openLightbox = useCallback(
    (i: number) => {
      // Mapear el índice del grid al índice del lightbox (solo imgs con src)
      const src = images[i]?.src;
      if (!src) return;
      const lbIdx = lightboxImages.findIndex((img) => img.src === src);
      if (lbIdx !== -1) setLightboxIndex(lbIdx);
    },
    [images, lightboxImages]
  );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setLightboxIndex((idx) =>
      idx === null ? null : (idx - 1 + lightboxImages.length) % lightboxImages.length
    );
  }, [lightboxImages.length]);

  const next = useCallback(() => {
    setLightboxIndex((idx) =>
      idx === null ? null : (idx + 1) % lightboxImages.length
    );
  }, [lightboxImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, prev, next]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-6 gap-3 items-start px-4 md:px-6">
        {images.map((item, i) => {
          const size = item.size ?? "half";

          // Full-bleed: franja edge-to-edge que cancela el padding del grid
          if (item.layout === "panoramic" && item.src) {
            return (
              <button
                key={i}
                type="button"
                className="col-span-6 overflow-hidden cursor-zoom-in outline-none"
                onClick={() => openLightbox(i)}
                aria-label={`Ver imagen: ${item.alt ?? ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt ?? ""}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </button>
            );
          }

          // Columnas: strings completos para Tailwind v4 (sin interpolación dinámica)
          const colClass =
            size === "full"  ? "col-span-6" :
            size === "large" ? "col-span-6 md:col-span-4" :
            size === "small" ? "col-span-6 md:col-span-2" :
                               "col-span-6 md:col-span-3";

          // Filas: row-span opcional
          const rowClass =
            item.rows === 2 ? "row-span-2" :
            item.rows === 3 ? "row-span-3" :
            "";

          // Bloque de color
          if (item.color) {
            return (
              <div
                key={i}
                className={`${colClass} ${rowClass} h-24 md:h-32 rounded-sm`}
                style={{ backgroundColor: item.color }}
              />
            );
          }

          // Imagen con proporción natural (sin object-cover, sin aspect ratio forzado)
          return (
            <button
              key={i}
              type="button"
              className={`${colClass} ${rowClass} ${item.contain ? "bg-white" : "bg-cream-dark"} rounded-sm overflow-hidden cursor-zoom-in text-left outline-none`}
              onClick={() => openLightbox(i)}
              aria-label={`Ver imagen: ${item.alt ?? ""}`}
            >
              {item.aspect ? (
                <div style={{ aspectRatio: item.aspect }} className="w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src!}
                    alt={item.alt ?? ""}
                    className="w-full h-full object-cover"
                    loading={i < 4 ? "eager" : "lazy"}
                  />
                </div>
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={item.src!}
                  alt={item.alt ?? ""}
                  className={item.contain ? "w-full h-48 md:h-64 object-contain p-6" : "w-full h-auto block"}
                  loading={i < 4 ? "eager" : "lazy"}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Contador */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-widest font-medium select-none">
            {lightboxIndex + 1} / {lightboxImages.length}
          </div>

          {/* Botón cerrar */}
          <button
            type="button"
            className="absolute top-5 right-6 text-white/60 hover:text-white text-2xl leading-none transition-colors"
            onClick={closeLightbox}
            aria-label="Cerrar"
          >
            ✕
          </button>

          {/* Navegación anterior */}
          {lightboxImages.length > 1 && (
            <button
              type="button"
              className="absolute left-4 md:left-8 text-white/60 hover:text-white text-3xl leading-none transition-colors select-none"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Anterior"
            >
              ←
            </button>
          )}

          {/* Imagen principal */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxImages[lightboxIndex]?.src ?? ""}
            alt={lightboxImages[lightboxIndex]?.alt ?? ""}
            className="max-w-[90vw] max-h-[90vh] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Navegación siguiente */}
          {lightboxImages.length > 1 && (
            <button
              type="button"
              className="absolute right-4 md:right-8 text-white/60 hover:text-white text-3xl leading-none transition-colors select-none"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Siguiente"
            >
              →
            </button>
          )}
        </div>
      )}
    </>
  );
}
