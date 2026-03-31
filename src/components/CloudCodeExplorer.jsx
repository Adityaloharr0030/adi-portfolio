import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { FiServer, FiGlobe, FiCpu, FiChevronRight, FiTerminal, FiExternalLink } from 'react-icons/fi';
import './CloudCodeExplorer.css';

const CloudCodeExplorer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [selectedId, setSelectedId] = useState(null);

  const projects = [
    {
      id: 'inst-001',
      name: 'CrazyXani',
      type: 'Aggregator',
      region: 'us-east-1',
      status: 'active',
      tech: 'Next.js / Node / MongoDB',
      link: 'https://crazyxani.vercel.app/',
      logs: [
        '[info] Initializing Anime Router...',
        '[info] Anilist API connection: 200 OK',
        '[info] Watchlist sync enabled',
      ]
    },
    {
      id: 'inst-002',
      name: 'Inventory-API',
      type: 'REST Service',
      region: 'eu-central-1',
      status: 'active',
      tech: 'Node.js / Express / MySQL',
      link: 'https://github.com/Adityaloharr0030/Inventory-management-system',
      logs: [
        '[info] Booting JWT Auth Module...',
        '[info] Database Connection: MySQL STABLE',
        '[success] CRUD Endpoints: ACTIVE',
      ]
    },
    {
      id: 'inst-003',
      name: 'Java-Core-Engine',
      type: 'Console Logic',
      region: 'ap-south-1',
      status: 'active',
      tech: 'Java / OOP / Collections',
      link: 'https://github.com/Adityaloharr0030/Bank-management-system',
      logs: [
        '[info] JVM Environment: READY',
        '[info] Loading OOP Models...',
        '[success] Collections Logic: SECURE',
      ]
    }
  ];

  return (
    <section id="explorer" className="cloud-explorer" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Cloud Control Plane</span>
          <h2 className="section-title">
            Deployment <span className="gradient-text">Instance Explorer</span>
          </h2>
          <p className="section-subtitle">
            A real-time technical view of my projects as cloud-deployed microservices.
          </p>
        </motion.div>

        <div className="console-wrapper">
          <div className="console-header">
            <div className="console-controls">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <div className="console-title">
              <FiTerminal /> project-explorer --view list
            </div>
          </div>

          <div className="console-body">
            <div className="console-labels">
              <span className="col-id">INSTANCE ID</span>
              <span className="col-name">NAME</span>
              <span className="col-type">TYPE</span>
              <span className="col-region">REGION</span>
              <span className="col-status">STATUS</span>
            </div>

            <div className="console-rows">
              {projects.map((proj, index) => (
                <motion.div
                  key={proj.id}
                  className={`console-row ${selectedId === proj.id ? 'selected' : ''}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  onClick={() => setSelectedId(selectedId === proj.id ? null : proj.id)}
                >
                  <div className="row-main">
                    <span className="col-id mono">{proj.id}</span>
                    <span className="col-name fw-600">{proj.name}</span>
                    <span className="col-type text-muted">{proj.type}</span>
                    <span className="col-region">
                      <FiGlobe /> {proj.region}
                    </span>
                    <span className="col-status">
                      <span className={`status-pip ${proj.status}`}></span>
                      {proj.status.toUpperCase()}
                    </span>
                    <FiChevronRight className={`row-arrow ${selectedId === proj.id ? 'rotated' : ''}`} />
                  </div>

                  {selectedId === proj.id && (
                    <motion.div 
                      className="row-details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                    >
                      <div className="details-content">
                        <div className="tech-stack">
                          <FiCpu /> <strong>Stack:</strong> {proj.tech}
                        </div>
                        <div className="instance-logs">
                          {proj.logs.map((log, i) => (
                            <p key={i}>{log}</p>
                          ))}
                        </div>
                        <a href={proj.link} target="_blank" rel="noreferrer" className="instance-link">
                          <FiExternalLink /> Access Service
                        </a>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="console-footer">
            <span>TOTAL: {projects.length} INSTANCES</span>
            <span>API: STABLE</span>
            <span>LOCATION: JALGAON, IND</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudCodeExplorer;
