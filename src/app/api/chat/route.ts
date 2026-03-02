import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { z } from "zod";
import { Resend } from "resend";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const resend = new Resend(process.env.RESEND_API_KEY);

const SYSTEM_PROMPT = `You are Ronn's professional AI assistant on his portfolio website. You represent Ronn Joshua Nucup in a professional manner.

## Your Role
- Answer questions about Ronn's skills, experience, and projects professionally
- Help visitors who want to get in touch or inquire about services
- Be concise, helpful, and maintain a professional tone

## Your Tools
You have access to the following tools:
1. **getResume** - Provide a download link when someone asks for Ronn's resume/CV
2. **sendEmail** - Send an email to Ronn when someone wants to contact him (ask for their name, email, and message first)
3. **getGitHubProjects** - Fetch live data about Ronn's GitHub projects
4. **searchPortfolio** - Search through the portfolio website content

Use these tools proactively when relevant to help visitors.

## About Ronn Joshua Nucup

**Current Role:** IT Support and Platform Specialist at DITO Telecommunity Corporation (Dec 2025 - Present)
- Maintains PaaS platform components: Kubernetes, Kafka, Elasticsearch, Ceph, Redis
- Performs installation, deployment, configuration of open-source PaaS components
- Monitors, troubleshoots, and provides technical support for infrastructure

**Previous Role:** Software Developer / Odoo Developer at Journey Better Business Group Inc. (Aug 2023 - Dec 2025)
- Engineered OrderTime API integration using Python and GCP, reducing manual data entry by 65%
- Developed 3 custom Odoo modules resulting in 40% improvement in user engagement
- Built automation workflows with n8n across Reply.io, Webflow, HubSpot, reducing repetitive tasks by 50%
- Led website redesign with zero data loss, reducing page load time by 60%
- Executed SEO optimization achieving 60% increase in organic traffic

**Background:** Licensed Civil Engineer with construction management experience, successfully transitioned to software development.

## Technical Skills
- DevOps & Cloud: Docker, Kubernetes, AWS, Kafka, Redis, Elasticsearch, Ceph, GCP, Cloudflare
- Languages: Python, JavaScript, TypeScript, HTML, CSS, PHP
- Frameworks: React, Next.js, Laravel, CodeIgniter, Odoo
- Automation: n8n, API integrations (HubSpot, Webflow, WordPress, Typeform)
- Security: Kali Linux, Wireshark, Metasploit, OAuth
- Engineering: AutoCAD, SketchUp, Structural Analysis

## Projects
1. PetShop Asset Management - Next.js, Express.js, PostgreSQL, Prisma, TypeScript
2. Real Estate Platform - Next.js, React, Tailwind CSS
3. RSVP Wedding Invitation - React-based RSVP system
4. This Portfolio - Next.js 16, Three.js, GSAP, Framer Motion

## Contact Information
- Email: Nucup53@gmail.com
- Phone: +63 968-578-2762
- Location: Makati City, Philippines

## Guidelines
- Keep responses professional and concise
- For contact requests, use the sendEmail tool after gathering name, email, and message
- Use getResume when someone asks for CV/resume
- Use getGitHubProjects to show live project data
- Stay on topic - redirect off-topic questions politely
- Do not make up information not provided above
`;

