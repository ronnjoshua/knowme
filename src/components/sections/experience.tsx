import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Company Inc.",
    period: "2022 - Present",
    description: "Leading the frontend team in building scalable web applications using React and Next.js. Implemented CI/CD pipelines and improved performance by 40%.",
  },
  {
    title: "Full Stack Developer",
    company: "Digital Agency",
    period: "2020 - 2022",
    description: "Developed and maintained multiple client projects using React, Node.js, and PostgreSQL. Collaborated with designers to implement pixel-perfect UIs.",
  },
  {
    title: "Junior Developer",
    company: "Startup Labs",
    period: "2018 - 2020",
    description: "Started my professional journey building web applications. Gained experience in JavaScript, React, and modern web development practices.",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-muted/50 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Work Experience</h2>
          <p className="mb-12 text-lg text-muted-foreground">
            My professional journey and the companies I&apos;ve had the pleasure to work with.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 top-0 hidden h-full w-px bg-border md:left-1/2 md:block md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <div key={exp.title} className="relative mb-8 last:mb-0">
                <div className={`md:flex md:items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-0 hidden h-4 w-4 rounded-full border-4 border-background bg-primary md:left-1/2 md:block md:-translate-x-1/2" />

                  <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                    <Card>
                      <CardContent className="p-6">
                        <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <h3 className="text-lg font-semibold">{exp.title}</h3>
                          <span className="text-sm text-muted-foreground">{exp.period}</span>
                        </div>
                        <p className="mb-2 text-sm font-medium text-primary">{exp.company}</p>
                        <Separator className="my-3" />
                        <p className="text-sm text-muted-foreground">{exp.description}</p>
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
