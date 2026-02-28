import { Card, CardContent } from "@/components/ui/card";
import { Code2, Palette, Rocket } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and efficient code that stands the test of time.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive and visually appealing interfaces that users love.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Optimizing applications for speed and delivering exceptional user experiences.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">About Me</h2>
          <p className="mb-12 text-lg text-muted-foreground">
            I&apos;m a full-stack developer with a passion for building modern web applications.
            With years of experience in the industry, I specialize in creating responsive,
            user-friendly applications using cutting-edge technologies.
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
