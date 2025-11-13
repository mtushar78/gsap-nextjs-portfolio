"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function AnimatedHero() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".hero-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".hero-subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <h1 className="hero-title text-6xl font-bold">Your Name</h1>
      <p className="hero-subtitle text-2xl mt-4">Web Developer & Designer</p>
    </div>
  );
}
