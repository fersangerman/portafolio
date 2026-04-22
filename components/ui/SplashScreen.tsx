"use client";

import { useEffect, useState } from "react";

type Phase = "idle" | "name" | "subtitle" | "exit" | "done";

export default function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("name"),     100);
    const t2 = setTimeout(() => setPhase("subtitle"), 900);
    const t3 = setTimeout(() => setPhase("exit"),     2400);
    const t4 = setTimeout(() => {
      setPhase("done");
      window.dispatchEvent(new Event("splashDone"));
    }, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  if (phase === "done") return null;

  const isExiting = phase === "exit";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#9B8DC8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        transform: isExiting ? "translateY(-100%)" : "translateY(0)",
        transition: isExiting ? "transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)" : "none",
        pointerEvents: isExiting ? "none" : "all",
      }}
    >
      {/* Nombre */}
      <div style={{ overflow: "hidden" }}>
        <p
          style={{
            fontFamily: "var(--font-jakarta), Arial, sans-serif",
            color: "#FAFAF8",
            fontSize: "clamp(2.2rem, 6vw, 4rem)",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            lineHeight: 1.1,
            transform: phase === "idle" ? "translateY(110%)" : "translateY(0)",
            opacity: phase === "idle" ? 0 : 1,
            transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease",
          }}
        >
          Fer San Germán
        </p>
      </div>

      {/* Subtítulo */}
      <div style={{ overflow: "hidden" }}>
        <p
          style={{
            fontFamily: "var(--font-jakarta), Arial, sans-serif",
            color: "rgba(250,250,248,0.65)",
            fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            transform: phase === "idle" || phase === "name" ? "translateY(110%)" : "translateY(0)",
            opacity: phase === "idle" || phase === "name" ? 0 : 1,
            transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease",
          }}
        >
          Graphic Design · UX/UI · Digital Marketing
        </p>
      </div>
    </div>
  );
}
