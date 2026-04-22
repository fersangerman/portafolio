"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface HeroRevealProps {
  role: string;
  headline: string;
  cta: string;
  locale: string;
  portfolioHref: string;
}

export default function HeroReveal({
  role,
  headline,
  cta,
  locale,
  portfolioHref,
}: HeroRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Typewriter: índice de cuántos caracteres mostrar
  const [count, setCount] = useState(-1); // -1 = aún no arrancó
  const [done, setDone] = useState(false);
  const [cursorHidden, setCursorHidden] = useState(false);

  // Reveal del role label
  useEffect(() => {
    const el = containerRef.current?.querySelector<HTMLElement>("[data-role]");
    if (!el) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transform = "translateY(0)";
        el.style.opacity = "1";
      });
    });
  }, []);

  // Typewriter arranca casi inmediato
  useEffect(() => {
    const boot = setTimeout(() => setCount(0), 300);
    return () => clearTimeout(boot);
  }, []);

  // Intervalo de escritura
  useEffect(() => {
    if (count < 0) return;
    if (count >= headline.length) {
      // Terminó — parpadea 1.5s, luego cursor desaparece y aparecen CTAs
      const t1 = setTimeout(() => setCursorHidden(true), 1500);
      const t2 = setTimeout(() => {
        setDone(true);
        const ctaEl = ctaRef.current;
        if (ctaEl) {
          ctaEl.style.transition = "transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.8s ease";
          ctaEl.style.transform = "translateY(0)";
          ctaEl.style.opacity = "1";
        }
      }, 2100);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    const t = setTimeout(() => setCount((c) => c + 1), 110);
    return () => clearTimeout(t);
  }, [count, headline.length]);

  // Blob centrado al cargar, sigue al mouse
  useEffect(() => {
    const section = containerRef.current?.closest("section") as HTMLElement | null;
    const blob = blobRef.current;
    if (!section || !blob) return;
    const rect = section.getBoundingClientRect();
    blob.style.left = rect.width / 2 + "px";
    blob.style.top = rect.height / 2 + "px";
    blob.style.opacity = "1";
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      blob.style.left = e.clientX - r.left + "px";
      blob.style.top = e.clientY - r.top + "px";
    };
    section.addEventListener("mousemove", onMove);
    return () => section.removeEventListener("mousemove", onMove);
  }, []);

  // Renderiza el headline línea por línea según `count`
  const lines = headline.split("\n");
  const renderedLines = lines.map((line, i) => {
    const lineStart = lines.slice(0, i).reduce((acc, l) => acc + l.length + 1, 0);
    const lineEnd = lineStart + line.length;
    const visibleChars = Math.max(0, Math.min(count - lineStart, line.length));
    const text = line.slice(0, visibleChars);
    const isTypingHere = count > lineStart && count <= lineEnd;
    const isLastLine = i === lines.length - 1;
    const showCursor = (isTypingHere || (isLastLine && count >= lineEnd)) && !done;

    return (
      <div key={i} style={{ minHeight: "1.05em", display: "block" }}>
        {text}
        {showCursor && !cursorHidden && (
          <span
            aria-hidden="true"
            className="tw-cursor"
            style={{
              display: "inline-block",
              width: "2px",
              height: "0.82em",
              background: "#1A1714",
              marginLeft: "2px",
              verticalAlign: "middle",
              borderRadius: "1px",
            }}
          />
        )}
      </div>
    );
  });

  return (
    <>
      <style>{`
        .tw-cursor { animation: tw-blink 0.75s step-end infinite; }
        @keyframes tw-blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      {/* Blob */}
      <div
        ref={blobRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(155,141,200,0.55) 0%, rgba(155,141,200,0.18) 55%, transparent 72%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transition: "left 0.18s cubic-bezier(0.25,0.46,0.45,0.94), top 0.18s cubic-bezier(0.25,0.46,0.45,0.94)",
          opacity: 0,
          willChange: "left, top",
          zIndex: 0,
        }}
      />

      <div ref={containerRef} className="relative z-10 flex flex-col items-center text-center w-full">

        {/* Role */}
        <div style={{ overflow: "hidden", marginBottom: "1.5rem" }}>
          <span
            data-role
            style={{
              display: "block",
              transform: "translateY(110%)",
              opacity: 0,
              transition: "transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s, opacity 0.9s ease 0.1s",
            }}
            className="text-xs text-ink-light uppercase tracking-[0.2em] font-medium"
          >
            {role}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.05] tracking-tight max-w-4xl text-ink mb-12">
          {count < 0 ? (
            // Antes de arrancar: espacio vacío para reservar altura
            lines.map((_, i) => <div key={i} style={{ minHeight: "1.05em" }} />)
          ) : (
            renderedLines
          )}
        </h1>

        {/* CTAs */}
        <div style={{ overflow: "hidden" }}>
          <div
            ref={ctaRef}
            style={{ transform: "translateY(110%)", opacity: 0, display: "flex", alignItems: "center", gap: "1.5rem" }}
          >
            <Link
              href={portfolioHref}
              className="inline-flex items-center gap-2 text-sm font-semibold bg-violet text-white px-7 py-3.5 rounded-full hover:bg-violet-dark transition-colors"
            >
              {cta} →
            </Link>
            <a
              href="/Fernanda_SanGerman_CV.pdf"
              download
              className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
            >
              {locale === "es" ? "Descargar CV" : "Download CV"}
            </a>
          </div>
        </div>

      </div>
    </>
  );
}
