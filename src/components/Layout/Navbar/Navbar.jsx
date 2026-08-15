import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi';
import Logo from '../../UI/Logo/Logo';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <div className="container">
        <motion.a
          href="#"
          className="logo-container"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Aditya Lohar - Home"
        >
          <Logo size={28} className="nav-logo-svg" animate={true} />
          <span className="logo-text">ADITYA</span>
        </motion.a>

        <div className={`nav-links-wrapper ${isOpen ? 'active' : ''}`}>
          <div className="nav-links">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
          
          <div className="nav-actions">
            <a href="https://github.com/Adityaloharr0030" target="_blank" rel="noreferrer" className="social-icon">
              <FiGithub />
            </a>
            <a href="https://www.linkedin.com/in/aditya-lohar-3037b32b9/" target="_blank" rel="noreferrer" className="social-icon">
              <FiLinkedin />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-resume">
              <FiDownload /> Resume
            </a>
          </div>
        </div>

        <motion.button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
