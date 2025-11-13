"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Animate title words
      tl.from(".hero-word", {
        y: 100,
        opacity: 0,
        rotationX: -90,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
      })
        .from(
          ".hero-subtitle",
          {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-cta",
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

      // Parallax effect on scroll
      gsap.to(".hero-bg", {
        yPercent: 50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black dark:bg-gray-950"
    >
      {/* Background with parallax */}
      <div className="hero-bg absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-white"
        >
          {"Creative".split("").map((char, i) => (
            <span key={i} className="hero-word inline-block">
              {char}
            </span>
          ))}
          <br />
          {"Developer".split("").map((char, i) => (
            <span key={i} className="hero-word inline-block">
              {char}
            </span>
          ))}
        </h1>

        <p className="hero-subtitle text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
          Building exceptional digital experiences with modern technologies
        </p>

        <div className="hero-cta flex gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
            View Projects
          </button>
          <button className="px-8 py-4 border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-black transition-colors">
            Contact Me
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
