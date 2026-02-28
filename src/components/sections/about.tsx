import { Card, CardContent } from "@/components/ui/card";
import { Code2, Cpu, Workflow } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Odoo Development",
    description: "Building custom Odoo modules using Python and XML, delivering tailored ERP solutions that improve business efficiency.",
  },
  {
    icon: Workflow,
    title: "API Integration",
    description: "Orchestrating seamless integrations across platforms like HubSpot, Webflow, and WordPress using n8n automation.",
  },
  {
    icon: Cpu,
    title: "AI-Powered Solutions",
    description: "Leveraging AI tools like Claude and ChatGPT to optimize workflows and deliver innovative client-facing solutions.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">About Me</h2>
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <Card key={item.title} className="group transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
