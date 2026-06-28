import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { projects as portfolioProjects, projectCategories } from '../../../data/portfolioData';
import ProjectCard from './ProjectCard';
import './Projects.css';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Map portfolioData projects to the format ProjectCard expects
  // (tech as { name, icon } objects)
  const projects = portfolioProjects.map((p) => ({
    ...p,
    tech: p.tech.map((t) =>
      typeof t === 'string' ? { name: t, icon: null } : t
    ),
  }));

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="projects-bg-blur"></div>
      <div className="container">
        <motion.div
          className="section-header center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag glow">Selected Works</span>
          <h2 className="section-title">
            Engineering <span className="gradient-text shine">Solutions</span>
          </h2>
          <p className="section-subtitle">
            A showcase of AI-powered apps, full-stack platforms, and production-grade engineering.
          </p>

          <div className="filter-wrapper">
            {projectCategories.map((cat) => (
              <motion.button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.div layoutId="active-pill" className="active-pill" />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="projects-grid-v2"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id || project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
