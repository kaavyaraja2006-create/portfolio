// Every fact on the site comes from resume.pdf. The phone number is deliberately left out.

export const profile = {
  name: "Kaavya R",
  roleShort: "Software Engineer",
  role: "Software Engineer · AI Engineer · Full-Stack Developer",
  city: "Hosur, India",
  email: "kaavyaraja2006@gmail.com",
  github: "https://github.com/kaavyaraja2006-create",
  linkedin: "https://www.linkedin.com/in/kaavyar2006",
  bio: "I build backend, full-stack and AI systems end to end: multi-agent automation, RAG pipelines and secure real-time APIs.",
  seeking: "Open to a Software Engineering internship or entry-level role.",
};

export const heroStats = [
  { v: "500+", l: "Automated tests written" },
  { v: "2", l: "Internships completed" },
  { v: "10", l: "Projects built" },
];

export const workStats = [
  { v: "13", l: "agents in one orchestration platform" },
  { v: "1.8 s", l: "to screen 10,000 orbital objects" },
  { v: "0.91 d", l: "task-duration forecast error (MAE)" },
];

export interface Project {
  name: string;
  sub: string;
  tech: string[];
  bullets: string[];
}

export const projects: Project[] = [
  {
    name: "ATLAS",
    sub: "Audit-Tracked Lineage and Adaptive Selective Recovery",
    tech: ["Java 21", "Spring Boot 3.5", "PostgreSQL 16", "React 18", "TypeScript", "React Flow", "Docker", "Terraform"],
    bullets: [
      "Undoes one bad change, and only that change, after it has spread through the data: field-level provenance recorded at write time feeds PASCAR, a conflict-aware selective recovery that credit-notes issued invoices instead of editing them.",
      "Matched an independent oracle with precision 1.000 and recall 1.000 across 18 runs up to 100,000 orders; of six simulated recovery strategies, only PASCAR met every hard constraint in every run.",
      "Governed execution with author and approver separation, version-checked writes and crash-safe resume, plus an audit trail hash-chained with SHA-256 and anchored with Ed25519 signatures.",
      "Backed by 137 JUnit tests, 86 Vitest tests, a static check of all 80 endpoints' authorization and 0 axe accessibility violations over 34 UI states.",
    ],
  },
  {
    name: "AegisOps AI",
    sub: "Multi-Agent DevSecOps Platform",
    tech: ["Python", "FastAPI", "WebSockets", "pytest", "Bandit", "pip-audit", "Render"],
    bullets: [
      "Architected a 13-agent orchestration platform with a real-time WebSocket dashboard and an autonomous Monitor, Detect, Diagnose, Heal loop that restarts crashed or leaking processes.",
      "Used pytest, Bandit and pip-audit as deployment gates; validated on the Flask codebase (483 tests), where the pipeline correctly halted before deployment on real failures.",
    ],
  },
  {
    name: "ORBITGUARD",
    sub: "Satellite Collision-Avoidance Platform",
    tech: ["Python", "SciPy", "FastAPI", "PostgreSQL", "React", "TypeScript", "Docker"],
    bullets: [
      "Built an orbital engine (SGP4, J2–J4 force model) that screens 10,000 objects over 24 h in 1.8 s; validated against Vallado reference cases (max error 0.12 mm).",
      "Designed a Monte Carlo maneuver optimizer that made 5/5 scenarios safe with 0.0% violation probability versus 23.8% without a maneuver; shipped 6 RBAC portals and 171 automated tests.",
    ],
  },
  {
    name: "AdaptiveFlow",
    sub: "AI-Native Project Intelligence Platform",
    tech: ["Python", "FastAPI", "React", "TypeScript", "NumPy", "NetworkX", "NGBoost"],
    bullets: [
      "Built a Jira-style platform with an explainable task-allocation engine and a BiGRU model implemented from scratch in NumPy with full backpropagation through time.",
      "Forecast task duration with NGBoost (MAE 0.91 days, 95.2% interval coverage) and added a tamper-evident decision ledger using SHA-256 hash chaining and Ed25519 signatures.",
    ],
  },
  {
    name: "NyayaSahayak",
    sub: "Legal Evidence Analysis Platform",
    tech: ["Node.js", "SQLite", "JWT", "Gemini API", "MCP", "Playwright", "Docker"],
    bullets: [
      "Built a human-in-the-loop REST API with JWT authentication, per-case access control, hardened file uploads and a custom MCP server exposing 7 tools; every finding traces to a source quote.",
      "Wrote 94 unit and API tests plus 140+ Playwright browser checks covering authorization and crash recovery.",
    ],
  },
  {
    name: "EVO-COMP",
    sub: "Evolutionary Compiler with Digital-Twin Validation",
    tech: ["Python", "FastAPI", "React", "TypeScript", "pytest"],
    bullets: [
      "Hand-built a 13-stage compiler (lexer, parser, semantic analysis, IR, 10 optimization passes, bytecode VM) with no compiler libraries and 108 automated tests.",
      "Designed a genetic search over optimization-pass orderings; a differential-execution digital twin caught a deliberately unsound pass.",
    ],
  },
];

