/**
 * portfolioData.js
 * ─────────────────
 * Single source of truth for all portfolio content.
 * Both Game Mode and Classic Mode import from here.
 */

// ── Personal Info ────────────────────────────────────────────────────────────
export const personalInfo = {
  name: 'Aditya Lohar',
  firstName: 'ADITYA',
  tagline: 'Final-year B.Tech Computer Engineering student (2027) building production software across Flutter, full-stack web, and AI integration.',
  roles: ['Flutter & Full-Stack Developer', 'AI-Integrated Apps', 'Software Engineering Intern', 'Flutter Developer'],
  domains: ['Flutter & Full-Stack | AI-Integrated Apps'],
  email: 'adityalohar00030@gmail.com',
  resumePath: './resume.pdf',
  social: {
    github: 'https://github.com/Adityaloharr0030',
    linkedin: 'https://linkedin.com/in/aditya-lohar-3037b32b9',
  },
  siteUrl: 'https://adi-portfolio-beta-coral.vercel.app/',
};

// ── Stats (About section) ────────────────────────────────────────────────────
export const stats = [
  { value: '2027', label: 'B.Tech Expected',  color: '#818cf8', icon: 'user' },
  { value: 'Top 800', label: 'Meta Hackathon', color: '#c084fc', icon: 'award' },
  { value: '11', label: 'Features Shipped', color: '#38bdf8', icon: 'cpu' },
  { value: '3', label: 'Active Domains', color: '#f472b6', icon: 'globe' },
  { value: '5+', label: 'Live Deployments', color: '#4ade80', icon: 'zap' },
  { value: '100+', label: 'Git Commits', color: '#fbbf24', icon: 'book' },
];

// ── About Text ───────────────────────────────────────────────────────────────
export const aboutParagraphs = [
  'I am a final-year B.Tech Computer Engineering student (DBATU, 2027) building production software across Flutter, full-stack web (React, Next.js, Node.js), and AI integration (Gemini API, Claude API).',
  'I have shipped a full-CRUD REST API, an SSR streaming platform, and an 11-feature AI farming app currently competing at the FAR AWAY 2026 International Hackathon.',
  'Recently, I ranked in the Top 800 out of 31,000+ entrants at the Meta PyTorch OpenEnv Hackathon. I am passionate about engineering offline-first architectures, integrating LLMs into mobile apps, and building scalable backends.',
];

// ── Tech Strip ───────────────────────────────────────────────────────────────
export const techStrip = ['Flutter', 'Next.js', 'React', 'Node.js', 'Firebase', 'Gemini API', 'MongoDB', 'MySQL'];

