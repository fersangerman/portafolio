"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { type GalleryImage } from "@/components/ui/OverlapGallery";
import FigmaEmbed from "@/components/ui/FigmaEmbed";

export interface BenchmarkItem {
  name: string;
  image: string;
  text: string;
}

export interface CaseStudySection {
  id: string;
  title: string;
  body: string;
  images?: GalleryImage[];
  carousel?: boolean;
  benchmarks?: BenchmarkItem[];
  figmaEmbed?: string;
}

function Carousel({ images }: { images: GalleryImage[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  const validImages = images.filter((img) => img.src);

  return (
    <div className="relative w-full rounded-xl overflow-hidden bg-cream-dark mb-8">
      <div className="relative w-full">
        {validImages.map((img, i) => (
          <div
            key={i}
            className={`transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0 absolute inset-0"}`}
          >
            <Image
              src={img.src!}
              alt={img.alt ?? ""}
              width={1200}
              height={800}
              className="w-full h-auto block"
            />
          </div>
        ))}
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-2 py-3">
        {validImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              i === current ? "bg-violet w-4" : "bg-ink-light"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function BenchmarkGrid({ items }: { items: BenchmarkItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-0 mb-8">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col">
          <div className="h-80 flex items-center justify-center">
            <img src={item.image} alt={item.name} className="w-full h-full object-contain block" />
          </div>
          <h3 className="text-sm font-semibold text-ink text-center mt-4 mb-3">
            {item.name}
          </h3>
          <p className="text-sm text-ink-muted leading-relaxed text-center">{item.text}</p>
        </div>
      ))}
    </div>
  );
}

function SectionImages({ images }: { images: GalleryImage[] }) {
  const hasHalf = images.some((img) => img.size === "half");
  const isSmallGroup = images.every((img) => img.size === "small");

  if (isSmallGroup) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {images.map((img, i) =>
          img.src ? (
            <div key={i} className="rounded-xl overflow-hidden bg-cream-dark">
              <Image src={img.src} alt={img.alt ?? ""} width={600} height={900} className="w-full h-auto block" />
            </div>
          ) : null
        )}
      </div>
    );
  }

  if (hasHalf) {
    const halfImages = images.filter((img) => img.src);
    const isSingle = halfImages.length === 1;
    return (
      <div className={isSingle ? "flex justify-center mb-8" : "grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"}>
        {images.map((img, i) =>
          img.src ? (
            <div key={i} className={`rounded-xl overflow-hidden bg-cream-dark${isSingle ? " w-1/2" : ""}`}>
              <Image src={img.src} alt={img.alt ?? ""} width={800} height={1000} className="w-full h-auto block" />
            </div>
          ) : null
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mb-8">
      {images.map((img, i) =>
        img.src ? (
          <div key={i} className="rounded-xl overflow-hidden bg-cream-dark">
            {img.src.endsWith(".mp4") ? (
              <video src={img.src} autoPlay loop muted playsInline className="w-full h-auto block" />
            ) : (
              <Image src={img.src} alt={img.alt ?? ""} width={1200} height={800} className="w-full h-auto block" />
            )}
          </div>
        ) : null
      )}
    </div>
  );
}

interface UXCaseStudyProps {
  sections: CaseStudySection[];
  locale: string;
}

export default function UXCaseStudy({ sections, locale }: UXCaseStudyProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = sectionRefs.current.get(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = sectionRefs.current.get(id);
    if (!el) return;
    const offset = 96; // header height
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const isEs = locale === "es";

  return (
    <div className="relative flex gap-0 md:gap-16 px-6 md:px-12 lg:px-24 py-16 bg-white">

      {/* ── Sticky sidebar (desktop) ── */}
      <aside className="hidden lg:block w-48 shrink-0">
        <nav className="sticky top-28">
          <p className="text-xs text-ink-light uppercase tracking-widest font-semibold mb-4">
            {isEs ? "Contenido" : "Contents"}
          </p>
          <ul className="space-y-1">
            {sections.map(({ id, title }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className={`text-left w-full text-sm leading-snug py-1.5 pl-3 border-l-2 transition-all duration-200 ${
                    activeId === id
                      ? "border-violet text-ink font-medium"
                      : "border-border text-ink-muted hover:text-ink hover:border-ink-light"
                  }`}
                >
                  {title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* ── Mobile top nav ── */}
      <div className="lg:hidden -mx-6 md:-mx-12 px-6 md:px-12 mb-10 overflow-x-auto">
        <div className="flex gap-2 pb-1 min-w-max">
          {sections.map(({ id, title }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full border whitespace-nowrap transition-all duration-200 ${
                activeId === id
                  ? "bg-violet text-white border-violet"
                  : "bg-transparent text-ink-muted border-border hover:border-ink-light hover:text-ink"
              }`}
            >
              {title}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 space-y-20">
        {sections.map(({ id, title, body, images, carousel, benchmarks, figmaEmbed }) => (
          <section
            key={id}
            id={id}
            ref={(el) => {
              if (el) sectionRefs.current.set(id, el);
              else sectionRefs.current.delete(id);
            }}
          >
            <h2 className="text-xs text-violet uppercase tracking-widest font-semibold mb-3">
              {title}
            </h2>
            <div className="text-ink-muted leading-relaxed whitespace-pre-line mb-8">
              {body}
            </div>

            {benchmarks && benchmarks.length > 0 && (
              <BenchmarkGrid items={benchmarks} />
            )}

            {images && images.length > 0 && (
              carousel
                ? <Carousel images={images} />
                : <SectionImages images={images} />
            )}

            {figmaEmbed && (
              <FigmaEmbed url={figmaEmbed} title={title} />
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
