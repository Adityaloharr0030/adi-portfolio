import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FiGithub, FiTrendingUp, FiActivity, FiCode, FiTerminal } from 'react-icons/fi';
import './GitHubStats.css';

const GitHubStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const username = 'Adityaloharr0030';

  const statsCards = [
    {
      title: 'Activity Metric',
      url: `https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=transparent&hide_border=true&title_color=6366f1&icon_color=a855f7&text_color=94a3b8&bg_color=00000000`,
      icon: <FiActivity />
    },
    {
      title: 'Language Hierarchy',
      url: `https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true&title_color=6366f1&icon_color=a855f7&text_color=94a3b8&bg_color=00000000`,
      icon: <FiCode />
    },
    {
      title: 'Contribution Streak',
      url: `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=transparent&hide_border=true&stroke=6366f1&ring=a855f7&fire=a855f7&currStreakNum=f1f5f9&sideNums=94a3b8&sideLabels=94a3b8&dates=64748b`,
      icon: <FiTrendingUp />
    }
  ];

  return (
    <section id="github" className="github-stats" ref={ref}>
      <div className="github-glow-aura"></div>
      <div className="container">
        <motion.div
          className="section-header center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="system-status-indicator">
            <span className="dot pulsing blue"></span>
            <span className="label">GH_DATA_SUBSYSTEM: ACTIVE</span>
            <span className="uptime">Latency: 24ms</span>
          </div>
          
          <span className="section-tag glow">Source Intelligence</span>
          <h2 className="section-title">
            Open Source <span className="gradient-text shine">Telemetry</span>
          </h2>
          <p className="section-subtitle">
            Synchronized data streams direct from the developer core. Monitoring repository health and linguistic proficiency.
          </p>
        </motion.div>

        <div className="stats-grid-v2">
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="cyber-stat-card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="card-glass-noise"></div>
              <div className="card-scanlines-v2"></div>
              
              <div className="stat-card-head">
                 <div className="sc-icon-wrap">{card.icon}</div>
                 <h4 className="sc-title">{card.title}</h4>
                 <div className="sc-decor">
                    <span className="sc-dot"></span>
                    <span className="sc-dot"></span>
                 </div>
              </div>

              <div className="stat-card-img">
                 <motion.img 
                   src={card.url} 
                   alt={card.title} 
                   initial={{ opacity: 0 }}
                   animate={isInView ? { opacity: 1 } : {}}
                   transition={{ delay: 0.5 + index * 0.1 }}
                 />
              </div>

              <div className="stat-card-footer">
                 <span className="sc-meta">SYNC_CODE: OK</span>
                 <span className="sc-meta">RT-0{index + 1}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="github-action-area"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.a 
            href={`https://github.com/${username}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="full-profile-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGithub /> INITIALIZE FULL GITHUB PROFILE LINK <FiTerminal className="blink" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
