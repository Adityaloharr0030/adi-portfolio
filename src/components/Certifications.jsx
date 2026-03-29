import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiAward, FiExternalLink, FiImage, FiX } from 'react-icons/fi';
import './Certifications.css';

const Certifications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedImage, setSelectedImage] = useState(null);

  const certifications = [
    {
      title: 'Introduction to Cyber Security',
      issuer: 'Simplilearn SkillUp',
      date: 'March 13, 2026',
      link: 'https://www.linkedin.com/posts/aditya-lohar-3037b32b9_excited-to-share-that-ive-successfully-completed-share-7438245657305325568-cf5-?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEx4dPMBHfL__TBUVMsouxb68u_tt5cuy6E',
    },
    {
      title: 'Claude Code in Action',
      issuer: 'Anthropic',
      date: 'March 23, 2026',
      link: 'https://verify.skilljar.com/c/dg5r8pnsfng7',
    },
    {
      title: 'Claude 101',
      issuer: 'Anthropic',
      date: 'March 2026',
      link: 'http://verify.skilljar.com/c/3gc8kxck8h74',
    },
    {
      title: 'Introduction to Claude Cowork',
      issuer: 'Anthropic',
      date: 'March 2026',
      link: 'http://verify.skilljar.com/c/6eswzhtmfk7y', 
    },
    {
      title: 'AI Fluency: Framework & Foundations',
      issuer: 'Anthropic',
      date: 'March 2026',
      link: 'http://verify.skilljar.com/c/5n9y9eoh5atx',
    },
    {
      title: 'AI-Buildathon Participant (TECH-CARVAAN 2026)',
      issuer: 'Government College of Engineering, Jalgaon',
      date: 'April 2026',
      link: 'https://www.linkedin.com/posts/aditya-lohar-3037b32b9_techcarvaan2026-aibuildathon-nationallevelfest-ugcPost-7443630684948234240-QEXq?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEx4dPMBHfL__TBUVMsouxb68u_tt5cuy6E',
    },
    {
      title: 'Free DevOps Course Certification',
      issuer: 'IntelliPaat',
      date: 'March 22, 2026',
      link: 'https://intellipaat.com/academy/certificate-link/?Yz0xNjU1JnU9MzM1NjM5JmV4dD0x',
    },
    {
      title: 'Free Online Artificial Intelligence (AI) Course',
      issuer: 'IntelliPaat',
      date: 'March 23, 2026',
      link: 'https://intellipaat.com/academy/certificate-link/?Yz0xODI3JnU9MzM1NjM5JmV4dD0x',
    },
    {
      title: 'Quora System Design Course',
      issuer: 'Scaler Topics',
      date: 'March 24, 2026',
      link: 'https://scaler-topics-storage-prod.s3.us-west-2.amazonaws.com/public/topics/images/certificates/180030/thumbnail.png?response-content-disposition=inline%3B%20filename%3D%22certificates-180030-thumbnail.png%22%3B%20filename%2A%3DUTF-8%27%27certificates-180030-thumbnail.png&response-content-type=image%2Fjpeg&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIDNNIRGHAQUQRWYA%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T110158Z&X-Amz-Expires=1800&X-Amz-SignedHeaders=host&X-Amz-Signature=9c58cc13ee2a25c7f8e7abc64f596e8b67e39a5165d34809e9e2b731184a062d',
    },
  ];

  return (
    <>
      <section id="certifications" className="certifications" ref={ref}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Achievements</span>
            <h2 className="section-title">
              My <span className="gradient-text">Certifications</span>
            </h2>
          </motion.div>

          <div className="certifications-grid">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                className="cert-card"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="cert-icon">
                  <FiAward />
                </div>
                <div className="cert-content">
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <div className="cert-footer">
                    <span className="cert-date">{cert.date}</span>
                    
                    {cert.link !== '#' ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-link"
                      >
                        View Credential <FiExternalLink />
                      </a>
                    ) : (
                      <button
                        onClick={() => setSelectedImage(cert.image)}
                        className="cert-link"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none' }}
                      >
                        View Certificate <FiImage />
                      </button>
                    )}
                    
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="cert-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="cert-modal-content"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="cert-modal-close" 
                onClick={() => setSelectedImage(null)}
              >
                <FiX />
              </button>
              <img src={selectedImage} alt="Certificate Viewer" className="cert-modal-image" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Certifications;
