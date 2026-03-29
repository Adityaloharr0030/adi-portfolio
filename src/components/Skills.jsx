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
  SiKubernetes, SiJenkins, SiIntellijidea
} from 'react-icons/si';
import './Skills.css';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: '📝',
      skills: [
        { name: 'JavaScript (ES6+)', icon: FaJs, level: 90 },
        { name: 'Python', icon: FaPython, level: 80 },
        { name: 'Java', icon: FaJava, level: 75 },
      ],
    },
    {
      title: 'Frontend Development',
      icon: '🔧',
      skills: [
        { name: 'React', icon: FaJs, level: 88 },
        { name: 'Next.js', icon: FaJs, level: 85 },
        { name: 'HTML5/CSS3', icon: FaJs, level: 90 },
      ],
    },
    {
      title: 'Backend & Databases',
      icon: '💾',
      skills: [
        { name: 'Node.js/Express', icon: FaNodeJs, level: 82 },
        { name: 'MongoDB', icon: SiMongodb, level: 85 },
        { name: 'MySQL', icon: SiMysql, level: 80 },
        { name: 'RESTful APIs', icon: FaDatabase, level: 88 },
      ],
    },
    {
      title: 'Tools & Platforms',
      icon: '🚀',
      skills: [
        { name: 'Git/GitHub', icon: FaGitAlt, level: 90 },
        { name: 'Docker', icon: FaDocker, level: 75 },
        { name: 'Postman', icon: SiIntellijidea, level: 85 },
        { name: 'VS Code', icon: SiIntellijidea, level: 92 },
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