// Portfolio content for search
const PORTFOLIO_CONTENT = {
  hero: {
    title: "Ronn Joshua Nucup",
    subtitle: "IT Support & Platform Specialist | Software Developer",
    description: "Licensed Civil Engineer turned Software Developer with expertise in DevOps, cloud platforms, and full-stack development.",
  },
  skills: [
    "Docker", "Kubernetes", "AWS", "Kafka", "Redis", "Elasticsearch", "Ceph", "GCP", "Cloudflare",
    "Python", "JavaScript", "TypeScript", "HTML", "CSS", "PHP",
    "React", "Next.js", "Laravel", "CodeIgniter", "Odoo",
    "n8n", "HubSpot", "Webflow", "WordPress", "Typeform",
    "Kali Linux", "Wireshark", "Metasploit", "OAuth",
    "AutoCAD", "SketchUp", "Structural Analysis"
  ],
  experience: [
    {
      role: "IT Support and Platform Specialist",
      company: "DITO Telecommunity Corporation",
      period: "Dec 2025 - Present",
      highlights: ["Kubernetes", "Kafka", "Elasticsearch", "Ceph", "Redis", "PaaS"]
    },
    {
      role: "Software Developer / Odoo Developer",
      company: "Journey Better Business Group Inc.",
      period: "Aug 2023 - Dec 2025",
      highlights: ["Python", "GCP", "Odoo", "n8n", "API integrations", "SEO"]
    }
  ],
  projects: [
    { name: "PetShop Asset Management", tech: ["Next.js", "Express.js", "PostgreSQL", "Prisma", "TypeScript"], github: "ronnjoshua/asset-management" },
    { name: "Real Estate Platform", tech: ["Next.js", "React", "Tailwind CSS"], github: "ronnjoshua/real-estate" },
    { name: "RSVP Wedding Invitation", tech: ["React", "Web App"], github: "ronnjoshua/RSVP-Wedding-Invitation-Reservation-" },
    { name: "Portfolio", tech: ["Next.js", "Three.js", "GSAP", "Framer Motion"], github: "ronnjoshua/knowme" }
  ],
  contact: {
    email: "Nucup53@gmail.com",
    phone: "+63 968-578-2762",
    location: "Makati City, Philippines"
  }
};

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return new Response("API key not configured", { status: 500 });
    }

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: SYSTEM_PROMPT,
      messages,
      tools: {
        getResume: {
          description: "Get the download link for Ronn's resume/CV. Use this when someone asks for a resume, CV, or wants to download credentials.",
          inputSchema: z.object({
            format: z.string().optional().describe("Optional format preference (pdf is default)"),
          }),
          execute: async () => {
            return {
              success: true,
              resumeUrl: "https://knowme-seven.vercel.app/resume.pdf",
              message: "Here's the link to download Ronn's resume."
            };
          },
        },

        sendEmail: {
          description: "Send an email to Ronn. Use this when a visitor wants to contact Ronn or send a message. You must collect their name, email, and message first.",
          inputSchema: z.object({
            senderName: z.string().describe("The name of the person sending the email"),
            senderEmail: z.string().email().describe("The email address of the sender"),
            message: z.string().describe("The message content to send to Ronn"),
            subject: z.string().optional().describe("Optional email subject"),
          }),
          execute: async ({ senderName, senderEmail, message, subject }: { senderName: string; senderEmail: string; message: string; subject?: string }) => {
            try {
              if (!process.env.RESEND_API_KEY) {
                return { success: false, error: "Email service not configured" };
              }

              await resend.emails.send({
                from: "Portfolio Contact <onboarding@resend.dev>",
                to: "Nucup53@gmail.com",
                subject: subject || `Portfolio Contact from ${senderName}`,
                html: `
                  <h2>New Contact from Portfolio Chatbot</h2>
                  <p><strong>Name:</strong> ${senderName}</p>
                  <p><strong>Email:</strong> ${senderEmail}</p>
                  <p><strong>Message:</strong></p>
                  <p>${message}</p>
                `,
                replyTo: senderEmail,
              });

              return {
                success: true,
                message: `Email sent successfully! Ronn will get back to ${senderName} at ${senderEmail} soon.`
              };
            } catch (error) {
              console.error("Email error:", error);
              return { success: false, error: "Failed to send email. Please try the contact form instead." };
            }
          },
        },

        getGitHubProjects: {
          description: "Fetch live data about Ronn's GitHub projects including stars, forks, and recent activity. Use this when someone asks about projects or wants to see the code.",
          inputSchema: z.object({
            username: z.string().default("ronnjoshua").describe("GitHub username"),
          }),
          execute: async ({ username }: { username: string }) => {
            try {
              const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
                headers: {
                  "Accept": "application/vnd.github.v3+json",
                  ...(process.env.GITHUB_TOKEN && { "Authorization": `token ${process.env.GITHUB_TOKEN}` })
                }
              });

              if (!response.ok) {
                throw new Error("GitHub API error");
              }

              const repos = await response.json();
              const projects = repos.map((repo: {
                name: string;
                description: string | null;
                html_url: string;
                stargazers_count: number;
                forks_count: number;
                language: string | null;
                updated_at: string;
              }) => ({
                name: repo.name,
                description: repo.description,
                url: repo.html_url,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                language: repo.language,
                updatedAt: repo.updated_at,
              }));

              return {
                success: true,
                projects,
                message: `Found ${projects.length} public repositories for ${username}`
              };
            } catch (error) {
              console.error("GitHub API error:", error);
              return { success: false, error: "Failed to fetch GitHub data" };
            }
          },
        },

        searchPortfolio: {
          description: "Search through Ronn's portfolio website content including skills, experience, projects, and contact info. Use this to find specific information about Ronn.",
          inputSchema: z.object({
            query: z.string().describe("The search query to find relevant portfolio content"),
          }),
          execute: async ({ query }: { query: string }) => {
            const queryLower = query.toLowerCase();
            const results: string[] = [];

            // Search skills
            const matchedSkills = PORTFOLIO_CONTENT.skills.filter(skill =>
              skill.toLowerCase().includes(queryLower)
            );
            if (matchedSkills.length > 0) {
              results.push(`Skills matching "${query}": ${matchedSkills.join(", ")}`);
            }

            // Search experience
            PORTFOLIO_CONTENT.experience.forEach(exp => {
              if (
                exp.role.toLowerCase().includes(queryLower) ||
                exp.company.toLowerCase().includes(queryLower) ||
                exp.highlights.some(h => h.toLowerCase().includes(queryLower))
              ) {
                results.push(`Experience: ${exp.role} at ${exp.company} (${exp.period}) - ${exp.highlights.join(", ")}`);
              }
            });

            // Search projects
            PORTFOLIO_CONTENT.projects.forEach(project => {
              if (
                project.name.toLowerCase().includes(queryLower) ||
                project.tech.some(t => t.toLowerCase().includes(queryLower))
              ) {
                results.push(`Project: ${project.name} - Technologies: ${project.tech.join(", ")} - GitHub: github.com/${project.github}`);
              }
            });

            // Search contact
            if (queryLower.includes("contact") || queryLower.includes("email") || queryLower.includes("phone")) {
              results.push(`Contact: Email: ${PORTFOLIO_CONTENT.contact.email}, Phone: ${PORTFOLIO_CONTENT.contact.phone}, Location: ${PORTFOLIO_CONTENT.contact.location}`);
            }

            return {
              success: true,
              results: results.length > 0 ? results : ["No specific matches found. Try a different search term."],
              query
            };
          },
        },
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Failed to process request", { status: 500 });
  }
}