export const extraProjects = [
  { name: "Intervion", d: "AI mock interview platform with a custom in-memory database engine, Next.js and FastAPI." },
  { name: "CYBERGENE", d: "Reproducible intrusion-detection research harness on UNSW-NB15, 30 paired seeds." },
  { name: "Novara", d: "AI-text and plagiarism detector, React and Node.js." },
  { name: "AI Mission Commander", d: "Offline voice-driven simulator with a local LLM." },
];

export const skillGroups: { title: string; items: string[] }[] = [
  { title: "Languages", items: ["Python", "Java", "C++", "C", "JavaScript", "TypeScript", "SQL", "Bash"] },
  {
    title: "Backend and APIs",
    items: ["FastAPI", "Node.js", "Express", "REST APIs", "WebSockets", "SQLAlchemy", "JWT Authentication", "RBAC", "Microservices", "System Design"],
  },
  { title: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "Vite", "HTML5", "CSS3"] },
  {
    title: "AI / ML",
    items: ["Generative AI", "LLMs (Gemini, OpenAI, Claude, Llama)", "RAG", "Multi-Agent Systems", "MCP", "NLP", "Vector Search", "scikit-learn", "LightGBM", "NumPy", "SciPy"],
  },
  { title: "Databases", items: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Query Optimization", "Indexing"] },
  {
    title: "DevOps and Security",
    items: ["Docker", "CI/CD", "Git", "GitHub", "nginx", "Render", "Vercel", "pytest", "Playwright", "Bandit", "pip-audit"],
  },
  {
    title: "Core CS",
    items: ["Data Structures and Algorithms", "OOP", "Operating Systems", "Database Systems", "Compiler Design", "Computer Networks"],
  },
];

// Marquee: every tool from the resume
export const stack: string[] = Array.from(
  new Set([
    "Python", "Java", "C++", "C", "JavaScript", "TypeScript", "SQL", "Bash",
    "FastAPI", "Node.js", "Express", "REST APIs", "WebSockets", "SQLAlchemy", "JWT", "RBAC", "Microservices",
    "React", "Next.js", "Tailwind CSS", "Vite", "HTML5", "CSS3",
    "Generative AI", "Gemini", "OpenAI", "Claude", "Llama", "RAG", "Multi-Agent Systems", "MCP", "NLP", "Vector Search",
    "scikit-learn", "LightGBM", "NumPy", "SciPy", "NetworkX", "NGBoost",
    "PostgreSQL", "MySQL", "SQLite", "MongoDB",
    "Docker", "CI/CD", "Git", "GitHub", "nginx", "Render", "Vercel", "pytest", "Playwright", "Bandit", "pip-audit",
  ]),
);

export interface TimelineItem {
  when: string;
  title: string;
  org: string;
  kind: "Experience" | "Education" | "Research" | "Certifications";
  bullets?: string[];
}

export const timeline: TimelineItem[] = [
  {
    when: "Jun 2026 – Jul 2026",
    title: "Generative AI & Prompt Engineering Intern",
    org: "Ardent Software · Remote",
    kind: "Experience",
    bullets: [
      "Built INTERVION, a multi-agent interview coaching platform using Generative AI, Computer Vision and Voice Intelligence, as the internship project.",
      "Applied Generative AI and prompt engineering to real-world interview coaching, contributing to the design and implementation of an intelligent interview assistance platform.",
      "Completed the internship with Outstanding overall performance and conduct.",
    ],
  },
  {
    when: "May 2026 – Jun 2026",
    title: "AI / Full-Stack Development Intern",
    org: "Titan Company Limited (Systems Department)",
    kind: "Experience",
    bullets: [
      "Engineered a RAG chatbot for enterprise product knowledge on the Sales Buddy platform (Tanishq and Mia), improving retrieval precision for real-time pricing and availability lookups.",
      "Built AI analytics modules that surface sales insights and contributed to an AI-based Virtual Try-On feature.",
      "Integrated AI capabilities into a unified enterprise platform through REST APIs with cross-functional engineering teams.",
    ],
  },
  {
    when: "Aug 2024 – Present",
    title: "B.Tech, Computer Science and Engineering",
    org: "Vellore Institute of Technology (VIT), Vellore · Data Science Specialization",
    kind: "Education",
  },
  {
    when: "Certified",
    title: "Certifications",
    org: "Generative AI (IBM) · DevOps (Launched Global) · Data Science and Machine Learning (Rinex) · Ethical Hacking and Cybersecurity (Rinex) · Web Development and Java (Udemy)",
    kind: "Certifications",
  },
];

export const principles = [
  { t: "Test everything", d: "500+ automated tests across projects, from unit suites to Playwright browser checks." },
  { t: "Gate before deploy", d: "pytest, Bandit and pip-audit decide whether code ships, and the pipeline halts on real failures." },
  { t: "Show your sources", d: "Every finding traces to a source quote, and every decision lands in a tamper-evident ledger." },
  { t: "Build from first principles", d: "A BiGRU in plain NumPy and a compiler with no compiler libraries, to know how things really work." },
];
