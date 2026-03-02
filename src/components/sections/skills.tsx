"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/split-text";
import {
  SiDocker,
  SiKubernetes,
  SiAmazonwebservices,
  SiApachekafka,
  SiRedis,
  SiElasticsearch,
  SiCeph,
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiPhp,
  SiReact,
  SiLaravel,
  SiCodeigniter,
  SiN8N,
  SiHubspot,
  SiWebflow,
  SiWordpress,
  SiTypeform,
  SiGit,
  SiGithub,
  SiCloudflare,
  SiGooglecloud,
  SiKalilinux,
  SiWireshark,
  SiMetasploit,
  SiAutodesk,
  SiSketchup,
} from "react-icons/si";
import {
  FaRobot,
  FaShieldAlt,
  FaNetworkWired,
  FaProjectDiagram,
  FaCalculator,
  FaDatabase,
  FaCogs
} from "react-icons/fa";
import { TbApi, TbBrandOauth } from "react-icons/tb";
import { BsStack } from "react-icons/bs";
import { IconType } from "react-icons";

interface Skill {
  name: string;
  icon: IconType;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "DevOps & Cloud",
    skills: [
      { name: "Docker", icon: SiDocker },
      { name: "Kubernetes", icon: SiKubernetes },
      { name: "AWS", icon: SiAmazonwebservices },
      { name: "Apache Kafka", icon: SiApachekafka },
      { name: "Redis", icon: SiRedis },
      { name: "Elasticsearch", icon: SiElasticsearch },
      { name: "Ceph", icon: SiCeph },
    ],
  },
  {
    title: "Web Development",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "Odoo 16/17", icon: FaCogs },
      { name: "JavaScript", icon: SiJavascript },
      { name: "HTML5/CSS3", icon: SiHtml5 },
      { name: "PHP", icon: SiPhp },
      { name: "React", icon: SiReact },
      { name: "Laravel", icon: SiLaravel },
      { name: "CodeIgniter", icon: SiCodeigniter },
    ],
  },
  {
    title: "Automation & APIs",
    skills: [
      { name: "n8n", icon: SiN8N },
      { name: "REST APIs", icon: TbApi },
      { name: "HubSpot API", icon: SiHubspot },
      { name: "Webflow API", icon: SiWebflow },
      { name: "WordPress API", icon: SiWordpress },
      { name: "Typeform", icon: SiTypeform },
      { name: "Reply.io API", icon: TbBrandOauth },
      { name: "OrderTime API", icon: FaDatabase },
    ],
  },
  {
    title: "AI & Tools",
    skills: [
      { name: "Claude", icon: FaRobot },
      { name: "ChatGPT", icon: FaRobot },
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Cloudflare", icon: SiCloudflare },
      { name: "GCP", icon: SiGooglecloud },
    ],
  },
  {
    title: "Cybersecurity",
    skills: [
      { name: "Kali Linux", icon: SiKalilinux },
      { name: "Nmap", icon: FaNetworkWired },
      { name: "Wireshark", icon: SiWireshark },
      { name: "Metasploit", icon: SiMetasploit },
      { name: "Network Security", icon: FaShieldAlt },
      { name: "Penetration Testing", icon: FaShieldAlt },
    ],
  },
  {
    title: "Engineering Software",
    skills: [
      { name: "STAAD Pro", icon: BsStack },
      { name: "ETABS 19", icon: FaCalculator },
      { name: "AutoCAD 2D/3D", icon: SiAutodesk },
      { name: "SketchUp Pro", icon: SiSketchup },
      { name: "Primavera P6", icon: FaProjectDiagram },
      { name: "MS Project", icon: FaProjectDiagram },
    ],
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

  const skillVariants = {
    hidden: { opacity: 0, scale: 0, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
  };

  const iconFloatVariants = {
    animate: {
      y: [-2, 2, -2],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
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
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            <SplitText animation="fadeUp" duration={0.5} stagger={0.03} trigger="scroll" start="top 85%">
              Skills & Technologies
            </SplitText>
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            A diverse skill set spanning software development, automation, and engineering.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                className="rounded-xl border-2 bg-background/50 p-6 backdrop-blur-sm hover:border-primary/30 transition-colors duration-300"
                variants={categoryVariants}
                custom={categoryIndex}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
              >
                <motion.h3
                  className="text-xl font-semibold text-center mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {category.title}
                </motion.h3>
                <motion.div
                  className="grid grid-cols-4 gap-3"
                  variants={containerVariants}
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="group flex flex-col items-center gap-2"
                      variants={skillVariants}
                      custom={skillIndex}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <motion.div
                        className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"
                        variants={iconFloatVariants}
                        animate="animate"
                        whileHover={{
                          rotate: [0, -10, 10, -10, 0],
                          transition: { duration: 0.5 }
                        }}
                      >
                        <skill.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-primary/20"
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1.5, opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        />
                      </motion.div>
                      <motion.span
                        className="text-[10px] text-center text-muted-foreground group-hover:text-primary transition-colors duration-300 leading-tight"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: skillIndex * 0.05 }}
                      >
                        {skill.name}
                      </motion.span>
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
