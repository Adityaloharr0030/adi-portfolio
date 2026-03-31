import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Preloader.css';

const logs = [
  "INITIALIZING KERNEL...",
  "LOADING CLOUD MODULES...",
  "SYNCING GITHUB TELEMETRY...",
  "ESTABLISHING SECURE PROTOCOLS...",
  "MOUNTING REACT INTERFACE...",
  "SYSTEM STATUS: OPTIMAL",
];

const Preloader = () => {
  const [currentLog, setCurrentLog] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const logInterval = setInterval(() => {
      setCurrentLog((prev) => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 400);

    const percentInterval = setInterval(() => {
      setPercent((prev) => (prev < 100 ? prev + 1 : 100));
    }, 25);

    return () => {
      clearInterval(logInterval);
      clearInterval(percentInterval);
    };
  }, []);

  return (
    <motion.div 
      className="preloader"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="preloader-content">
        <div className="preloader-matrix"></div>
        <div className="preloader-scanning"></div>
        
        <div className="preloader-header">
          <motion.div 
            className="system-logo"
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            &lt;Adi /&gt;
          </motion.div>
          <div className="system-title">SYSTEM INITIALIZATION</div>
        </div>

        <div className="preloader-body">
          <div className="log-container">
            {logs.slice(0, currentLog + 1).map((log, i) => (
              <motion.div 
                key={i} 
                className="log-line"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <span className="log-prefix">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span> {log}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="preloader-footer">
          <div className="progress-info">
            <span>CORE LOAD: {percent}%</span>
            <span>MEM: 1024MB / 1024MB</span>
          </div>
          <div className="progress-bar-container">
            <motion.div 
              className="progress-bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
