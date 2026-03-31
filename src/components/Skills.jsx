import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FaJava, FaPython, FaJs, FaDatabase, FaGitAlt, FaDocker,
  FaAws, FaNodeJs
} from 'react-icons/fa';
import {
  SiSpringboot, SiHibernate, SiMysql, SiPostgresql,
  SiMongodb, SiRedis, SiApachekafka, SiJunit5,
  SiKubernetes, SiJenkins, SiIntellijidea, SiSalesforce
} from 'react-icons/si';
import './Skills.css';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      title: 'Web Development',
      icon: '🌐',
      skills: [
        { name: 'React & Next.js', icon: FaJs, level: 90 },
        { name: 'Node.js & Express', icon: FaNodeJs, level: 85 },
        { name: 'JavaScript ES6+', icon: FaJs, level: 92 },
        { name: 'REST APIs & JWT', icon: FaDatabase, level: 88 },
        { name: 'MongoDB & MySQL', icon: SiMysql, level: 85 },
        { name: 'SSR & SEO', icon: FaJs, level: 80 },
      ],
    },
    {
      title: 'Java Engineering',
      icon: '☕',
      skills: [
        { name: 'OOP Principles', icon: FaJava, level: 90 },
        { name: 'Collections Framework', icon: FaJava, level: 88 },
        { name: 'Data Structures', icon: FaJava, level: 85 },
        { name: 'Exception Handling', icon: FaJava, level: 82 },
        { name: 'Modular Design', icon: FaJava, level: 80 },
        { name: 'Clean Code', icon: FaJava, level: 85 },
      ],
    },
    {
      title: 'Salesforce CRM',
      icon: '☁️',
      skills: [
        { name: 'Admin Fundamentals', icon: SiSalesforce, level: 85 },
        { name: 'Objects & Fields', icon: SiSalesforce, level: 82 },
        { name: 'Validation Rules', icon: SiSalesforce, level: 80 },
        { name: 'Reports & Dashboards', icon: SiSalesforce, level: 75 },
        { name: 'User & Profile Mgmt', icon: SiSalesforce, level: 78 },
        { name: 'SOQL Basics', icon: SiSalesforce, level: 70 },
      ],
    },
    {
      title: 'Tools & Platform',
      icon: '🛠️',
      skills: [
        { name: 'Git & GitHub', icon: FaGitAlt, level: 92 },
        { name: 'Docker', icon: FaDocker, level: 75 },
        { name: 'Postman', icon: SiIntellijidea, level: 88 },
        { name: 'VS Code', icon: SiIntellijidea, level: 95 },
      ],
    },
  ];

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Technical Skills</span>
          <h2 className="section-title">
            Technologies I <span className="gradient-text">work with</span>
          </h2>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              className="skill-category"
              initial={{ opacity: 0, y: 50 }}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: catIndex * 0.15, ease: 'easeOut' }}
            >
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: catIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="skill-info">
                      {skill.icon && <skill.icon className="skill-icon" />}
                      <span className="skill-name">{skill.name}</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: catIndex * 0.1 + skillIndex * 0.05 + 0.3 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
