import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  { href: "https://github.com/ronnjoshua", icon: Github, label: "GitHub" },
  { href: "https://ph.linkedin.com/in/ronn-joshua-nucup-a99348216", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:Nucup53@gmail.com", icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Ronn Joshua Nucup. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <link.icon className="h-5 w-5" />
                <span className="sr-only">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
