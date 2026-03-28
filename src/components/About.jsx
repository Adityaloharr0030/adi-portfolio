import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiUser, FiBook, FiAward } from 'react-icons/fi';
import './About.css';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { icon: FiUser, value: '2027', label: 'B.Tech Expected' },
    { icon: FiBook, value: '10+', label: 'Personal Projects' },
    { icon: FiAward, value: '12+', label: 'Core Technologies' },
  ];

  return (
    <section id="about" className="about" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">About Me</span>
          <h2 className="section-title">
            Passionate about creating <span className="gradient-text">elegant solutions</span> to complex problems
          </h2>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              I&apos;m an ambitious <strong>B.Tech Computer Engineering student (2023-2027)</strong> at 
              College of Engineering and Technology, Jalgaon. Focused on <strong>Full-Stack Web Development</strong>, 
              I specialize in creating end-to-end applications using modern JavaScript frameworks.
            </p>
            <p>
              My expertise includes <strong>React, Next.js, and Node.js</strong>, along with database systems like 
              <strong>MongoDB and MySQL</strong>. I have a strong foundation in data structures, algorithms, 
              and system architecture, which I apply to solve complex problems with clean, efficient code.
            </p>
            <p>
              Beyond coding, I&apos;m an active <strong>GitHub contributor</strong> and a continuous learner 
              dedicated to staying updated with the latest industry best practices and emerging technologies.
            </p>
          </motion.div>

          <motion.div
            className="stats-grid"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <stat.icon className="stat-icon" />
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
