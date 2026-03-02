"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect, useRef } from "react";
import { scrollToSection } from "@/lib/scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

// Define section color schemes (for dark sections, use light text)
const sectionColors: Record<string, { bg: string; text: string; border: string }> = {
  hero: { bg: "transparent", text: "inherit", border: "transparent" },
  about: { bg: "rgba(var(--primary-rgb), 0.05)", text: "inherit", border: "rgba(var(--primary-rgb), 0.2)" },
  skills: { bg: "transparent", text: "inherit", border: "transparent" },
  projects: { bg: "rgba(var(--primary-rgb), 0.05)", text: "inherit", border: "rgba(var(--primary-rgb), 0.2)" },
  experience: { bg: "transparent", text: "inherit", border: "transparent" },
  contact: { bg: "rgba(var(--primary-rgb), 0.1)", text: "inherit", border: "rgba(var(--primary-rgb), 0.3)" },
};

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const headerRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setOpen(false);
  };

  useEffect(() => {
    // Create ScrollTriggers for each section to detect which one is active
    const sections = ["hero", "about", "skills", "projects", "experience", "contact"];

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top 80px",
        end: "bottom 80px",
        onEnter: () => setActiveSection(sectionId),
        onEnterBack: () => setActiveSection(sectionId),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Animate header based on active section
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const colors = sectionColors[activeSection] || sectionColors.hero;

    gsap.to(header, {
      backgroundColor: colors.bg,
      borderColor: colors.border,
      duration: 0.4,
      ease: "power2.out",
    });
  }, [activeSection]);

  // Animate active nav indicator
  useEffect(() => {
    const activeButton = document.querySelector(`[data-section="${activeSection}"]`) as HTMLElement;
    const indicator = indicatorRef.current;

    if (activeButton && indicator) {
      gsap.to(indicator, {
        x: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [activeSection]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md supports-[backdrop-filter]:bg-background/60 transition-colors"
      style={{ backgroundColor: "transparent", borderColor: "transparent" }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2 group">
          <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground bg-clip-text transition-all duration-300 group-hover:from-primary group-hover:to-purple-500 group-hover:text-transparent">
            Portfolio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 relative">
          {/* Active indicator */}
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-primary to-purple-500 rounded-full transition-opacity"
            style={{ opacity: activeSection !== "hero" ? 1 : 0 }}
          />

          {navItems.map((item) => (
            <button
              key={item.id}
              data-section={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-md hover:bg-primary/10 ${
                activeSection === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <nav className="flex flex-col space-y-2 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-lg font-medium transition-all duration-300 text-left px-4 py-3 rounded-lg ${
                      activeSection === item.id
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
