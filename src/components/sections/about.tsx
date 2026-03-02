"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Cpu, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/3d/tilt-card";
import { SplitText } from "@/components/split-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const highlights = [
  {
    icon: Code2,
    title: "Odoo Development",
    description: "Building custom Odoo modules using Python and XML, delivering tailored ERP solutions that improve business efficiency.",
    color: "#8b5cf6",
  },
  {
    icon: Workflow,
    title: "API Integration",
    description: "Orchestrating seamless integrations across platforms like HubSpot, Webflow, and WordPress using n8n automation.",
    color: "#06b6d4",
  },
  {
    icon: Cpu,
    title: "AI-Powered Solutions",
    description: "Leveraging AI tools like Claude and ChatGPT to optimize workflows and deliver innovative client-facing solutions.",
    color: "#10b981",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !cardsRef.current) return;

    // Animate paragraphs
    const paragraphs = textRef.current.querySelectorAll("p");
    gsap.fromTo(
      paragraphs,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate cards with 3D flip effect
    const cards = cardsRef.current.querySelectorAll(".about-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 80, rotateY: -45, scale: 0.8 },
      {
        opacity: 1,
        y: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section id="about" ref={sectionRef} className="py-16 sm:py-24 perspective-1000">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            <SplitText
              animation="random"
              duration={0.6}
              stagger={0.03}
              trigger="scroll"
              start="top 85%"
            >
              About Me
            </SplitText>
          </h2>
          <div ref={textRef}>
            <p className="mb-6 text-lg text-muted-foreground">
              Results-driven professional with dual expertise in Civil Engineering and Software Development.
              Licensed Civil Engineer with 2 years of construction management experience, successfully
              transitioning into software development with proven expertise in Odoo implementation and
              API-driven automation.
            </p>
            <p className="mb-12 text-lg text-muted-foreground">
              Skilled at creating scalable automation workflows with n8n, integrating multiple SaaS platforms,
              and leveraging AI tools to boost efficiency. Demonstrated track record of reducing development
              time by 40% through automation and improving website performance by 60% through optimization techniques.
            </p>
          </div>
        </div>

        <motion.div
          ref={cardsRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {highlights.map((item, index) => (
            <TiltCard key={item.title} className="about-card">
              <Card className="group transition-all hover:shadow-2xl h-full border-2 hover:border-primary/50 bg-background/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-6 relative">
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${item.color}20 0%, transparent 50%)`,
                    }}
                  />
                  <motion.div
                    className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    whileHover={{
                      rotate: [0, -10, 10, -10, 0],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="h-7 w-7" />
                  </motion.div>
                  <motion.h3
                    className="relative mb-2 text-xl font-semibold"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {item.title}
                  </motion.h3>
                  <p className="relative text-muted-foreground">{item.description}</p>

                  {/* Decorative corner */}
                  <motion.div
                    className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, transparent 50%, ${item.color}20 50%)`,
                    }}
                  />
                </CardContent>
              </Card>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
