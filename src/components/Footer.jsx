import { motion } from 'framer-motion';
import { FiHeart, FiCoffee } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          className="footer-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="footer-logo">
            <span className="logo-bracket">&lt;</span>
            Aditya
            <span className="logo-bracket">/&gt;</span>
          </div>

          <p className="footer-text">
            Built with <FiCoffee className="coffee" /> and <FiHeart className="heart" /> using React & Spring Boot
          </p>

          <div className="footer-links">
            <a href="https://github.com/Adityaloharr0030" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/in/aditya-lohar-3037b32b9" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:adityalohar00030@gmail.com">Email</a>
          </div>

          <p className="copyright">
            © {currentYear} Aditya. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
