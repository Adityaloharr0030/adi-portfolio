import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import MagneticButton from './MagneticButton';
import './Projects.css';

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });

  // Neon Glow Follow Cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative position normalized to [-0.5, 0.5]
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    x.set(relativeX);
    y.set(relativeY);

    // Glow position (actual pixels from top-left)
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`project-card-v2 glass-panel ${project.featured ? 'featured' : ''}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Dynamic Neon Glow Overlay */}
      <motion.div
        className="card-glow"
        style={{
          left: mouseX,
          top: mouseY,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Holographic Scanlines Overlay */}
      <div className="card-scanlines" />

      {/* Main Content (pushed forward in 3D) */}
      <div className="card-content" style={{ transform: 'translateZ(30px)' }}>
        <div className="project-header">
          <div className="project-icon-wrapper">
             <span className="p-icon">{project.icon}</span>
          </div>
          {project.featured && <span className="featured-chip">Featured</span>}
        </div>

        <h3 className="project-name">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="tech-stack">
          {project.tech.map((t, i) => (
            <motion.span 
              key={i} 
              className="tech-item glass-panel"
              whileHover={{ y: -3, scale: 1.05 }}
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {t.icon && <t.icon className="t-icon" />}
              {t.name}
            </motion.span>
          ))}
        </div>

        <div className="project-metrics">
          {Object.entries(project.stats).map(([k, v]) => (
            <div key={k} className="metric">
              <span className="m-val">{v}</span>
              <span className="m-label">{k}</span>
            </div>
          ))}
        </div>

        <div className="card-actions">
          <MagneticButton>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn glass-panel"
              whileHover={{ y: -2, backgroundColor: 'rgba(129, 140, 248, 0.1)' }}
            >
              <FiGithub /> Code
            </motion.a>
          </MagneticButton>
          <MagneticButton>
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn primary"
              whileHover={{ y: -2, scale: 1.02, boxShadow: '0 0 20px rgba(129, 140, 248, 0.4)' }}
            >
              <FiExternalLink /> Live Demo
            </motion.a>
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
