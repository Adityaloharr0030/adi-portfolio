import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { SiSpringboot, SiReact, SiPostgresql, SiApachekafka, SiRedis, SiDocker, SiMongodb } from 'react-icons/si';
import './Projects.css';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const projects = [
    {
      icon: '🎞️',
      title: 'CrazyXani',
      description: 'Full-stack anime streaming aggregator integrating external APIs (Anilist) for real-time data, search, and user watchlists.',
      tech: [
        { name: 'Next.js', icon: SiReact },
        { name: 'Node.js', icon: null },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'Anilist API', icon: null },
      ],
      stats: { features: 'SSR', state: 'Watchlist', perf: 'Optimized' },
      github: 'https://github.com/Adityaloharr0030/CrazyXani',
      demo: 'https://crazyxani.vercel.app/', // Assuming common URL pattern or leave as is if unknown
      featured: true,
    },
    {
      icon: '🏦',
      title: 'Bank Management System',
      description: 'A comprehensive Java-based system for managing bank accounts, transactions, and user data with object-oriented principles.',
      tech: [
        { name: 'Java', icon: null },
        { name: 'OOP', icon: null },
        { name: 'Data Structures', icon: null },
      ],
      stats: { logic: 'Core Java', system: 'CLI', secure: 'Auth' },
      github: 'https://github.com/Adityaloharr0030/Bank-management-system',
      demo: 'https://github.com/Adityaloharr0030/Bank-management-system',
      featured: true,
    },
    {
      icon: '🗳️',
      title: 'Voting System',
      description: 'An interactive web-based voting application built with HTML, CSS, and Javascript for conducting secure online polls.',
      tech: [
        { name: 'HTML5', icon: null },
        { name: 'CSS3', icon: null },
        { name: 'JavaScript', icon: null },
      ],
      stats: { ui: 'Responsive', state: 'Dynamic', build: 'Vercel' },
      github: 'https://github.com/Adityaloharr0030/voting-system',
      demo: 'https://voting-system-self-tau.vercel.app',
      featured: true,
    },
  ];

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Featured Projects</span>
          <h2 className="section-title">
            Things I&apos;ve <span className="gradient-text">built</span>
          </h2>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -12, scale: 1.03 }}
              className={`project-card interactive ${project.featured ? 'featured' : ''}`}
            >
              <div className="project-icon">{project.icon}</div>
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tech">
                {project.tech.map((t) => (
                  <span key={t.name} className="tech-tag">
                    {t.icon && <t.icon />}
                    {t.name}
                  </span>
                ))}
              </div>

              <div className="project-stats">
                {Object.entries(project.stats).map(([key, value]) => (
                  <div key={key} className="stat">
                    <span className="stat-value">{value}</span>
                    <span className="stat-label">{key}</span>
                  </div>
                ))}
              </div>

              <div className="project-links">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiGithub /> View Code
                </motion.a>
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-btn primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiExternalLink /> Live Demo
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
