import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "JavaScript"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "Python", "PostgreSQL", "MongoDB", "REST APIs"],
  },
  {
    title: "Tools & Others",
    skills: ["Git", "Docker", "AWS", "Vercel", "Figma", "VS Code"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="bg-muted/50 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Skills & Technologies</h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Here are the technologies and tools I work with on a daily basis.
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-3">
            {skillCategories.map((category) => (
              <div key={category.title} className="space-y-4">
                <h3 className="text-xl font-semibold text-center">{category.title}</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-3 py-1 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
