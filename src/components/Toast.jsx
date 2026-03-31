import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiAlertCircle } from 'react-icons/fi';
import './Toast.css';

const Toast = ({ message, type, onClose }) => {
  const icons = {
    success: <FiCheck />,
    error: <FiAlertCircle />,
    info: <FiAlertCircle />,
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className={`toast toast-${type}`}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <div className="toast-content">
            <span className="toast-icon">{icons[type]}</span>
            <span className="toast-message">{message}</span>
          </div>
          <motion.button
            className="toast-close"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiX />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
