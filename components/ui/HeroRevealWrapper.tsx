"use client";

import dynamic from "next/dynamic";

const HeroReveal = dynamic(() => import("./HeroReveal"), { ssr: false });

export default HeroReveal;
