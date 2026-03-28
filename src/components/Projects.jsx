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
      featured: true,
    },
    {
      icon: '📦',
      title: 'Inventory Management',
      description: 'Robust RESTful backend solution with JWT authentication and MySQL for structured inventory data management.',
      tech: [
        { name: 'Node.js', icon: null },
        { name: 'Express.js', icon: null },
        { name: 'MySQL', icon: SiPostgresql },
        { name: 'JWT', icon: null },
      ],
      stats: { auth: 'JWT', crud: 'Full', test: 'Postman' },
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
              className={`project-card ${project.featured ? 'featured' : ''}`}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
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
                  href="#"
                  className="link-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiGithub /> View Code
                </motion.a>
                <motion.a
                  href="#"
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
