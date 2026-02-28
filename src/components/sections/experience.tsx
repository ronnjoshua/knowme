"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

const experiences = [
  {
    title: "IT Support and Platform Specialist",
    company: "DITO Telecommunity Corporation",
    location: "National Capital Region, Philippines",
    period: "Dec 2025 - Present",
    description: [
      "Maintain and operate PaaS platform components including Kubernetes, Kafka, Elasticsearch, Ceph, and Redis",
      "Perform installation, deployment, configuration, and optimization of open-source PaaS components",
      "Execute patch installation and version upgrades for platform components",
      "Monitor, troubleshoot, and provide technical support for PaaS infrastructure",
      "Implement security rectification and reinforcement measures for platform security",
      "Support platform expansion, renovation, and migration projects",
    ],
  },
  {
    title: "Software Developer / Odoo Developer",
    company: "Journey Better Business Group Inc.",
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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { duration: 0.4, ease: "backOut" as const },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  return (
    <section id="experience" className="bg-muted/50 py-16 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Work Experience</h2>
          <p className="mb-12 text-lg text-muted-foreground">
            My professional journey from Civil Engineering to Software Development.
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <motion.div
            className="relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {/* Animated Timeline line */}
            <motion.div
              className="absolute left-0 top-0 hidden h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary/20 md:left-8 md:block"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ originY: 0 }}
            />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title + exp.company}
                className="relative mb-8 last:mb-0"
                variants={cardVariants}
                custom={index}
              >
                <div className="md:flex">
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-0 hidden h-4 w-4 rounded-full border-4 border-background bg-primary md:left-8 md:block md:-translate-x-1/2 mt-6 z-10"
                    variants={dotVariants}
                    whileHover={{ scale: 1.5 }}
                  />

                  <motion.div
                    className="md:pl-16 w-full"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
                      <CardContent className="p-6">
                        <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <motion.h3
                            className="text-lg font-semibold"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                          >
                            {exp.title}
                          </motion.h3>
                          <motion.span
                            className="text-sm text-muted-foreground whitespace-nowrap px-3 py-1 bg-primary/10 rounded-full"
                            whileHover={{ scale: 1.05 }}
                          >
                            {exp.period}
                          </motion.span>
                        </div>
                        <p className="mb-3 text-sm font-medium text-primary">{exp.company} | {exp.location}</p>
                        <Separator className="my-3" />
                        <motion.ul
                          className="space-y-2"
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={{
                            visible: {
                              transition: { staggerChildren: 0.1 },
                            },
                          }}
                        >
                          {exp.description.map((item, itemIndex) => (
                            <motion.li
                              key={itemIndex}
                              className="text-sm text-muted-foreground flex"
                              variants={listItemVariants}
                            >
                              <motion.span
                                className="mr-2 text-primary"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: itemIndex * 0.1 }}
                              >
                                •
                              </motion.span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
