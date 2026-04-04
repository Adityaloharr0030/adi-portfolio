import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiAward, FiExternalLink, FiImage, FiX, FiCheckCircle } from 'react-icons/fi';
import './Certifications.css';

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'AI & Claude', 'Cyber Security', 'Salesforce & CRM', 'DevOps & Systems'];

  const certifications = [
    {
      title: 'Free Salesforce Training and Certification',
      issuer: 'IntelliPaat',
      date: 'April 4, 2026',
      category: 'Salesforce & CRM',
      link: 'https://intellipaat.com/academy/certificate-link/?Yz0yMjg3JnU9MzM1NjM5JmV4dD0x',
      color: '#00a1e0',
    },
    {
      title: 'Introduction to Cyber Security',
      issuer: 'Simplilearn SkillUp',
      date: 'March 13, 2026',
      category: 'Cyber Security',
      link: 'https://www.linkedin.com/posts/aditya-lohar-3037b32b9_excited-to-share-that-ive-successfully-completed-share-7438245657305325568-cf5-',
      color: '#818cf8',
    },
    {
      title: 'Claude Code in Action',
      issuer: 'Anthropic',
      date: 'March 23, 2026',
      category: 'AI & Claude',
      link: 'https://verify.skilljar.com/c/dg5r8pnsfng7',
      color: '#c084fc',
    },
    {
      title: 'Claude 101',
      issuer: 'Anthropic',
      date: 'March 2026',
      category: 'AI & Claude',
      link: 'http://verify.skilljar.com/c/3gc8kxck8h74',
      color: '#c084fc',
    },
    {
      title: 'AI Fluency: Foundations',
      issuer: 'Anthropic',
      date: 'March 2026',
      category: 'AI & Claude',
      link: 'http://verify.skilljar.com/c/5n9y9eoh5atx',
      color: '#c084fc',
    },
    {
      title: 'DevOps Course Certification',
      issuer: 'IntelliPaat',
      date: 'March 22, 2026',
      category: 'DevOps & Systems',
      link: 'https://intellipaat.com/academy/certificate-link/?Yz0xNjU1JnU9MzM1NjM5JmV4dD0x',
      color: '#38bdf8',
    },
    {
      title: 'Artificial Intelligence (AI)',
      issuer: 'IntelliPaat',
      date: 'March 23, 2026',
      category: 'AI & Claude',
      link: 'https://intellipaat.com/academy/certificate-link/?Yz0xODI3JnU9MzM1NjM5JmV4dD0x',
      color: '#38bdf8',
    },
    {
      title: 'Quora System Design',
      issuer: 'Scaler Topics',
      date: 'March 24, 2026',
      category: 'DevOps & Systems',
      link: 'https://verify.skilljar.com',
      color: '#f472b6',
    },
  ];

  const filteredCerts = activeFilter === 'All' 
    ? certifications 
    : certifications.filter(c => c.category === activeFilter);

  return (
    <>
      <section id="certifications" className="certifications" ref={ref}>
        <div className="certs-bg-glow"></div>
        <div className="container">
          <motion.div
            className="section-header center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag glow">Verified Achievements</span>
            <h2 className="section-title">
              Professional <span className="gradient-text shine">Credentials</span>
            </h2>
            
            <div className="certs-filter-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`cert-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                  {activeFilter === cat && <motion.div layoutId="active-cert-pill" className="active-pill" />}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="certifications-grid-v2">
            <AnimatePresence mode="popLayout">
              {filteredCerts.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="cert-card-v2"
                  style={{ '--accent-color': cert.color }}
                  whileHover={{ y: -5 }}
                >
                  <div className="cert-status-badge">
                    <FiCheckCircle /> Verified
                  </div>
                  
                  <div className="cert-main">
                    <div className="cert-icon-box">
                      <FiAward />
                    </div>
                    <div className="cert-info">
                      <h3 className="cert-title">{cert.title}</h3>
                      <p className="cert-issuer">{cert.issuer}</p>
                    </div>
                  </div>

                  <div className="cert-footer-v2">
                    <span className="cert-date">{cert.date}</span>
                    <motion.a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-action-link"
                      whileHover={{ x: 3 }}
                    >
                      Credential <FiExternalLink />
                    </motion.a>
                  </div>

                  {/* Aesthetic corner detail */}
                  <div className="cert-corner"></div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="cert-modal-overlay-v2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="cert-modal-content-v2"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="cert-modal-close-v2" onClick={() => setSelectedImage(null)}><FiX /></button>
              <img src={selectedImage} alt="Certificate Viewer" className="cert-modal-image-v2" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Certifications;
