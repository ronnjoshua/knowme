"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Real Estate Platform",
    description: "A modern real estate website featuring property listings, search functionality, and a clean user interface for browsing available properties.",
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    liveUrl: "https://real-estate-nhyu.vercel.app",
    githubUrl: "https://github.com/ronnjoshua/real-estate",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=450&fit=crop&q=80",
  },
  {
    title: "RSVP Wedding Invitation",
    description: "An elegant wedding invitation and RSVP reservation system allowing guests to confirm attendance and manage event responses digitally.",
    tags: ["React", "Web App", "RSVP System", "Vercel"],
    liveUrl: "https://rsvp-wedding-invitation-reservation.vercel.app",
    githubUrl: "https://github.com/ronnjoshua/RSVP-Wedding-Invitation-Reservation-",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop&q=80",
  },
  {
    title: "This Portfolio",
    description: "A modern, responsive portfolio built with Next.js 16, Tailwind CSS, and shadcn/ui featuring dark/light mode toggle, Resend email integration, and smooth animations.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    liveUrl: "https://knowme-seven.vercel.app",
    githubUrl: "https://github.com/ronnjoshua/knowme",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=450&fit=crop&q=80",
  },
];

export function ProjectsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
          <p className="mb-12 text-lg text-muted-foreground">
            A selection of projects showcasing my expertise in development, automation, and optimization.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              custom={index}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="group overflow-hidden transition-all hover:shadow-2xl flex flex-col h-full border-2 hover:border-primary/50">
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
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                    <motion.div
                      className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <Button asChild size="sm" variant="secondary">
                            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1 h-3 w-3" />
                              Preview
                            </Link>
                          </Button>
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
                      >
                        <Badge variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      </motion.div>
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
