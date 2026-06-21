/**
 * InfoPanel.jsx
 * ─────────────
 * Slide-in panel displaying portfolio content when near a zone.
 */
import { motion, AnimatePresence } from 'framer-motion';
import {
  personalInfo, aboutParagraphs, stats,
  projects, skillCategories, certifications
} from '../../data/portfolioData';

const panelVariants = {
  hidden: { x: 400, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { x: 400, opacity: 0, transition: { duration: 0.3 } },
};

/* ── Zone content renderers ───────────────────────────────────────────────── */
const AboutContent = () => (
  <div className="info-panel-content">
    <div className="info-panel-header">
      <span className="info-icon">👤</span>
      <h3>About Me</h3>
    </div>
    <div className="info-stats">
      {stats.map((s) => (
        <div key={s.label} className="info-stat" style={{ '--stat-color': s.color }}>
          <span className="info-stat-value">{s.value}</span>
          <span className="info-stat-label">{s.label}</span>
        </div>
      ))}
    </div>
    {aboutParagraphs.map((p, i) => (
      <p key={i} className="info-text">{p}</p>
    ))}
  </div>
);

const ProjectsContent = () => (
  <div className="info-panel-content">
    <div className="info-panel-header">
      <span className="info-icon">🚀</span>
      <h3>Projects</h3>
    </div>
    <div className="info-projects-list">
      {projects.map((p) => (
        <div key={p.id} className="info-project-card">
          <div className="info-project-top">
            <span>{p.icon}</span>
            <span className="info-project-title">{p.title}</span>
            <span className="info-project-cat">{p.category}</span>
          </div>
          <p className="info-project-desc">{p.description}</p>
          <div className="info-project-tech">
            {p.tech.map((t) => <span key={t} className="info-chip">{t}</span>)}
          </div>
          <div className="info-project-links">
            {p.github && p.github !== '#' && (
              <a href={p.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            )}
            {p.demo && p.demo !== '#' && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer">Live Demo ↗</a>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const SkillsContent = () => (
  <div className="info-panel-content">
    <div className="info-panel-header">
      <span className="info-icon">⚡</span>
      <h3>Skills</h3>
    </div>
    {skillCategories.map((cat) => (
      <div key={cat.title} className="info-skill-category">
        <h4 style={{ color: cat.color }}>{cat.icon} {cat.title}</h4>
        <div className="info-skill-bars">
          {cat.skills.map((s) => (
            <div key={s.name} className="info-skill-row">
              <span className="info-skill-name">{s.name}</span>
              <div className="info-skill-bar-track">
                <div className="info-skill-bar-fill" style={{ width: `${s.level}%`, background: cat.color }} />
              </div>
              <span className="info-skill-pct" style={{ color: cat.color }}>{s.level}%</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const CertificationsContent = () => (
  <div className="info-panel-content">
    <div className="info-panel-header">
      <span className="info-icon">🏆</span>
      <h3>Credentials</h3>
    </div>
    <div className="info-certs-list">
      {certifications.map((c) => (
        <div key={c.title} className="info-cert-item" style={{ '--cert-color': c.color }}>
          <div className="info-cert-top">
            <span className="info-cert-title">{c.title}</span>
            <span className="info-cert-date">{c.date}</span>
          </div>
          <span className="info-cert-issuer">{c.issuer}</span>
          <a href={c.link} target="_blank" rel="noopener noreferrer" className="info-cert-link">
            Verify ↗
          </a>
        </div>
      ))}
    </div>
  </div>
);

const ContactContent = () => (
  <div className="info-panel-content">
    <div className="info-panel-header">
      <span className="info-icon">📡</span>
      <h3>Contact</h3>
    </div>
    <div className="info-contact-section">
      <p className="info-text">Ready to collaborate? Reach out through any channel below.</p>

      <div className="info-contact-item">
        <span className="info-contact-label">Email</span>
        <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
      </div>

      <div className="info-contact-links">
        <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer" className="info-social-btn github">
          GitHub ↗
        </a>
        <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer" className="info-social-btn linkedin">
          LinkedIn ↗
        </a>
      </div>

      <a href={personalInfo.resumePath} target="_blank" rel="noopener noreferrer" className="info-resume-btn">
        📄 Download Resume
      </a>
    </div>
  </div>
);

/* ── Content map ──────────────────────────────────────────────────────────── */
const ZONE_CONTENT = {
  about: AboutContent,
  projects: ProjectsContent,
  skills: SkillsContent,
  certifications: CertificationsContent,
  contact: ContactContent,
};

const ZONE_COLORS = {
  about: '#818cf8',
  projects: '#c084fc',
  skills: '#38bdf8',
  certifications: '#f472b6',
  contact: '#4ade80',
};

/* ── Main InfoPanel ───────────────────────────────────────────────────────── */
const InfoPanel = ({ activeZone }) => {
  const Content = activeZone ? ZONE_CONTENT[activeZone] : null;
  const color = activeZone ? ZONE_COLORS[activeZone] : '#818cf8';

  return (
    <AnimatePresence>
      {Content && (
        <motion.div
          className="info-panel"
          style={{ '--zone-color': color }}
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          key={activeZone}
        >
          <div className="info-panel-glow" />
          <Content />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoPanel;
