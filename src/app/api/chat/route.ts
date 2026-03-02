import { createGroq } from "@ai-sdk/groq";
import { streamText } from "ai";
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
1. PetShop Asset Management - Full-stack asset management for pet shops (Next.js, Express.js, PostgreSQL, Prisma, TypeScript)
2. Real Estate Platform - Property listings website (Next.js, React, Tailwind CSS)
3. RSVP Wedding Invitation - Digital RSVP system (React)
4. This Portfolio - Interactive 3D portfolio (Next.js 16, Three.js, GSAP, Framer Motion)

## Contact Information
- Email: Nucup53@gmail.com
- Phone: +63 968-578-2762
- Location: Makati City, Philippines
- Resume: https://knowme-seven.vercel.app/resume.pdf

## Sending Emails to Ronn
When someone wants to contact Ronn or send him a message, ask them to provide their details in this EXACT format:
---
Name: [their name]
Email: [their email]
Message: [their message]
---

Once they provide this format, I will automatically send the email to Ronn. Tell them "I'll send that message to Ronn right away!" after they provide the details.

## Guidelines
- Keep responses professional and concise (2-4 sentences when possible)
- When someone asks for resume/CV, provide the download link: https://knowme-seven.vercel.app/resume.pdf
- For contact inquiries, guide them to use the format above to send an email
- Be friendly and personable while remaining professional

## IMPORTANT: Stay On Topic
- You ONLY answer questions about Ronn Joshua Nucup, his skills, experience, projects, and how to contact him
- For ANY off-topic questions (general knowledge, coding help, math, weather, news, jokes, stories, other people, etc.), politely decline and redirect
- Example response for off-topic questions: "I'm here specifically to help you learn about Ronn and his work. Is there anything about his skills, projects, or experience I can help you with?"
- Do NOT answer questions like "What is the capital of France?", "Write me code", "Tell me a joke", "How old is [anyone other than Ronn]", etc.
- If unsure whether a question is relevant, assume it's off-topic and redirect to Ronn-related topics
`;

// Function to extract email details from message
function extractEmailDetails(message: string): { name: string; email: string; message: string } | null {
  const nameMatch = message.match(/Name:\s*(.+?)(?:\n|Email:)/i);
  const emailMatch = message.match(/Email:\s*([^\s]+@[^\s]+?)(?:\n|Message:)/i);
  const messageMatch = message.match(/Message:\s*([\s\S]+?)(?:---|$)/i);

  if (nameMatch && emailMatch && messageMatch) {
    return {
      name: nameMatch[1].trim(),
      email: emailMatch[1].trim(),
      message: messageMatch[1].trim(),
    };
  }
  return null;
}

// Function to send email
async function sendEmailToRonn(details: { name: string; email: string; message: string }): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return false;
  }

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "Nucup53@gmail.com",
      subject: `Portfolio Contact from ${details.name}`,
      html: `
        <h2>New Contact from Portfolio Chatbot</h2>
        <p><strong>Name:</strong> ${details.name}</p>
        <p><strong>Email:</strong> ${details.email}</p>
        <p><strong>Message:</strong></p>
        <p>${details.message}</p>
      `,
      replyTo: details.email,
    });
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return new Response("API key not configured", { status: 500 });
    }

    // Check if the latest message contains email details
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "user") {
      const emailDetails = extractEmailDetails(lastMessage.content);
      if (emailDetails) {
        const emailSent = await sendEmailToRonn(emailDetails);
        if (emailSent) {
          return new Response(
            `Great news! I've successfully sent your message to Ronn. He'll receive an email from ${emailDetails.name} (${emailDetails.email}) and will get back to you as soon as possible. Is there anything else you'd like to know about Ronn?`,
            { headers: { "Content-Type": "text/plain" } }
          );
        } else {
          return new Response(
            `I apologize, but I couldn't send the email right now. Please try using the contact form on the website or email Ronn directly at Nucup53@gmail.com. Is there anything else I can help you with?`,
            { headers: { "Content-Type": "text/plain" } }
          );
        }
      }
    }

    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: SYSTEM_PROMPT,
      messages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Failed to process request", { status: 500 });
  }
}
