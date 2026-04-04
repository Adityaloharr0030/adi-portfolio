import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FaJava, FaPython, FaJs, FaDatabase, FaGitAlt, FaDocker,
  FaNodeJs, FaReact
} from 'react-icons/fa';
import {
  SiMysql, SiPostgresql, SiMongodb, SiSalesforce,
  SiSpringboot, SiNextdotjs, SiExpress
} from 'react-icons/si';
import './Skills.css';

// ── Animated radial ring ─────────────────────────────────────────────────────
const RadialRing = ({ level, color, size = 90 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const R = (size - 10) / 2;
  const circumference = 2 * Math.PI * R;
  const dash = inView ? circumference * (level / 100) : 0;

  return (
    <div ref={ref} className="radial-ring-wrap" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Track */}
        <circle
          cx={size / 2} cy={size / 2} r={R}
          fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6"
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2} cy={size / 2} r={R}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - dash}
          style={{ transformOrigin: 'center', rotate: '-90deg', filter: `drop-shadow(0 0 6px ${color})` }}
          initial={{ strokeDashoffset: circumference }}
          animate={inView ? { strokeDashoffset: circumference - dash } : {}}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.2 }}
        />
      </svg>
      <span className="radial-ring-label" style={{ color }}>{level}%</span>
    </div>
  );
};

// ── Infinite marquee logos ───────────────────────────────────────────────────
const MARQUEE_ICONS = [
  { Icon: FaReact, label: 'React', color: '#61dafb' },
  { Icon: SiNextdotjs, label: 'Next.js', color: '#fff' },
  { Icon: FaNodeJs, label: 'Node.js', color: '#339933' },
  { Icon: SiExpress, label: 'Express', color: '#aaa' },
  { Icon: FaJava, label: 'Java', color: '#f89820' },
  { Icon: SiSpringboot, label: 'Spring', color: '#6db33f' },
  { Icon: FaJs, label: 'JavaScript', color: '#f7df1e' },
  { Icon: SiMysql, label: 'MySQL', color: '#4479a1' },
  { Icon: SiPostgresql, label: 'PostgreSQL', color: '#336791' },
  { Icon: SiMongodb, label: 'MongoDB', color: '#47a248' },
  { Icon: FaDocker, label: 'Docker', color: '#2496ed' },
  { Icon: FaGitAlt, label: 'Git', color: '#f05032' },
  { Icon: SiSalesforce, label: 'Salesforce', color: '#00a1e0' },
  { Icon: FaDatabase, label: 'SQL', color: '#818cf8' },
];

const InfiniteMarquee = () => (
  <div className="marquee-outer" aria-label="Technology logos">
    <div className="marquee-track">
      {[...MARQUEE_ICONS, ...MARQUEE_ICONS].map((item, i) => (
        <div key={i} className="marquee-item">
          <item.Icon style={{ color: item.color, fontSize: '1.8rem' }} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  </div>
);

// ── Skill card with radial ring ──────────────────────────────────────────────
const SKILL_COLORS = ['#818cf8', '#c084fc', '#38bdf8', '#f472b6'];

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories = [
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

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Technical Skills</span>
          <h2 className="section-title">
            Technologies I <span className="gradient-text">work with</span>
          </h2>
        </motion.div>

        {/* Infinite marquee */}
        <InfiniteMarquee />

        {/* Category cards with radial rings */}
        <div className="skills-grid">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              className="skill-category"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: ci * 0.12 }}
              style={{ '--cat-color': cat.color }}
            >
              <div className="category-header">
                <span className="category-icon">{cat.icon}</span>
                <h3>{cat.title}</h3>
                <div className="cat-glow-bar" style={{ background: cat.color }} />
              </div>

              <div className="skills-ring-grid">
                {cat.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    className="skill-ring-item"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: ci * 0.1 + si * 0.07 }}
                    whileHover={{ scale: 1.08, y: -4 }}
                  >
                    <RadialRing level={skill.level} color={cat.color} size={78} />
                    <span className="skill-ring-name">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
