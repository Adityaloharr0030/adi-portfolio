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
  tagline: 'B.Tech Computer Engineering student (2027) delivering production-grade applications across three domains: Full-Stack Web, Java Engineering, and Salesforce CRM.',
  roles: ['Full-Stack Developer', 'Java Engineer', 'Salesforce Developer', 'Problem Solver'],
  domains: ['Full-Stack | Java | Salesforce'],
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
  { value: '10+',  label: 'Personal Projects', color: '#c084fc', icon: 'book' },
  { value: '12+',  label: 'Core Technologies', color: '#38bdf8', icon: 'award' },
  { value: '3',    label: 'Active Domains',    color: '#f472b6', icon: 'cpu' },
  { value: '5+',   label: 'Live Deployments',  color: '#4ade80', icon: 'globe' },
  { value: '100+', label: 'Git Commits',       color: '#fbbf24', icon: 'zap' },
];

// ── About Text ───────────────────────────────────────────────────────────────
export const aboutParagraphs = [
  'I am a B.Tech Computer Engineering student (2023-2027) delivering production-grade applications across three domains: Full-Stack Web Development, Java Engineering, and Salesforce CRM Administration.',
  'I have a proven ability to architect, build, and ship end-to-end systems independently — from RESTful APIs and SSR platforms to relational database design. My focus is on delivering scalable, efficient, and maintainable solutions.',
  'Currently expanding expertise in Data Structures, Algorithms, and System Architecture, eager to contribute real-world skills in a challenging internship environment.',
];

// ── Tech Strip ───────────────────────────────────────────────────────────────
export const techStrip = ['React', 'Node.js', 'Java', 'PostgreSQL', 'Docker', 'Salesforce'];

// ── Projects ─────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 'crazyxani',
    icon: '🎞️',
    category: 'Fullstack',
    title: 'CrazyXani',
    description: 'High-performance SSR anime platform with real-time streaming and global search. Integrated with AniList API for dynamic metadata.',
    tech: ['Next.js', 'MongoDB', 'Node.js'],
    stats: { load: '2ms', auth: 'JWT', mode: 'Dark' },
    github: 'https://github.com/Adityaloharr0030/CrazyXani',
    demo: 'https://crazyxani.vercel.app/',
    featured: true,
  },
  {
    id: 'voting-system',
    icon: '🏛️',
    category: 'Backend',
    title: 'Voting System API',
    description: 'Distributed voting architecture with transactional integrity and anti-fraud logic. Designed for high concurrency.',
    tech: ['SpringBoot', 'PostgreSQL', 'Docker'],
    stats: { scale: 'High', tx: 'ACID', ops: 'REST' },
    github: 'https://github.com/Adityaloharr0030/Voting-system',
    demo: '#',
    featured: true,
  },
  {
    id: 'inventory-engine',
    icon: '📊',
    category: 'Backend',
    title: 'Inventory Engine',
    description: 'Professional inventory control system featuring role-based access and automated reporting pipelines.',
    tech: ['Node.js', 'MySQL', 'Express'],
    stats: { schema: '3NF', secure: 'JWT', build: 'Vite' },
    github: 'https://github.com/Adityaloharr0030/Inventory-management-system',
    demo: '#',
    featured: false,
  },
  {
    id: 'bank-management',
    icon: '🏦',
    category: 'Core Java',
    title: 'Bank Management',
    description: 'Enterprise-grade banking simulator implementing advanced OOP concepts, custom exceptions, and secure IO streams.',
    tech: ['Java', 'OOP', 'IO Streams'],
    stats: { logic: 'Solid', core: 'J2E', data: 'Map' },
    github: 'https://github.com/Adityaloharr0030/Bank-management-system',
    demo: '#',
    featured: true,
  },
  {
    id: 'system-dashboard',
    icon: '🛡️',
    category: 'Fullstack',
    title: 'System Intelligence Dashboard',
    description: 'A dedicated technical hub for monitoring system health, cloud instances, and neural network telemetry datasets.',
    tech: ['React', 'Framer Motion', 'Canvas API'],
    stats: { animate: '60fps', ui: 'Cyber', perf: 'A+' },
    github: 'https://github.com/Adityaloharr0030/',
    demo: '#',
    featured: false,
  },
];

export const projectCategories = ['All', 'Fullstack', 'Backend', 'Core Java'];

