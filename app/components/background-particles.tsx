"use client";

import { useEffect, useState } from "react";
import Particles from "./particles";

export default function BackgroundParticles() {
  const [particleCount, setParticleCount] = useState(50);

  useEffect(() => {
    // Dynamically adjust particles based on window width for performance
    const updateParticles = () => {
      if (window.innerWidth < 768) {
        setParticleCount(600); // Mobile count
      } else {
        setParticleCount(1500); // Desktop count
      }
    };

    updateParticles();
    window.addEventListener("resize", updateParticles);
    return () => window.removeEventListener("resize", updateParticles);
  }, []);

  return (
    <Particles
      className="fixed inset-0 -z-10 animate-fade-in pointer-events-none"
      quantity={particleCount}
    />
  );
}
