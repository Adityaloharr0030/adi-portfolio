import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiMail, FiUser, FiMessageSquare, FiSend, FiGithub, FiLinkedin } from 'react-icons/fi';
import './Contact.css';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSending(false);
    setSubmitted(true);
    setFormState({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };


  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Get In Touch</span>
          <h2 className="section-title">
            Let&apos;s work <span className="gradient-text">together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you!
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="info-card">
              <FiMail className="info-icon" />
              <div>
                <h4>Email</h4>
                <a href="mailto:adityalohar00030@gmail.com">adityalohar00030@gmail.com</a>
              </div>
            </div>

            <div className="social-links">
            <motion.a
              href="https://github.com/Adityaloharr0030"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiGithub />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/aditya-lohar-3037b32b9"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiLinkedin />
            </motion.a>
          </div>

            <div className="availability">
              <span className="status-dot"></span>
              <span>Open to new opportunities</span>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="name">
                <FiUser /> Name
              </label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <FiMail /> Email
              </label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                <FiMessageSquare /> Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <motion.button
              type="submit"
              className={`submit-btn ${submitted ? 'sent' : ''}`}
              disabled={submitted || isSending}
              whileHover={{ scale: (submitted || isSending) ? 1 : 1.02 }}
              whileTap={{ scale: (submitted || isSending) ? 1 : 0.98 }}
            >
              {submitted ? (
                <>
                  <span>✓</span> Message Sent!
                </>
              ) : isSending ? (
                <>
                  <span className="loader"></span> Sending...
                </>
              ) : (
                <>
                  <FiSend /> Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
