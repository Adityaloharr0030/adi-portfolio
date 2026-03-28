import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiActivity, FiCpu, FiHardDrive, FiZap, FiX, FiTerminal } from 'react-icons/fi';
import './SystemMonitor.css';

const SystemMonitor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState({
    cpu: 0,
    memory: 0,
    uptime: '00:00:00',
    coffee: 95
  });

  const formatUptime = (ms) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    return `${h.toString().padStart(2, '0')}:${(m % 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      // Simulate live data
      setStats({
        cpu: Math.floor(Math.random() * 15) + 5,
        memory: Math.floor(Math.random() * 10) + 40,
        uptime: formatUptime(Date.now() - startTime),
        coffee: Math.max(0, 100 - Math.floor((Date.now() - startTime) / 60000))
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        className={`system-monitor-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ delay: 1 }}
      >
        {isOpen ? <FiX size={24} /> : <FiTerminal size={24} />}
      </motion.button>

      {/* Dashboard Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="system-monitor-overlay"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          >
            <motion.div
              className="system-monitor-card"
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <div className="card-header">
                <FiActivity className="header-icon pulse" />
                <h3>System Status <span className="status-live">LIVE</span></h3>
                <button onClick={() => setIsOpen(false)} className="close-btn"><FiX /></button>
              </div>

              <div className="metrics-grid">
                <div className="metric-item">
                  <div className="metric-label">
                    <FiCpu /> CPU Usage
                  </div>
                  <div className="metric-value">{stats.cpu}%</div>
                  <div className="metric-bar">
                    <motion.div 
                      className="metric-fill" 
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.cpu}%` }}
                    />
                  </div>
                </div>

                <div className="metric-item">
                  <div className="metric-label">
                    <FiHardDrive /> Memory
                  </div>
                  <div className="metric-value">{stats.memory}%</div>
                  <div className="metric-bar">
                    <motion.div 
                      className="metric-fill memory" 
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.memory}%` }}
                    />
                  </div>
                </div>

                <div className="metric-item">
                  <div className="metric-label">
                    <FiZap /> System Uptime
                  </div>
                  <div className="metric-value mono">{stats.uptime}</div>
                </div>

                <div className="metric-item">
                  <div className="metric-label">
                    ☕ Coffee Level
                  </div>
                  <div className="metric-value">{stats.coffee}%</div>
                  <div className="metric-bar">
                    <motion.div 
                      className="metric-fill coffee" 
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.coffee}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="system-logs">
                <div className="log-header">Kernel Logs</div>
                <div className="log-content">
                  <p>[0.000000] Initializing Aditya.Portfolio.Core...</p>
                  <p>[0.124512] Loading modules: React, Spring, Kafka</p>
                  <p>[0.457812] System check: Optimal</p>
                  <p>[0.895123] User connection detected...</p>
                  <motion.p
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                  >
                    _
                  </motion.p>
                </div>
              </div>

              <div className="card-footer">
                <span className="footer-tag">PROD-ENV-01</span>
                <span className="footer-tag">v2.4.0-stable</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SystemMonitor;
