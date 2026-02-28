"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Code2, Cpu, Workflow } from "lucide-react";
import { motion } from "framer-motion";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="about" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2
            className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl"
            variants={itemVariants}
          >
            About Me
          </motion.h2>
          <motion.p
            className="mb-6 text-lg text-muted-foreground"
            variants={itemVariants}
          >
            Results-driven professional with dual expertise in Civil Engineering and Software Development.
            Licensed Civil Engineer with 2 years of construction management experience, successfully
            transitioning into software development with proven expertise in Odoo implementation and
            API-driven automation.
          </motion.p>
          <motion.p
            className="mb-12 text-lg text-muted-foreground"
            variants={itemVariants}
          >
            Skilled at creating scalable automation workflows with n8n, integrating multiple SaaS platforms,
            and leveraging AI tools to boost efficiency. Demonstrated track record of reducing development
            time by 40% through automation and improving website performance by 60% through optimization techniques.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              custom={index}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <Card className="group transition-all hover:shadow-xl h-full border-2 hover:border-primary/50">
                <CardContent className="p-6">
                  <motion.div
                    className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="h-7 w-7" />
                  </motion.div>
                  <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