// ── Projects ─────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 'krushi-mitra',
    icon: '🌾',
    category: 'Mobile & AI',
    title: 'Krushi Mitra — AI-Powered Farmer App',
    description: 'Production Flutter app with 11 features: AI Crop Doctor (Gemini Vision API for real-time disease detection), trilingual chatbot (Hindi/Marathi/English), live mandi price aggregation, weather dashboard, soil health tracker, and government scheme navigator. Built with offline-first architecture (Firestore + SQLite sync), a 5-key Gemini API load balancer for zero-downtime inference, and Riverpod state management. Currently competing at the FAR AWAY 2026 International Hackathon.',
    tech: ['Flutter', 'Firebase', 'SQLite', 'Gemini API', 'Riverpod'],
    stats: { features: '11', ai: 'Gemini Vision', offline: 'Yes' },
    github: 'https://github.com/Adityaloharr0030',
    demo: '#',
    featured: true,
  },
  {
    id: 'internship-agent',
    icon: '🤖',
    category: 'AI & Automation',
    title: 'Internship Automation Agent',
    description: 'Autonomous bot that automates internship applications end-to-end: Claude API for intelligent form-filling and cover letter generation, Playwright for headless browser automation across job portals, and GitHub Actions for scheduled daily CI/CD runs. Handles login, search, apply, and tracking workflows without human intervention.',
    tech: ['Claude API', 'Playwright', 'GitHub Actions', 'Node.js'],
    stats: { ai: 'Claude', auto: 'CI/CD', browser: 'Headless' },
    github: 'https://github.com/Adityaloharr0030',
    demo: '#',
    featured: true,
  },
  {
    id: 'crazyxani',
    icon: '🎞️',
    category: 'Fullstack',
    title: 'CrazyXAni — Anime Streaming Platform',
    description: 'An SSR streaming platform aggregating AniList API data, with real-time search, JWT-secured sessions, and MongoDB-backed watchlists; optimized for SEO via Next.js.',
    tech: ['Next.js', 'React', 'Node.js', 'MongoDB', 'JWT'],
    stats: { load: 'Fast', auth: 'JWT', mode: 'Dark' },
    github: 'https://github.com/Adityaloharr0030/CrazyXani',
    demo: 'https://crazyxani.vercel.app/',
    featured: true,
  },
  {
    id: 'inventory-api',
    icon: '📦',
    category: 'Backend',
    title: 'Inventory Management REST API',
    description: 'Developed a secure full-CRUD REST API with role-based JWT authentication and a normalized MySQL schema; validated all endpoints via Postman.',
    tech: ['Node.js', 'Express.js', 'MySQL', 'JWT', 'Postman'],
    stats: { schema: 'Normalized', secure: 'JWT', ops: 'REST' },
    github: 'https://github.com/Adityaloharr0030/Inventory-management-system',
    demo: '#',
    featured: false,
  },
  {
    id: 'portfolio',
    icon: '🌐',
    category: 'Fullstack',
    title: 'Portfolio Website — Interactive 3D Showcase',
    description: 'Built an interactive portfolio with WebGL 3D scenes (Three.js) and GSAP ScrollTrigger animations; deployed on Vercel.',
    tech: ['React', 'Vite', 'Three.js', 'Framer Motion', 'Three.js Fiber'],
    stats: { animate: '60fps', ui: '3D WebGL', perf: 'A+' },
    github: 'https://github.com/Adityaloharr0030',
    demo: '#',
    featured: true,
  },
];

export const projectCategories = ['All', 'Fullstack', 'Mobile & AI', 'AI & Automation', 'Backend'];

// ── Skills ───────────────────────────────────────────────────────────────────
export const skillCategories = [
  {
    title: 'Web & Backend',
    icon: '🌐',
    color: '#818cf8',
    skills: [
      { name: 'React & Next.js', level: 90 },
      { name: 'Node.js & Express', level: 85 },
      { name: 'REST APIs & JWT', level: 88 },
      { name: 'JavaScript / TypeScript', level: 92 },
      { name: 'MongoDB & MySQL', level: 85 },
      { name: 'SSR & SEO', level: 80 },
    ],
  },
  {
    title: 'Mobile & AI',
    icon: '📱',
    color: '#f472b6',
    skills: [
      { name: 'Flutter 3.x', level: 85 },
      { name: 'Firebase & SQLite', level: 88 },
      { name: 'Riverpod', level: 80 },
      { name: 'Gemini & Claude API', level: 85 },
      { name: 'Dart', level: 82 },
      { name: 'Python', level: 80 },
    ],
  },
  {
    title: 'Core CS & Logic',
    icon: '🧠',
    color: '#38bdf8',
    skills: [
      { name: 'Data Structures & Algorithms', level: 85 },
      { name: 'OOP & DBMS', level: 88 },
      { name: 'Operating Systems', level: 80 },
      { name: 'Computer Networks', level: 78 },
      { name: 'Java', level: 88 },
      { name: 'Clean Code', level: 85 },
    ],
  },
  {
    title: 'Tools & DevOps',
    icon: '🛠️',
    color: '#c084fc',
    skills: [
      { name: 'Git & GitHub Actions', level: 88 },
      { name: 'Docker & Vercel', level: 80 },
      { name: 'Postman', level: 90 },
      { name: 'Android Studio', level: 85 },
      { name: 'VS Code', level: 95 },
    ],
  },
];

