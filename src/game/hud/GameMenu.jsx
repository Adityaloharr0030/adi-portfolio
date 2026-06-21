/**
 * GameMenu.jsx
 * ────────────
 * Pause menu with resume, quality settings, and navigation.
 */
import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolioData';

const GameMenu = ({ onResume, onClassic, onHome, quality, onQualityChange }) => {
  return (
    <motion.div
      className="game-menu-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="game-menu"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <h2 className="game-menu-title">PAUSED</h2>

        <div className="game-menu-buttons">
          <button className="game-menu-btn primary" onClick={onResume}>
            ▶ Resume
          </button>
          <button className="game-menu-btn" onClick={onClassic}>
            📄 Classic Portfolio
          </button>
          <a
            href={personalInfo.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="game-menu-btn"
          >
            📥 Download Resume
          </a>
          <button className="game-menu-btn" onClick={onHome}>
            🏠 Home
          </button>
        </div>

        <div className="game-menu-quality">
          <span className="quality-label">Quality</span>
          <div className="quality-buttons">
            {['low', 'medium', 'high'].map((q) => (
              <button
                key={q}
                className={`quality-btn ${quality === q ? 'active' : ''}`}
                onClick={() => onQualityChange(q)}
              >
                {q.charAt(0).toUpperCase() + q.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="game-menu-hint">
          Press <kbd>ESC</kbd> to resume
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameMenu;
