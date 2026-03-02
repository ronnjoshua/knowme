"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SplitText } from "@/components/split-text";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "PetShop Asset Management",
    description: "A full-stack asset management system for pet shops with pet tracking, product inventory, equipment monitoring, and dashboard analytics.",
    tags: ["Next.js", "Express.js", "PostgreSQL", "Prisma", "TypeScript"],
    liveUrl: "https://asset-management-black.vercel.app",
    githubUrl: "https://github.com/ronnjoshua/asset-management",
    image: "/projects/asset-management.png",
  },
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

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <Card className="group overflow-hidden transition-all hover:shadow-2xl flex flex-col h-full border-2 hover:border-primary/50 bg-background/80 backdrop-blur-sm w-[350px] sm:w-[400px] flex-shrink-0">
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
            sizes="400px"
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
        <p className="mb-4 text-sm text-muted-foreground line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild size="sm" variant="outline">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Code
              </Link>
            </Button>
          </motion.div>
          {project.liveUrl && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Duplicate projects for seamless infinite scroll
  const duplicatedProjects = [...projects, ...projects];

  return (
    <section id="projects" ref={sectionRef} className="py-16 sm:py-24 overflow-hidden">
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
      </div>

      {/* Infinite Scroll Carousel */}
      <div className="relative">
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <div
          ref={scrollerRef}
          className="flex gap-6 py-4 animate-scroll hover:pause-animation"
          style={{
            width: "max-content",
          }}
        >
          {duplicatedProjects.map((project, index) => (
            <ProjectCard key={`${project.title}-${index}`} project={project} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