// ── Certifications ───────────────────────────────────────────────────────────
export const certifications = [
  // ── Google Cloud ────────────────────────────────────────────────────────────
  {
    title: 'Engineer AI Agents with Agent Development Kit (ADK)',
    issuer: 'Google Cloud',
    date: 'July 2026',
    category: 'Cloud & DevOps',
    link: 'https://www.credly.com/badges/2e21b6c8-af50-48ee-81bd-3a2ae0ac126f/linked_in?t=thopm8',
    color: '#4285F4',
  },
  // ── AWS ─────────────────────────────────────────────────────────────────────
  {
    title: 'AWS SBG Core Team Member',
    issuer: 'AWS Community',
    date: 'August 2026',
    category: 'Cloud & DevOps',
    link: 'https://www.credly.com/badges/47ee28c7-431a-4891-83a4-3da3e68d6763/linked_in?t=tjm3ny',
    color: '#FF9900',
  },
  // ── Oracle ───────────────────────────────────────────────────────────────────
  {
    title: 'Oracle Java Foundations',
    issuer: 'Oracle',
    date: 'August 2026',
    category: 'Core CS & Java',
    link: 'https://mylearn.oracle.com/ou/learning-path/oracle-java-foundations-training-and-assessment/152239',
    color: '#F80000',
  },
  // ── Salesforce ───────────────────────────────────────────────────────────────
  {
    title: 'Salesforce Training & Certification',
    issuer: 'Intellipaat',
    date: 'April 2026',
    category: 'Cloud & DevOps',
    link: 'https://lnkd.in/gTeGhqxw',
    color: '#00A1E0',
  },
  // ── Anthropic ────────────────────────────────────────────────────────────────
  {
    title: 'AI Fluency: Framework & Foundations',
    issuer: 'Anthropic',
    date: 'March 2026',
    category: 'AI & Claude',
    link: 'http://verify.skilljar.com/c/5n9y9eoh5atx',
    color: '#c084fc',
  },
  {
    title: 'Claude 101',
    issuer: 'Anthropic',
    date: 'March 2026',
    category: 'AI & Claude',
    link: 'http://verify.skilljar.com/c/3gc8kxck8h74',
    color: '#c084fc',
  },
  {
    title: 'Claude Code in Action',
    issuer: 'Anthropic',
    date: 'March 23, 2026',
    category: 'AI & Claude',
    link: 'https://verify.skilljar.com/c/dg5r8pnsfng7',
    color: '#c084fc',
  },
  {
    title: 'AI Course',
    issuer: 'Intellipaat',
    date: 'March 23, 2026',
    category: 'AI & Claude',
    link: 'https://intellipaat.com/academy/certificate-link/?Yz0xODI3JnU9MzM1NjM5JmV4dD0x',
    color: '#38bdf8',
  },
  // ── DevOps & Systems ─────────────────────────────────────────────────────────
  {
    title: 'System Design',
    issuer: 'Scaler',
    date: 'March 24, 2026',
    category: 'DevOps & Systems',
    link: 'https://verify.skilljar.com',
    color: '#f472b6',
  },
  {
    title: 'DevOps Certification',
    issuer: 'Intellipaat',
    date: 'March 22, 2026',
    category: 'DevOps & Systems',
    link: 'https://intellipaat.com/academy/certificate-link/?Yz0xNjU1JnU9MzM1NjM5JmV4dD0x',
    color: '#38bdf8',
  },
  // ── Cyber Security ───────────────────────────────────────────────────────────
  {
    title: 'Intro to Cyber Security',
    issuer: 'Simplilearn',
    date: 'March 13, 2026',
    category: 'Cyber Security',
    link: 'https://www.linkedin.com/posts/aditya-lohar-3037b32b9_excited-to-share-that-ive-successfully-completed-share-7438245657305325568-cf5-',
    color: '#818cf8',
  },
  // ── Professional ─────────────────────────────────────────────────────────────
  {
    title: 'Entrepreneurship Awareness Programme',
    issuer: 'Ministry of MSME, Govt. of India',
    date: 'February 2026',
    category: 'Professional',
    link: 'https://www.linkedin.com/in/aditya-lohar-3037b32b9/recent-activity/all/',
    color: '#4ade80',
  },
];

