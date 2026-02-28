import Link from "next/link";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="container mx-auto text-center">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Odoo Developer | Licensed Civil Engineer
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Ronn Joshua
            </span>
          </h1>
          <p className="mb-8 text-lg text-muted-foreground sm:text-xl md:text-2xl">
            Results-driven developer with dual expertise in Software Development and Civil Engineering.
            Specializing in Odoo implementation, API integrations, and workflow automation.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="#contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#projects">View Projects</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-4">
            <Link
              href="https://github.com/ronnjoshua"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href="https://ph.linkedin.com/in/ronn-joshua-nucup-a99348216"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="mailto:Nucup53@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Link href="#about" className="text-muted-foreground hover:text-foreground">
          <ArrowDown className="h-6 w-6" />
        </Link>
      </div>
    </section>
  );
}
