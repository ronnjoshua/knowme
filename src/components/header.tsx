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
      className="sticky top-0 z-50 w-full py-3 px-4 transition-colors"
    >
      {/* Glass frame container */}
      <div className="container mx-auto">
        <div className="relative flex h-14 items-center justify-between px-6 rounded-2xl border border-white/20 dark:border-white/10 bg-white/80 dark:bg-gray-900/60 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/30">
          {/* Subtle gradient overlay for extra glass effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 via-transparent to-white/20 dark:from-white/5 dark:via-transparent dark:to-white/5 pointer-events-none" />

          <Link href="/" className="relative flex items-center space-x-2 group">
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground bg-clip-text transition-all duration-300 group-hover:from-primary group-hover:to-purple-500 group-hover:text-transparent">
              Portfolio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="relative hidden md:flex items-center space-x-1">
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
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 ${
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
          <div className="relative flex items-center md:hidden">
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] backdrop-blur-xl bg-background/95">
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
      </div>
    </header>
  );
}
