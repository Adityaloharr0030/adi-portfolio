import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiGithub, FiTrendingUp, FiActivity, FiCode } from 'react-icons/fi';
import './GitHubStats.css';

const GitHubStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const username = 'Adityaloharr0030';

  const statsCards = [
    {
      title: 'GitHub Stats',
      url: `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&title_color=6366f1&icon_color=a855f7&text_color=94a3b8&bg_color=00000000`,
      icon: <FiActivity />
    },
    {
      title: 'Top Languages',
      url: `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true&title_color=6366f1&icon_color=a855f7&text_color=94a3b8&bg_color=00000000`,
      icon: <FiCode />
    },
    {
      title: 'GitHub Streak',
      url: `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=transparent&hide_border=true&stroke=6366f1&ring=a855f7&fire=a855f7&currStreakNum=f1f5f9&sideNums=94a3b8&sideLabels=94a3b8&dates=64748b`,
      icon: <FiTrendingUp />
    }
  ];

  return (
    <section id="github" className="github-stats" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="system-status-bar">
            <span className="status-dot pulsing"></span>
            <span className="status-label">OPEN-SOURCE CORE MONITOR ACTIVE</span>
            <span className="status-uptime">Uptime: 99.9%</span>
          </div>
          <span className="section-tag">Open Source activity</span>
          <h2 className="section-title">
            GitHub <span className="gradient-text">Telemetry</span>
          </h2>
          <p className="section-subtitle">
            Real-time synchronization with GitHub API. Tracking global impact and system proficiency.
          </p>
        </motion.div>

        <div className="stats-grid">
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="stats-card-wrapper"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="stats-card-header">
                {card.icon}
                <span>{card.title}</span>
              </div>
              <div className="stats-card-body">
                <img 
                  src={card.url} 
                  alt={card.title} 
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="github-footer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <a 
            href={`https://github.com/${username}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="github-profile-link"
          >
            <FiGithub /> View Full Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
