"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with Next.js",
    image: "/projects/project1.jpg",
    tags: ["Next.js", "TypeScript", "Stripe"],
  },
  {
    id: 2,
    title: "Social Media App",
    description: "Real-time social platform",
    image: "/projects/project2.jpg",
    tags: ["React", "Firebase", "TailwindCSS"],
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Creative portfolio with GSAP animations",
    image: "/projects/project3.jpg",
    tags: ["Next.js", "GSAP", "Framer Motion"],
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Section title animation
      gsap.from(".projects-title", {
        scrollTrigger: {
          trigger: ".projects-title",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Project cards stagger animation
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 70%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });

      // Parallax effect for images
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      cards.forEach((card) => {
        const image = card.querySelector(".project-image");
        gsap.to(image, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="projects"
      className="py-32 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="projects-title text-6xl md:text-7xl font-bold mb-20 text-center">
          Selected <span className="text-purple-600">Projects</span>
        </h2>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="project-card group cursor-pointer">
              <div className="relative h-80 overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800">
                <div className="project-image absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="px-6 py-3 bg-white text-black rounded-full font-medium">
                    View Project
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
