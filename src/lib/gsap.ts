"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAPScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elements = ref.current.querySelectorAll("[data-gsap]");

    elements.forEach((el) => {
      const animation = el.getAttribute("data-gsap");
      const delay = parseFloat(el.getAttribute("data-gsap-delay") || "0");
      const duration = parseFloat(el.getAttribute("data-gsap-duration") || "1");

      switch (animation) {
        case "fade-up":
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
          break;
        case "fade-left":
          gsap.fromTo(
            el,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
          break;
        case "fade-right":
          gsap.fromTo(
            el,
            { opacity: 0, x: 50 },
            {
              opacity: 1,
              x: 0,
              duration,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
          break;
        case "scale":
          gsap.fromTo(
            el,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration,
              delay,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
          break;
        case "rotate":
          gsap.fromTo(
            el,
            { opacity: 0, rotation: -10 },
            {
              opacity: 1,
              rotation: 0,
              duration,
              delay,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
          break;
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return ref;
}

export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      yPercent: -100 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [speed]);

  return ref;
}

export { gsap, ScrollTrigger };
