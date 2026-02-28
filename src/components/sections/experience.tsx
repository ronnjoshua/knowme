import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const experiences = [
  {
    title: "Software Developer / Odoo Developer",
    company: "Better Business Group Inc.",
    location: "Makati City",
    period: "Aug 2023 - Dec 2025",
    description: [
      "Engineered OrderTime API integration using Python and GCP, reducing manual data entry by 65%",
      "Developed 3 custom Odoo modules resulting in 40% improvement in user engagement",
      "Built automation workflows with n8n across Reply.io, Webflow, HubSpot, reducing repetitive tasks by 50%",
      "Led website redesign and database migration with zero data loss, reducing page load time by 60%",
      "Executed SEO optimization achieving 60% increase in organic traffic",
    ],
  },
  {
    title: "Project Engineer",
    company: "Department of Environment and Natural Resources",
    location: "Los Banos, Laguna",
    period: "Feb 2023 - Jun 2023",
    description: [
      "Supervised installation of 15+ trash traps, achieving 85% reduction in waterway pollution",
      "Coordinated with 14+ government agencies maintaining 100% compliance with regulations",
      "Completed 30+ technical assessments and monitoring reports",
    ],
  },
  {
    title: "Site Engineer",
    company: "Briobuild Co.",
    location: "Pasig City",
    period: "Aug 2022 - Feb 2023",
    description: [
      "Supervised team of 30+ construction workers and 5 sub-contractors",
      "Implemented quality control measures resulting in 70% reduction in rework",
      "Achieved zero safety incidents through strict adherence to safety protocols",
    ],
  },
  {
    title: "Design Engineer",
    company: "Building Takeoffs Limited",
    location: "Ayala",
    period: "Aug 2021 - Jan 2022",
    description: [
      "Designed structural elements for 20+ residential projects (150-500 sq.m.)",
      "Produced BOQs and BOMs with 98% accuracy rate",
      "Reduced estimation time by 35% through software optimization",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-muted/50 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Work Experience</h2>
          <p className="mb-12 text-lg text-muted-foreground">
            My professional journey from Civil Engineering to Software Development.
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 hidden h-full w-px bg-border md:left-8 md:block" />

            {experiences.map((exp) => (
              <div key={exp.title + exp.company} className="relative mb-8 last:mb-0">
                <div className="md:flex">
                  {/* Timeline dot */}
                  <div className="absolute left-0 hidden h-4 w-4 rounded-full border-4 border-background bg-primary md:left-8 md:block md:-translate-x-1/2 mt-6" />

                  <div className="md:pl-16 w-full">
                    <Card>
                      <CardContent className="p-6">
                        <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="text-lg font-semibold">{exp.title}</h3>
                          <span className="text-sm text-muted-foreground whitespace-nowrap">{exp.period}</span>
                        </div>
                        <p className="mb-3 text-sm font-medium text-primary">{exp.company} | {exp.location}</p>
                        <Separator className="my-3" />
                        <ul className="space-y-2">
                          {exp.description.map((item, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex">
                              <span className="mr-2 text-primary">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
