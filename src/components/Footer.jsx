import { motion } from 'framer-motion';
import { FiHeart, FiCoffee, FiChevronUp } from 'react-icons/fi';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-glow-line" />
      
      <div className="container">
        <div className="footer-content-v2">
          <div className="footer-left">
            <motion.div
              className="footer-logo-container"
              whileHover={{ scale: 1.05 }}
            >
              <Logo size={28} className="footer-logo-svg" animate={true} />
              <span className="logo-text">ADITYA</span>
            </motion.div>
            <p className="footer-tagline">Architecting the future with code.</p>
          </div>

          <div className="footer-right">
            <div className="footer-links-v2">
              <a href="https://github.com/Adityaloharr0030" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/aditya-lohar-3037b32b9" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="mailto:adityalohar00030@gmail.com">Contact</a>
            </div>
            
            <p className="copyright-v2">
              © {currentYear} • Engineered with AI by Aditya Lohar
            </p>
          </div>
        </div>

        <motion.button
          className="back-to-top"
          onClick={scrollToTop}
          whileHover={{ y: -5, backgroundColor: 'rgba(129, 140, 248, 0.2)' }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <FiChevronUp size={24} />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
