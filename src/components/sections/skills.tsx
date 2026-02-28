"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <section id="skills" className="bg-muted/50 py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Skills & Technologies</h2>
          <p className="mb-12 text-lg text-muted-foreground">
            A diverse skill set spanning software development, automation, and engineering.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                className="space-y-4"
                variants={categoryVariants}
                custom={categoryIndex}
              >
                <motion.h3
                  className="text-xl font-semibold text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {category.title}
                </motion.h3>
                <motion.div
                  className="flex flex-wrap justify-center gap-2"
                  variants={containerVariants}
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      variants={badgeVariants}
                      transition={{ delay: skillIndex * 0.05 }}
                      whileHover={{
                        scale: 1.1,
                        y: -5,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 text-sm cursor-default transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
