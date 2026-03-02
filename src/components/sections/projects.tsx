"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/3d/tilt-card";
import { SplitText } from "@/components/split-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "Real Estate Platform",
    description: "A modern real estate website featuring property listings, search functionality, and a clean user interface for browsing available properties.",
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    liveUrl: "https://real-estate-nhyu.vercel.app",
    githubUrl: "https://github.com/ronnjoshua/real-estate",
    image: "/projects/real-estate.png",
  },
  {
    title: "RSVP Wedding Invitation",
    description: "An elegant wedding invitation and RSVP reservation system allowing guests to confirm attendance and manage event responses digitally.",
    tags: ["React", "Web App", "RSVP System", "Vercel"],
    liveUrl: "https://rsvp-wedding-invitation-reservation.vercel.app",
    githubUrl: "https://github.com/ronnjoshua/RSVP-Wedding-Invitation-Reservation-",
    image: "/projects/rsvp.png",
  },
  {
    title: "This Portfolio",
    description: "A modern, responsive 3D portfolio built with Next.js 16, Three.js, GSAP, and Framer Motion featuring interactive animations and dark/light mode.",
    tags: ["Next.js", "Three.js", "GSAP", "Framer Motion"],
    liveUrl: "https://knowme-seven.vercel.app",
    githubUrl: "https://github.com/ronnjoshua/knowme",
    image: "/projects/portfolio.png",
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !cardsRef.current) return;

    // Animate title
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate cards with stagger
    const cards = cardsRef.current.querySelectorAll(".project-card");
    gsap.fromTo(
      cards,
      { opacity: 0, y: 100, rotateX: -15 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
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
    <section id="projects" ref={sectionRef} className="py-16 sm:py-24 perspective-1000">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="mx-auto max-w-3xl text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent bg-[length:200%_auto]"
            animate={{ backgroundPosition: ["0%", "200%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            <SplitText animation="fadeUp" duration={0.5} stagger={0.03} trigger="scroll" start="top 85%">
              Featured Projects
            </SplitText>
          </motion.h2>
          <p className="mb-12 text-lg text-muted-foreground">
            A selection of projects showcasing my expertise in development, automation, and optimization.
          </p>
        </div>

        <motion.div
          ref={cardsRef}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <TiltCard key={project.title} className="project-card">
              <Card className="group overflow-hidden transition-all hover:shadow-2xl flex flex-col h-full border-2 hover:border-primary/50 bg-background/80 backdrop-blur-sm">
                <CardHeader className="p-0">
                  <motion.div
                    className="aspect-video relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <motion.div
                      className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                            <Button asChild size="sm" variant="secondary" className="backdrop-blur-sm">
                              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="mr-1 h-3 w-3" />
                                Preview
                              </Link>
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                </CardHeader>
                <CardContent className="p-6 flex-1">
                  <motion.h3
                    className="mb-2 text-xl font-semibold"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: tagIndex * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                      >
                        <Badge variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <div className="flex gap-2">
                    <motion.div whileHover={{ scale: 1.05, rotateZ: 2 }} whileTap={{ scale: 0.95 }}>
                      <Button asChild size="sm" variant="outline">
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          Code
                        </Link>
                      </Button>
                    </motion.div>
                    {project.liveUrl && (
                      <motion.div whileHover={{ scale: 1.05, rotateZ: -2 }} whileTap={{ scale: 0.95 }}>
                        <Button asChild size="sm">
                          <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </Link>
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
