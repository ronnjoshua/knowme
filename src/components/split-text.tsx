"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: "scroll" | "load";
  start?: string;
  animation?: "fadeUp" | "fadeIn" | "random" | "wave";
}

export function SplitText({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  stagger = 0.02,
  trigger = "scroll",
  start = "top 85%",
  animation = "fadeUp",
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chars = charsRef.current.filter(Boolean);

    // Set initial state
    gsap.set(chars, {
      opacity: 0,
      ...(animation === "fadeUp" && { y: 50 }),
      ...(animation === "wave" && { y: 20, rotateX: -90 }),
      ...(animation === "random" && { scale: 0, rotation: () => gsap.utils.random(-30, 30) }),
    });

    // Animation configuration
    const animationConfig = {
      opacity: 1,
      duration,
      ease: "power3.out",
      stagger: {
        each: stagger,
        from: animation === "random" ? "random" as const : "start" as const,
      },
      ...(animation === "fadeUp" && { y: 0 }),
      ...(animation === "wave" && { y: 0, rotateX: 0 }),
      ...(animation === "random" && { scale: 1, rotation: 0 }),
    };

    if (trigger === "scroll") {
      gsap.to(chars, {
        ...animationConfig,
        delay,
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: "play none none none",
        },
      });
    } else {
      gsap.to(chars, {
        ...animationConfig,
        delay,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, [children, animation, delay, duration, stagger, trigger, start]);

  // Split text into characters, preserving spaces
  const characters = children.split("").map((char, index) => {
    const isSpace = char === " ";
    return (
      <span
        key={index}
        ref={(el) => {
          if (el) charsRef.current[index] = el;
        }}
        className={isSpace ? "inline" : "inline-block"}
        style={{
          ...(animation === "wave" && { transformStyle: "preserve-3d" }),
        }}
      >
        {isSpace ? "\u00A0" : char}
      </span>
    );
  });

  return (
    <span
      ref={containerRef}
      className={`${className} inline`}
    >
      {characters}
    </span>
  );
}

// Wrapper for animating words instead of characters
interface SplitWordsProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: "scroll" | "load";
  start?: string;
}

export function SplitWords({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  stagger = 0.1,
  trigger = "scroll",
  start = "top 85%",
}: SplitWordsProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const words = wordsRef.current.filter(Boolean);

    gsap.set(words, { opacity: 0, y: 40, rotateX: -15 });

    const animationConfig = {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration,
      ease: "power3.out",
      stagger: {
        each: stagger,
        from: "start" as const,
      },
    };

    if (trigger === "scroll") {
      gsap.to(words, {
        ...animationConfig,
        delay,
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: "play none none none",
        },
      });
    } else {
      gsap.to(words, {
        ...animationConfig,
        delay,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === container) t.kill();
      });
    };
  }, [children, delay, duration, stagger, trigger, start]);

  const words = children.split(" ").map((word, index) => (
    <span
      key={index}
      ref={(el) => {
        if (el) wordsRef.current[index] = el;
      }}
      className="inline-block mr-[0.25em]"
      style={{ transformStyle: "preserve-3d" }}
    >
      {word}
    </span>
  ));

  return (
    <span
      ref={containerRef}
      className={`${className} inline`}
      style={{ perspective: "1000px" }}
    >
      {words}
    </span>
  );
}
