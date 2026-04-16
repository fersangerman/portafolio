"use client";

interface FigmaEmbedProps {
  url: string;
  title?: string;
}

export default function FigmaEmbed({ url, title = "Figma prototype" }: FigmaEmbedProps) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-border bg-cream-dark">
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={url}
          title={title}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
