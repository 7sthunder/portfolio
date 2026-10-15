export type Project = { title: string; blurb: string; tags: string[]; kind: "dash" | "table" | "gym" | "people" | "print"; shot?: string; shotAlt?: string };
export const featured: Project = {
  title: "Transport Management System",
  blurb: "A full-stack platform for UAE logistics operations. Manage transport requests, trips, vehicles, expenses, invoicing, driver assignments and more.",
  tags: ["React 19", "TypeScript", "tRPC", "Drizzle", "PostgreSQL", "Cloudflare Workers", "Tailwind CSS", "Leaflet"],
  kind: "table",
  shot: "tms-dashboard.png",
  shotAlt: "Transport Management System dashboard showing revenue against expenses, active drivers and available vehicles",
};
export const more: Project[] = [
  { title: "CrossFit OS", blurb: "Multi-tenant SaaS for gyms with member management, billing, attendance, AI trainer and community features.", tags: ["Astro", "React", "tRPC", "PostgreSQL"], kind: "gym", shot: "crossfitos-landing.png", shotAlt: "CrossFitOS landing page with the Website, Store and Community hero headline" },
  { title: "A S Unique Group", blurb: "Recruitment operations platform for overseas hiring with candidate management, document workflows and team communication.", tags: ["React 19", "tRPC", "Cloudflare R2", "PostgreSQL"], kind: "people" },
  { title: "STAMP", blurb: "Production management system for a print shop covering orders, quotations, production, packing, delivery and payments.", tags: ["React", "tRPC", "Cloudflare D1", "Drizzle"], kind: "print" },
];
export const independent = [
  { title: "DocuVerify", sub: "Explainable Document Tamper Detection", blurb: "Analyses PDFs and images for potential tampering, produces a suspicion score, and highlights suspicious regions with evidence-backed explanations.", tags: ["Python", "OpenCV", "FastAPI", "React"], cta: "View Case Study", status: "" },
  { title: "MediTrack AI", sub: "AI-Assisted Medication Adherence", blurb: "A planned medication tracking platform with reminders, adherence analytics and supportive AI insights.", tags: ["Next.js", "tRPC", "PostgreSQL"], cta: "View Concept", status: "In development" },
];
export const stack: Record<string, string[]> = {
  Frontend: ["React", "Next.js", "TypeScript", "TanStack Router", "TanStack Query", "Tailwind CSS", "shadcn/ui", "Astro", "React Native", "Expo"],
  "Backend & APIs": ["Node.js", "tRPC", "FastAPI", "Hono", "REST APIs", "Zod", "Better Auth"],
  Databases: ["PostgreSQL", "Supabase", "Drizzle ORM", "SQLite", "MongoDB"],
  "Cloud & DevOps": ["Cloudflare Workers", "Cloudflare R2", "Cloudflare Queues", "Docker", "Git", "GitHub Actions"],
  "AI & ML": ["Python", "OpenCV", "OCR", "Vercel AI SDK", "LLM Integrations"],
  "Testing & Tools": ["Vitest", "Playwright", "React Testing Library", "pytest", "Figma", "VS Code"],
};
export const stats = [
  { n: 6, suffix: "+", label: "Months", sub: "Internship Experience" },
  { n: 4, suffix: "", label: "Production-oriented", sub: "Company Projects" },
  { n: 2, suffix: "", label: "Independent", sub: "Projects" },
];
