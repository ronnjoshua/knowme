import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "OrderTime API Integration",
    description: "Engineered a seamless API integration using Python and GCP, connecting OrderTime with business systems to reduce manual data entry time by 65% while achieving 100% system uptime.",
    tags: ["Python", "GCP", "REST API", "Odoo"],
    liveUrl: null,
    githubUrl: "https://github.com/ronnjoshua",
  },
  {
    title: "Custom Odoo Modules",
    description: "Developed 3 custom Odoo modules using Python and XML, implementing tailored business logic that resulted in 40% improvement in user engagement and streamlined operations.",
    tags: ["Odoo 16/17", "Python", "XML", "ERP"],
    liveUrl: null,
    githubUrl: "https://github.com/ronnjoshua",
  },
  {
    title: "n8n Automation Workflows",
    description: "Built comprehensive automation workflows orchestrating integrations across Reply.io, Webflow, Typeform, HubSpot, and WordPress APIs, reducing repetitive tasks by 50%.",
    tags: ["n8n", "HubSpot API", "Webflow API", "Automation"],
    liveUrl: null,
    githubUrl: "https://github.com/ronnjoshua",
  },
  {
    title: "Website Redesign & Migration",
    description: "Led complete website redesign and database migration for a major client, ensuring zero data loss while reducing page load time by 60% through Cloudflare optimization.",
    tags: ["Cloudflare", "Database Migration", "SEO", "Performance"],
    liveUrl: null,
    githubUrl: "https://github.com/ronnjoshua",
  },
  {
    title: "SEO Optimization Project",
    description: "Executed comprehensive SEO optimization strategies using Ahrefs and ScreamingFrog, achieving 60% increase in organic traffic and 20% improvement in search rankings.",
    tags: ["SEO", "Ahrefs", "ScreamingFrog", "Analytics"],
    liveUrl: null,
    githubUrl: "https://github.com/ronnjoshua",
  },
  {
    title: "This Portfolio",
    description: "A modern, responsive portfolio built with Next.js 16, Tailwind CSS, and shadcn/ui featuring dark/light mode toggle and smooth animations.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    liveUrl: "https://knowme.vercel.app",
    githubUrl: "https://github.com/ronnjoshua/knowme",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
          <p className="mb-12 text-lg text-muted-foreground">
            A selection of projects showcasing my expertise in development, automation, and optimization.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.title} className="group overflow-hidden transition-all hover:shadow-lg flex flex-col">
              <CardHeader className="p-0">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary/30">{project.title.charAt(0)}</span>
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-1">
                <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </Link>
                  </Button>
                  {project.liveUrl && (
                    <Button asChild size="sm">
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live
                      </Link>
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
