import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiMail, FiUser, FiMessageSquare, FiSend, FiGithub, FiLinkedin, FiArrowRight } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import Toast from './Toast';
import ContactOrb from './ContactOrb';
import './Contact.css';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  const [isSending, setIsSending] = useState(false);

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 5000);
  };

  const closeToast = () => {
    setToast({ message: '', type: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const templateParams = {
        name: formState.name,
        email: formState.email,
        subject: 'New Portfolio Inquiry',
        message: formState.message,
        time: new Date().toLocaleString(),
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      showToast('Message sent successfully!', 'success');
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error('Failed to send email:', error);
      showToast('Connection failed. Please email directly.', 'error');
    } finally {
      setIsSending(false);
    }
  };

  const socialLinks = [
    { icon: <FiGithub />, label: 'GitHub', href: 'https://github.com/Adityaloharr0030', color: '#818cf8' },
    { icon: <FiLinkedin />, label: 'LinkedIn', href: 'https://linkedin.com/in/aditya-lohar-3037b32b9', color: '#0ea5e9' },
  ];

  return (
    <section id="contact" className="contact" ref={ref}>
      {/* Background elements */}
      <ContactOrb />
      <div className="contact-grid-pattern" />
      
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag glow">Neural Uplink</span>
          <h2 className="section-title">
            Establish <span className="gradient-text shine">Connection</span>
          </h2>
          <p className="section-subtitle">
            Ready to architect something remarkable? Send me a transmission or reach out via secure channels below.
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info-panel"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="info-card-primary">
              <div className="card-top">
                <FiMail className="card-icon pulse" />
                <span>Primary Interface</span>
              </div>
              <h4>Direct Email</h4>
              <a href="mailto:adityalohar00030@gmail.com" className="email-link">
                adityalohar00030@gmail.com
              </a>
            </div>

            <div className="social-cyber-grid">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cyber-card"
                  whileHover={{ y: -8, scale: 1.05 }}
                  style={{ '--hover-color': link.color }}
                >
                  <div className="cyber-card-content">
                    {link.icon}
                    <span>{link.label}</span>
                  </div>
                  <FiArrowRight className="cyber-arrow" />
                </motion.a>
              ))}
            </div>

            <div className="hologram-indicator">
              <span className="status-dot green"></span>
              <span>SYSTEM ONLINE: READY FOR TRANSFERS</span>
            </div>
          </motion.div>

          <motion.form
            className="contact-glass-form"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
          >
            <div className="form-row">
              <div className="form-group-cyber">
                <label><FiUser /> Name</label>
                <div className="input-wrapper">
                   <input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter full name"
                    required
                  />
                  <div className="input-highlight"></div>
                </div>
              </div>

              <div className="form-group-cyber">
                <label><FiMail /> Email</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="name@company.com"
                    required
                  />
                  <div className="input-highlight"></div>
                </div>
              </div>
            </div>

            <div className="form-group-cyber">
              <label><FiMessageSquare /> Message</label>
              <div className="input-wrapper">
                <textarea
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Transmission details..."
                  required
                />
                <div className="input-highlight"></div>
              </div>
            </div>

            <motion.button
              type="submit"
              className={`cyber-submit ${submitted ? 'success' : ''}`}
              disabled={submitted || isSending}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="submit-content">
                {submitted ? (
                  <>✓ Transmission Received</>
                ) : isSending ? (
                  <span className="sending-loader">Establishing link...</span>
                ) : (
                  <>
                    <span><FiSend /> Send Transmission</span>
                  </>
                )}
              </div>
              <div className="submit-shimmer"></div>
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
