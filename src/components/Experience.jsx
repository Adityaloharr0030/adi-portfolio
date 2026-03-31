import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import './Experience.css';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const experiences = [
    {
      title: 'B.Tech in Computer Engineering',
      company: 'CET, NMKC, Jalgaon, MH',
      location: 'Jalgaon, MH',
      duration: '2023 - 2027 (Expected)',
      description: [
        'Pursuing Bachelor of Technology with a focus on system engineering and architecture.',
        'Core Coursework: DSA, DBMS, Operating Systems, Computer Networks, OOP, Web Development.',
        'Developing production-grade applications across Web, Java, and Salesforce domains.',
      ],
      current: true,
    },
    {
      title: 'Full-Stack Development Journey',
      company: 'Self-Directed Specialization',
      location: 'Remote',
      duration: '2023 - Present',
      description: [
        'Mastering end-to-end system design using React, Next.js, and Node.js.',
        'Architecting secure REST APIs and performing relational database design (MySQL, MongoDB).',
        'Consistently shipping projects to GitHub and optimizing for performance and SEO.',
      ],
      current: true,
    },
  ];

  return (
    <section id="experience" className="experience" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Career Path</span>
          <h2 className="section-title">
            My <span className="gradient-text">journey</span>
          </h2>
        </motion.div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <motion.div
                className="timeline-marker"
                whileHover={{ scale: 1.2 }}
              />
              <div className={`timeline-content ${exp.current ? 'current' : ''}`}>
                <div className="timeline-header">
                  <div>
                    <h3>{exp.title}</h3>
                    <p className="company">{exp.company}</p>
                  </div>
                  {exp.current && (
                    <motion.span 
                      className="current-badge"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      Current
                    </motion.span>
                  )}
                </div>

                <div className="timeline-meta">
                  <span className="meta-item">
                    <FiCalendar /> {exp.duration}
                  </span>
                  <span className="meta-item">
                    <FiMapPin /> {exp.location}
                  </span>
                </div>

                <ul className="timeline-details">
                  {exp.description.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
