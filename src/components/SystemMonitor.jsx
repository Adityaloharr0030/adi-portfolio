import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiActivity, FiCpu, FiHardDrive, FiZap, FiX, FiTerminal, FiGithub, FiLayers } from 'react-icons/fi';
import Logo from './Logo';
import './SystemMonitor.css';

const SystemMonitor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState({
    cpu: 0,
    memory: 0,
    uptime: '00:00:00',
    bandwidth: 0
  });

  const languageStats = [
    { label: 'Java', value: 45, color: '#f89820' },
    { label: 'JavaScript', value: 30, color: '#f7df1e' },
    { label: 'Next.js', icon: null, value: 15, color: '#ffffff' },
    { label: 'Spring', value: 10, color: '#6db33f' },
  ];

  const formatUptime = (ms) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    return `${h.toString().padStart(2, '0')}:${(m % 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 12) + 4,
        memory: Math.floor(Math.random() * 8) + 38,
        uptime: formatUptime(Date.now() - startTime),
        bandwidth: (Math.random() * 2.5 + 0.5).toFixed(1)
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <motion.button
        className={`system-monitor-toggle-wrap ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="toggle-glass-glow"></div>
        <div className="btn-inner">
          {isOpen ? <FiX size={28} /> : <Logo size={32} animate={!isOpen} />}
        </div>
        <motion.div 
          className="btn-pulse-ring" 
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="system-monitor-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="system-monitor-window"
              initial={{ scale: 0.8, y: 100, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, y: 100, opacity: 0, rotateX: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Window Decoration */}
              <div className="window-chrome">
                <div className="chrome-dots">
                  <span></span><span></span><span></span>
                </div>
                <div className="window-title">SYSTEM_CORE // ADITYA-PORTFOLIO-v2</div>
                <button onClick={() => setIsOpen(false)} className="window-close"><FiX /></button>
              </div>

              <div className="window-body">
                {/* Main Stats Header */}
                <div className="stats-dashboard">
                  <div className="stat-main-box">
                    <FiActivity className="icon-pulse" />
                    <div className="stat-col">
                      <span className="sc-label">STATUS</span>
                      <span className="sc-val green">OPTIMAL</span>
                    </div>
                  </div>
                  <div className="stat-main-box">
                    <FiGithub className="icon-spin" />
                    <div className="stat-col">
                      <span className="sc-label">GITHUB_SYNC</span>
                      <span className="sc-val blue">ADITYALOHAR-0030</span>
                    </div>
                  </div>
                </div>

                <div className="monitor-grid">
                  {/* Performance Panel */}
                  <div className="panel perf-panel">
                    <div className="panel-header"><FiCpu /> RESOURCE_MAP</div>
                    <div className="metric-row">
                      <div className="mr-info"><span>CPU_LOAD</span><span>{stats.cpu}%</span></div>
                      <div className="mr-bar"><motion.div className="mr-fill" animate={{ width: `${stats.cpu}%` }} /></div>
                    </div>
                    <div className="metric-row">
                      <div className="mr-info"><span>MEM_ALLOC</span><span>{stats.memory}%</span></div>
                      <div className="mr-bar"><motion.div className="mr-fill purple" animate={{ width: `${stats.memory}%` }} /></div>
                    </div>
                    <div className="metric-row">
                      <div className="mr-info"><span>BANDWIDTH</span><span>{stats.bandwidth} MB/s</span></div>
                      <div className="mr-bar"><motion.div className="mr-fill blue" animate={{ width: `${(stats.bandwidth / 5) * 100}%` }} /></div>
                    </div>
                  </div>

                  {/* Language Telemetry Panel */}
                  <div className="panel lang-panel">
                    <div className="panel-header"><FiLayers /> LANGUAGE_STACK</div>
                    <div className="lang-chart">
                      {languageStats.map((l, i) => (
                        <div key={i} className="lang-bar-item">
                           <div className="lb-label">{l.label}</div>
                           <div className="lb-track">
                             <motion.div 
                               className="lb-fill" 
                               style={{ backgroundColor: l.color }}
                               initial={{ height: 0 }}
                               animate={{ height: `${l.value}%` }}
                               transition={{ delay: 0.5 + i * 0.1 }}
                             />
                           </div>
                           <div className="lb-val">{l.value}%</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Terminal Log */}
                <div className="terminal-log">
                  <div className="term-header">COMMAND_BUFFER</div>
                  <div className="log-lines">
                    <p className="log-t">[0.00ms] kernel init: Aditya.Portfolio.v2</p>
                    <p className="log-t">[0.45s] mounting: /usr/bin/creative_engine</p>
                    <p className="log-t blue">[1.02s] fetch: github.api/adityaloharr0030</p>
                    <p className="log-t green">[1.25s] response: 200 OK (7 active repos)</p>
                    <p className="log-t purple">[2.10s] load: glassmorphic_ui_layer</p>
                    <p className="log-t">[3.05s] status: background_particle_physics initialized</p>
                    <motion.span 
                      className="cursor-blink"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >█</motion.span>
                  </div>
                </div>

                {/* Footer Telemetry */}
                <div className="window-footer">
                  <div className="footer-item"><FiZap /> UPTIME: {stats.uptime}</div>
                  <div className="footer-item">ENV: PRODUCTION</div>
                  <div className="footer-item">CORE: v2.4.0</div>
                </div>
              </div>

              {/* Scanline Overlay */}
              <div className="window-scanlines"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SystemMonitor;