// ── Skills ───────────────────────────────────────────────────────────────────
export const skillCategories = [
  {
    title: 'Web Development',
    icon: '🌐',
    color: '#818cf8',
    skills: [
      { name: 'React / Next.js', level: 90 },
      { name: 'Node.js & Express', level: 85 },
      { name: 'JavaScript ES6+', level: 92 },
      { name: 'REST APIs & JWT', level: 88 },
      { name: 'MongoDB & MySQL', level: 85 },
      { name: 'SSR & SEO', level: 80 },
    ],
  },
  {
    title: 'Java Engineering',
    icon: '☕',
    color: '#f472b6',
    skills: [
      { name: 'OOP Principles', level: 90 },
      { name: 'Collections', level: 88 },
      { name: 'Data Structures', level: 85 },
      { name: 'Exception Handling', level: 82 },
      { name: 'Modular Design', level: 80 },
      { name: 'Clean Code', level: 85 },
    ],
  },
  {
    title: 'Salesforce CRM',
    icon: '☁️',
    color: '#38bdf8',
    skills: [
      { name: 'Admin Fundamentals', level: 85 },
      { name: 'Objects & Fields', level: 82 },
      { name: 'Validation Rules', level: 80 },
      { name: 'Reports & Dashboards', level: 75 },
      { name: 'User & Profile Mgmt', level: 78 },
      { name: 'SOQL Basics', level: 70 },
    ],
  },
  {
    title: 'Tools & Platform',
    icon: '🛠️',
    color: '#c084fc',
    skills: [
      { name: 'Git & GitHub', level: 92 },
      { name: 'Docker', level: 75 },
      { name: 'Postman', level: 88 },
      { name: 'VS Code', level: 95 },
    ],
  },
];

// ── Certifications ───────────────────────────────────────────────────────────
export const certifications = [
  {
    title: 'Free Salesforce Training and Certification',
    issuer: 'IntelliPaat',
    date: 'April 4, 2026',
    category: 'Salesforce & CRM',
    link: 'https://intellipaat.com/academy/certificate-link/?Yz0yMjg3JnU9MzM1NjM5JmV4dD0x',
    color: '#00a1e0',
  },
  {
    title: 'Introduction to Cyber Security',
    issuer: 'Simplilearn SkillUp',
    date: 'March 13, 2026',
    category: 'Cyber Security',
    link: 'https://www.linkedin.com/posts/aditya-lohar-3037b32b9_excited-to-share-that-ive-successfully-completed-share-7438245657305325568-cf5-',
    color: '#818cf8',
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
    title: 'Claude 101',
    issuer: 'Anthropic',
    date: 'March 2026',
    category: 'AI & Claude',
    link: 'http://verify.skilljar.com/c/3gc8kxck8h74',
    color: '#c084fc',
  },
  {
    title: 'AI Fluency: Foundations',
    issuer: 'Anthropic',
    date: 'March 2026',
    category: 'AI & Claude',
    link: 'http://verify.skilljar.com/c/5n9y9eoh5atx',
    color: '#c084fc',
  },
  {
    title: 'DevOps Course Certification',
    issuer: 'IntelliPaat',
    date: 'March 22, 2026',
    category: 'DevOps & Systems',
    link: 'https://intellipaat.com/academy/certificate-link/?Yz0xNjU1JnU9MzM1NjM5JmV4dD0x',
    color: '#38bdf8',
  },
  {
    title: 'Artificial Intelligence (AI)',
    issuer: 'IntelliPaat',
    date: 'March 23, 2026',
    category: 'AI & Claude',
    link: 'https://intellipaat.com/academy/certificate-link/?Yz0xODI3JnU9MzM1NjM5JmV4dD0x',
    color: '#38bdf8',
  },
  {
    title: 'Quora System Design',
    issuer: 'Scaler Topics',
    date: 'March 24, 2026',
    category: 'DevOps & Systems',
    link: 'https://verify.skilljar.com',
    color: '#f472b6',
  },
];

export const certCategories = ['All', 'AI & Claude', 'Cyber Security', 'Salesforce & CRM', 'DevOps & Systems'];

// ── Experience ───────────────────────────────────────────────────────────────
export const experiences = [
  {
    title: 'B.Tech in Computer Engineering',
    company: 'CET, NMKC, Jalgaon, MH',
    location: 'Jalgaon, MH',
    duration: '2023 - 2027 (Expected)',
    description: [
      'Pursuing Bachelor of Technology with a focus on system engineering and architecture.',
      'Core Coursework: DSA, DBMS, Operating Systems, Computer Networks, OOP, Web Development.',
      'Developing production-grade applications across Web, Java, and Salesforce domains.',
    ],
    current: true,
  },
  {
    title: 'Personal Engineering & Project Development',
    company: 'Independent Contributor',
    location: 'Remote / Local',
    duration: '2023 - Present',
    description: [
      'Mastering end-to-end system design using React, Next.js, Spring Boot, and Node.js.',
      'Architecting secure REST APIs and performing relational database design (MySQL, PostgreSQL, MongoDB).',
      'Consistently shipping projects to GitHub and optimizing for high-performance and SEO.',
    ],
    current: true,
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
