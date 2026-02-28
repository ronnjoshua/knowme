"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { scrollToSection } from "@/lib/scroll";
import gsap from "gsap";

const FloatingShapes = dynamic(
  () => import("@/components/3d/floating-shapes").then((mod) => mod.FloatingShapes),
  { ssr: false }
);

const roles = [
  "DevOps Engineer",
  "Odoo Developer",
  "Software Engineer",
  "API Integration Specialist",
  "Licensed Civil Engineer",
];

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // GSAP animation for title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power4.out" }
      );
    }
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* 3D Background */}
      <FloatingShapes />

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background/80 -z-5" />

      <motion.div
        className="container mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-3xl">
          <motion.p
            className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground"
            variants={itemVariants}
          >
            Welcome to my portfolio
          </motion.p>

          <h1
            ref={titleRef}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m{" "}
            <motion.span
              className="bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{ backgroundPosition: ["0%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              whileHover={{ scale: 1.05 }}
            >
              Ronn Joshua
            </motion.span>
          </h1>

          <motion.div
            className="mb-8 h-12 flex items-center justify-center"
            variants={itemVariants}
          >
            <span className="text-lg text-muted-foreground sm:text-xl md:text-2xl">
              {displayText}
              <motion.span
                className="inline-block w-0.5 h-6 ml-1 bg-primary"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            </span>
          </motion.div>

          <motion.p
            ref={subtitleRef}
            className="mb-8 text-base text-muted-foreground sm:text-lg max-w-2xl mx-auto"
          >
            Results-driven developer with dual expertise in Software Development and Civil Engineering.
            Specializing in Odoo implementation, API integrations, and workflow automation.
          </motion.p>

          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Button
                size="lg"
                className="relative overflow-hidden group"
                onClick={() => scrollToSection("contact")}
              >
                <span className="relative z-10">Get in Touch</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-primary"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, rotateY: -5 }}
              whileTap={{ scale: 0.95 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="backdrop-blur-sm"
              >
                View Projects
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-8 flex items-center justify-center space-x-4"
            variants={itemVariants}
          >
            {[
              { href: "https://github.com/ronnjoshua", icon: Github },
              { href: "https://ph.linkedin.com/in/ronn-joshua-nucup-a99348216", icon: Linkedin },
              { href: "mailto:Nucup53@gmail.com", icon: Mail },
            ].map((social, index) => (
              <motion.div
                key={social.href}
                whileHover={{ scale: 1.3, y: -5, rotateZ: 10 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <Link
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        variants={floatingVariants}
        animate="animate"
      >
        <button
          onClick={() => scrollToSection("about")}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowDown className="h-6 w-6" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}
