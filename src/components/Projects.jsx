import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { SiSpringboot, SiReact, SiPostgresql, SiApachekafka, SiRedis, SiDocker, SiMongodb, SiMysql } from 'react-icons/si';
import './Projects.css';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const projects = [
    {
      icon: '🎞️',
      title: 'CrazyXani',
      description: 'Full-stack SSR anime platform aggregating data from Anilist API. Features real-time search, streaming, and user watchlists.',
      tech: [
        { name: 'Next.js', icon: SiReact },
        { name: 'Node.js', icon: null },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'Anilist API', icon: null },
      ],
      stats: { features: 'SSR', state: 'Watchlist', perf: 'SEO' },
      github: 'https://github.com/Adityaloharr0030/CrazyXani',
      demo: 'https://crazyxani.vercel.app/',
      featured: true,
    },
    {
      icon: '📊',
      title: 'Inventory Management API',
      description: 'Secure REST API with full CRUD operations and JWT-based role authentication. Built with a normalized MySQL schema.',
      tech: [
        { name: 'Node.js', icon: null },
        { name: 'Express', icon: null },
        { name: 'MySQL', icon: null },
        { name: 'JWT', icon: null },
      ],
      stats: { auth: 'JWT', db: 'MySQL', api: 'REST' },
      github: 'https://github.com/Adityaloharr0030/Inventory-management-system',
      demo: 'https://github.com/Adityaloharr0030/Inventory-management-system',
      featured: true,
    },
    {
      icon: '☕',
      title: 'Java OOP Console App',
      description: 'Core OOP implementation featuring encapsulation, inheritance, and polymorphism for reliable system logic.',
      tech: [
        { name: 'Java', icon: null },
        { name: 'OOP', icon: null },
        { name: 'Collections', icon: null },
        { name: 'Exception Handling', icon: null },
      ],
      stats: { logic: 'OOP', core: 'Java', data: 'Collections' },
      github: 'https://github.com/Adityaloharr0030/Bank-management-system',
      demo: 'https://github.com/Adityaloharr0030/Bank-management-system',
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
                  aria-label={`View ${project.title} source code on GitHub`}
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
                  aria-label={`View live demo of ${project.title}`}
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
