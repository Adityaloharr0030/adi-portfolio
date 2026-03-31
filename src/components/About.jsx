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
              I am a <strong>B.Tech Computer Engineering student (2023-2027)</strong> delivering 
              production-grade applications across three domains: <strong>Full-Stack Web Development</strong>, 
              <strong>Java Engineering</strong>, and <strong>Salesforce CRM Administration</strong>.
            </p>
            <p>
              I have a proven ability to architect, build, and ship end-to-end systems independently—from 
              <strong> RESTful APIs and SSR platforms</strong> to relational database design. My focus is on 
              delivering scalable, efficient, and maintainable solutions.
            </p>
            <p>
              Currently expanding my technical expertise in <strong>Data Structures, Algorithms, and System Architecture</strong>, 
              I am eager to contribute my real-world skills in a challenging internship environment.
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
