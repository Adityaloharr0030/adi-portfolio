/**
 * ControlsHint.jsx
 * ────────────────
 * Keyboard shortcut overlay with WASD diagram.
 */
import { motion } from 'framer-motion';

const ControlsHint = () => {
  return (
    <motion.div
      className="controls-hint"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="controls-title">CONTROLS</div>
      <div className="controls-grid">
        <div className="controls-row">
          <div className="controls-spacer" />
          <kbd className="control-key">W</kbd>
          <div className="controls-spacer" />
        </div>
        <div className="controls-row">
          <kbd className="control-key">A</kbd>
          <kbd className="control-key">S</kbd>
          <kbd className="control-key">D</kbd>
        </div>
      </div>
      <div className="controls-labels">
        <div className="controls-label-row">
          <span><kbd>W</kbd> / <kbd>↑</kbd> Accelerate</span>
        </div>
        <div className="controls-label-row">
          <span><kbd>S</kbd> / <kbd>↓</kbd> Brake</span>
        </div>
        <div className="controls-label-row">
          <span><kbd>A</kbd><kbd>D</kbd> / <kbd>←</kbd><kbd>→</kbd> Steer</span>
        </div>
        <div className="controls-label-row">
          <span><kbd>SHIFT</kbd> Boost</span>
        </div>
        <div className="controls-label-row">
          <span><kbd>ESC</kbd> Menu</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ControlsHint;
