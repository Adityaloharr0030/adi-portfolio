import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiAward, FiExternalLink, FiImage, FiX, FiCheckCircle } from 'react-icons/fi';
import MagneticButton from '../../UI/MagneticButton/MagneticButton';
import { certifications, certCategories } from '../../../data/portfolioData';
import './Certifications.css';

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = certCategories;

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
                  className="cert-card-v2 glass-panel"
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
                    <MagneticButton>
                      <motion.a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-action-link"
                        whileHover={{ x: 3, scale: 1.05 }}
                      >
                        Credential <FiExternalLink />
                      </motion.a>
                    </MagneticButton>
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
