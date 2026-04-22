"use client";

import { useEffect, useState } from "react";

const colors = [
  "#EDEAF8", // violeta claro
  "#C8BFEA", // violeta medio
  "#F7E8D4", // melocotón
  "#D4EAE0", // menta
  "#F9E2E2", // rosa
  "#E8EEF9", // azul lavanda
  "#FAF0CC", // amarillo suave (como el de referencia)
];

export default function BrushStrokes() {
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colors.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const color = colors[colorIndex];

  return (
    <svg
      viewBox="0 0 1440 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {/* Serpentina superior — cruza de izquierda a derecha */}
      <path
        d="M -100 80
           C 100 20, 300 160, 500 100
           C 700 40, 900 180, 1100 110
           C 1300 50, 1480 140, 1560 100
           C 1580 148, 1480 210, 1300 176
           C 1100 200, 900 260, 700 180
           C 500 170, 300 240, 100 150
           C -20 170, -120 150, -100 80 Z"
        fill={color}
        style={{ transition: "fill 1.4s ease-in-out" }}
        opacity="0.9"
      />

      {/* Serpentina inferior — cruza en sentido opuesto */}
      <path
        d="M 1560 420
           C 1360 360, 1160 500, 960 430
           C 760 370, 560 510, 360 440
           C 160 380, -40 480, -100 440
           C -120 500, -40 560, 160 520
           C 360 560, 560 590, 760 530
           C 960 510, 1160 590, 1360 540
           C 1480 560, 1580 500, 1560 420 Z"
        fill={color}
        style={{ transition: "fill 1.4s ease-in-out", transitionDelay: "0.5s" }}
        opacity="0.75"
      />
    </svg>
  );
}
