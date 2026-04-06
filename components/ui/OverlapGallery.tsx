export interface GalleryItem {
  src?: string;
  alt?: string;
  color?: string;
  /**
   * full  → ancho completo, proporción panorámica (16:6)
   * large → 2/3 de ancho, proporción 4:3
   * half  → mitad de ancho, proporción 4:3  ← default
   * small → 1/3 de ancho, proporción 3:4 (vertical)
   */
  size?: "full" | "large" | "half" | "small";
}

export type GalleryImage = GalleryItem;

const ASPECT: Record<string, string> = {
  full:  "aspect-[16/6]",
  large: "aspect-[4/3]",
  half:  "aspect-[4/3]",
  small: "aspect-[3/4]",
};

export default function OverlapGallery({ images }: { images: GalleryItem[] }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="grid grid-cols-6 gap-2 items-start">
      {images.map((item, i) => {
        const size = item.size ?? "half";

        const colClass =
          size === "full"  ? "col-span-6" :
          size === "large" ? "col-span-4" :
          size === "small" ? "col-span-2" :
          "col-span-3";

        const responsiveClass = `col-span-6 md:${colClass}`;
        const aspectClass = ASPECT[size];

        /* ── Bloque de color ── */
        if (item.color) {
          return (
            <div
              key={i}
              className={`${responsiveClass} ${aspectClass}`}
              style={{ backgroundColor: item.color }}
            />
          );
        }

        /* ── Imagen con proporción fija y object-fit: cover ── */
        return (
          <div key={i} className={`${responsiveClass} ${aspectClass} overflow-hidden`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src!}
              alt={item.alt ?? ""}
              className="w-full h-full object-cover"
              loading={i < 4 ? "eager" : "lazy"}
            />
          </div>
        );
      })}
    </div>
  );
}
