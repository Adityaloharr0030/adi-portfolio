import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { SiSpringboot, SiReact, SiPostgresql, SiApachekafka, SiRedis, SiDocker, SiMongodb, SiMysql, SiJavascript } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import ProjectCard from './ProjectCard';
import './Projects.css';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const categories = ['All', 'Fullstack', 'Backend', 'Core Java'];

  const projects = [
    {
      icon: '🎞️',
      category: 'Fullstack',
      title: 'CrazyXani',
      description: 'High-performance SSR anime platform with real-time streaming and global search. Integrated with AniList API for dynamic metadata.',
      tech: [
        { name: 'Next.js', icon: SiReact },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'Node.js', icon: null },
      ],
      stats: { load: '2ms', auth: 'JWT', mode: 'Dark' },
      github: 'https://github.com/Adityaloharr0030/CrazyXani',
      demo: 'https://crazyxani.vercel.app/',
      featured: true,
    },
    {
      icon: '🏛️',
      category: 'Backend',
      title: 'Voting System API',
      description: 'Distributed voting architecture with transactional integrity and anti-fraud logic. Designed for high concurrency.',
      tech: [
        { name: 'SpringBoot', icon: SiSpringboot },
        { name: 'PostgreSQL', icon: SiPostgresql },
        { name: 'Docker', icon: SiDocker },
      ],
      stats: { scale: 'High', tx: 'ACID', ops: 'REST' },
      github: 'https://github.com/Adityaloharr0030/Voting-system',
      demo: '#',
      featured: true,
    },
    {
      icon: '📊',
      category: 'Backend',
      title: 'Inventory Engine',
      description: 'Professional inventory control system featuring role-based access and automated reporting pipelines.',
      tech: [
        { name: 'Node.js', icon: null },
        { name: 'MySQL', icon: SiMysql },
        { name: 'Express', icon: null },
      ],
      stats: { schema: '3NF', secure: 'JWT', build: 'Vite' },
      github: 'https://github.com/Adityaloharr0030/Inventory-management-system',
      demo: '#',
      featured: false,
    },
    {
      icon: '🏦',
      category: 'Core Java',
      title: 'Bank Management',
      description: 'Enterprise-grade banking simulator implementing advanced OOP concepts, custom exceptions, and secure IO streams.',
      tech: [
        { name: 'Java', icon: FaJava },
        { name: 'OOP', icon: null },
        { name: 'IO Streams', icon: null },
      ],
      stats: { logic: 'Solid', core: 'J2E', data: 'Map' },
      github: 'https://github.com/Adityaloharr0030/Bank-management-system',
      demo: '#',
      featured: true,
    },
     {
      icon: '🛡️',
      category: 'Fullstack',
      title: 'System Intelligence Dashboard',
      description: 'A dedicated technical hub for monitoring system health, cloud instances, and neural network telemetry datasets.',
      tech: [
        { name: 'React', icon: SiReact },
        { name: 'Framer Motion', icon: null },
        { name: 'Canvas API', icon: null },
      ],
      stats: { animate: '60fps', ui: 'Cyber', perf: 'A+' },
      github: 'https://github.com/Adityaloharr0030/',
      demo: '#',
      featured: false,
    },
  ];

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
            A showcase of distributed systems, full-stack wonders, and architectural excellence.
          </p>

          <div className="filter-wrapper">
            {categories.map((cat) => (
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
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