export const certCategories = ['All', 'AI & Claude', 'Cloud & DevOps', 'Core CS & Java', 'Cyber Security', 'DevOps & Systems', 'Professional'];

// ── Experience ───────────────────────────────────────────────────────────────
export const experiences = [
  {
    title: 'SAP Intern',
    company: 'Supreme Industries Ltd.',
    location: 'Jalgaon, Maharashtra',
    duration: 'Current',
    description: [
      'Maintained structured ERP records and supported daily SAP data operations across business modules.',
      'Ensured accuracy and compliance with operational standards.'
    ],
    current: true,
  },
  {
    title: 'B.Tech Computer Engineering',
    company: 'KBSCOE&T (NMKC)',
    location: 'Jalgaon / DBATU, Lonere',
    duration: '2023 - 2027',
    description: [
      'Final-year B.Tech Computer Engineering student.',
      'Top 800 of 31,000+ entrants at Meta PyTorch OpenEnv Hackathon (Scaler), advanced to Campus Finale as Team AI_Vengers.',
      'Competing at FAR AWAY 2026 International Hackathon with Krushi Mitra.',
      'Participant, TECH-CARVAAN 2026 AI Buildathon.'
    ],
    current: true,
  },
];

// ── Hackathon Achievements ───────────────────────────────────────────────────
export const hackathons = [
  {
    title: 'Meta PyTorch OpenEnv Hackathon',
    result: 'Top 800 / 31,000+',
    location: 'Campus Finale, Bengaluru',
    team: ['Pruthviraj Phuse', 'Sameer Shah'],
    teamName: 'AI_Vengers',
    color: '#f59e0b',
    icon: '🏆',
  },
  {
    title: 'FAR AWAY International Hackathon 2026',
    result: 'Round 1 Qualifier',
    location: 'Zuup / Zylon Labs (Online)',
    team: ['Pruthviraj Phuse'],
    teamName: 'AI_Vengers',
    project: 'Krushi Mitra',
    color: '#4ade80',
    icon: '🌾',
  },
  {
    title: 'HACKHAZARDS 2026',
    result: 'Participant',
    location: 'NAMESPACE (Online)',
    team: [],
    teamName: '',
    link: 'https://lnkd.in/d5Hk4m3g',
    color: '#818cf8',
    icon: '⚡',
  },
  {
    title: 'TenzorX National AI Hackathon 2026',
    result: 'Participant',
    location: 'Poonawalla Fincorp × Unstop (Online)',
    team: [],
    teamName: '',
    link: 'https://lnkd.in/daDfb-uU',
    color: '#38bdf8',
    icon: '🤖',
  },
  {
    title: 'QuizOff 2026 — India\'s Biggest AI Quiz',
    result: 'Participant — 5,25,000+ students',
    location: 'CampusCrew × Unstop (Online)',
    team: [],
    teamName: '',
    link: 'https://lnkd.in/dHrmerNt',
    color: '#f472b6',
    icon: '🧠',
  },
];

// ── Game Mode: Zone Positions on the Track ───────────────────────────────────
// Each zone is positioned along a straight Z-axis highway (x, z coordinates)
export const zonePositions = {
  about:          { x: 0, z: 0,   color: '#818cf8', label: 'About Me' },
  projects:       { x: 0, z: 80,  color: '#c084fc', label: 'Projects' },
  skills:         { x: 0, z: 160, color: '#38bdf8', label: 'Skills' },
  certifications: { x: 0, z: 240, color: '#f472b6', label: 'Credentials' },
  contact:        { x: 0, z: 320, color: '#4ade80', label: 'Contact' },
};
