"use client";

import { useEffect, useRef } from "react";

export default function PreviewBlob() {
  const blobRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    const blob = blobRef.current;
    const hero = heroRef.current;
    if (!blob || !hero) return;

    const onMove = (e: MouseEvent) => {
      if (!visible.current) {
        blob.style.opacity = "1";
        visible.current = true;
      }
      const rect = hero.getBoundingClientRect();
      blob.style.left = e.clientX - rect.left + "px";
      blob.style.top = e.clientY - rect.top + "px";
    };

    const onLeave = () => {
      blob.style.opacity = "0";
      visible.current = false;
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAF8] font-sans">

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-start justify-center overflow-hidden px-6 md:px-12 lg:px-24"
      >
        {/* Blob — más grande, más intenso */}
        <div
          ref={blobRef}
          style={{
            position: "absolute",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(155,141,200,0.55) 0%, rgba(155,141,200,0.18) 55%, transparent 72%)",
            filter: "blur(60px)",
            pointerEvents: "none",
            transform: "translate(-50%, -50%)",
            transition:
              "left 0.18s cubic-bezier(0.25,0.46,0.45,0.94), top 0.18s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.4s ease",
            opacity: 0,
            willChange: "left, top",
          }}
        />

        {/* Contenido alineado a la izquierda */}
        <div className="relative z-10 text-left max-w-4xl w-full">
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#A8A29E] font-medium mb-6">
            Diseñadora &amp; Marketera Digital
          </p>
          <h1 className="text-[clamp(3rem,8vw,6rem)] font-semibold leading-[1.05] tracking-tight text-[#1A1714] mb-12">
            <span className="block">Diseño que</span>
            <span className="block">comunica,</span>
            <span className="block">convierte</span>
            <span className="block">y conecta.</span>
          </h1>
          <div className="flex items-center justify-start gap-6">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#9B8DC8] text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-[#7A6AAA] transition-colors"
            >
              Ver portafolio →
            </a>
            <a
              href="#"
              className="text-sm font-medium text-[#706C69] hover:text-[#1A1714] transition-colors"
            >
              Descargar CV
            </a>
          </div>
        </div>
      </section>

      {/* Separador para ver que el blob no sale */}
      <section className="px-8 py-24 border-t border-[#E8E5E1] text-center">
        <p className="text-[#A8A29E] text-xs uppercase tracking-widest">
          ↑ El blob no pasa de aquí
        </p>
      </section>

      {/* Nota */}
      <div className="fixed bottom-5 right-5 bg-[#1A1714] text-[#FAFAF8] text-xs px-4 py-3 rounded-xl max-w-[220px] leading-relaxed opacity-80">
        Mueve el cursor por el hero para ver el efecto
      </div>
    </div>
  );
}
