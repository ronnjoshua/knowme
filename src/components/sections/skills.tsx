import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    title: "Web Development",
    skills: ["Python", "Odoo 16/17", "JavaScript", "HTML5/CSS3", "PHP", "React", "Laravel", "CodeIgniter"],
  },
  {
    title: "Automation & APIs",
    skills: ["n8n", "REST APIs", "HubSpot API", "Webflow API", "WordPress API", "Typeform", "Reply.io API", "OrderTime API"],
  },
  {
    title: "AI & Tools",
    skills: ["Claude", "ChatGPT", "Git", "GitHub", "Cloudflare", "GCP"],
  },
  {
    title: "Cybersecurity",
    skills: ["Kali Linux", "Nmap", "Wireshark", "Metasploit", "Network Security", "Penetration Testing"],
  },
  {
    title: "Engineering Software",
    skills: ["STAAD Pro", "ETABS 19", "AutoCAD 2D/3D", "SketchUp Pro", "Primavera P6", "MS Project"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="bg-muted/50 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Skills & Technologies</h2>
          <p className="mb-12 text-lg text-muted-foreground">
            A diverse skill set spanning software development, automation, and engineering.
          </p>
        </div>
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
