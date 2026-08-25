import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FiGithub, FiTrendingUp, FiActivity, FiCode, FiTerminal, FiStar, FiGitBranch, FiFolder } from 'react-icons/fi';
import './GitHubStats.css';

const USERNAME = 'Adityaloharr0030';

/* ── Fetch real GitHub data from public API ── */
const useGitHubData = (username) => {
  const [data, setData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)
        ]);
        const userData = await userRes.json();
        const reposData = await reposRes.json();
        setData(userData);
        setRepos(Array.isArray(reposData) ? reposData : []);
      } catch (err) {
        console.error('GitHub API error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [username]);

  return { data, repos, loading };
};

/* ── Language colors ── */
const langColors = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  Dart: '#00B4AB', HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219',
  'C++': '#f34b7d', C: '#555555', Shell: '#89e051', Kotlin: '#A97BFF',
  Swift: '#F05138', Go: '#00ADD8', Rust: '#dea584', Ruby: '#701516',
};

/* ── Stat Card Component ── */
const StatItem = ({ icon, label, value, color = '#c084fc' }) => (
  <div className="gh-stat-item">
    <div className="gh-stat-icon" style={{ color }}>{icon}</div>
    <div className="gh-stat-info">
      <span className="gh-stat-value">{value}</span>
      <span className="gh-stat-label">{label}</span>
    </div>
  </div>
);

/* ── Language Bar ── */
const LanguageBar = ({ languages }) => {
  const total = Object.values(languages).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  const sorted = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  return (
    <div className="gh-lang-section">
      <div className="gh-lang-bar">
        {sorted.map(([lang, count]) => (
          <div
            key={lang}
            className="gh-lang-segment"
            style={{
              width: `${(count / total * 100).toFixed(1)}%`,
              backgroundColor: langColors[lang] || '#8b5cf6'
            }}
            title={`${lang}: ${(count / total * 100).toFixed(1)}%`}
          />
        ))}
      </div>
      <div className="gh-lang-legend">
        {sorted.map(([lang, count]) => (
          <div key={lang} className="gh-lang-item">
            <span className="gh-lang-dot" style={{ backgroundColor: langColors[lang] || '#8b5cf6' }} />
            <span className="gh-lang-name">{lang}</span>
            <span className="gh-lang-pct">{(count / total * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Main GitHubStats Component ── */
const GitHubStats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data, repos, loading } = useGitHubData(USERNAME);

  // Calculate stats from real data
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);
  const publicRepos = data?.public_repos || repos.length;

  // Calculate languages from repos
  const languages = {};
  repos.forEach(repo => {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  });

  // Get recent activity (repos updated in last 30 days)
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const recentActivity = repos.filter(r => new Date(r.pushed_at) > thirtyDaysAgo).length;

  return (
    <section id="github" className="github-stats" ref={ref}>
      <div className="github-glow-aura"></div>
      <div className="container">
        <motion.div
          className="section-header center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="system-status-indicator">
            <span className={`dot pulsing ${loading ? 'yellow' : 'blue'}`}></span>
            <span className="label">GH_DATA_SUBSYSTEM: {loading ? 'SYNCING' : 'ACTIVE'}</span>
            <span className="uptime">Latency: {loading ? '...' : '24ms'}</span>
          </div>
          
          <span className="section-tag glow">Source Intelligence</span>
          <h2 className="section-title">
            Open Source <span className="gradient-text shine">Telemetry</span>
          </h2>
          <p className="section-subtitle">
            Synchronized data streams direct from the developer core. Monitoring repository health and linguistic proficiency.
          </p>
        </motion.div>

        {loading ? (
          <div className="gh-loading">
            <div className="gh-loading-spinner" />
            <span>Fetching GitHub data...</span>
          </div>
        ) : (
          <div className="stats-grid-v2">
            {/* Card 1: Activity Metrics */}
            <motion.div
              className="cyber-stat-card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="card-glass-noise"></div>
              <div className="card-scanlines-v2"></div>
              
              <div className="stat-card-head">
                <div className="sc-icon-wrap"><FiActivity /></div>
                <h4 className="sc-title">Activity Metrics</h4>
                <div className="sc-decor">
                  <span className="sc-dot"></span>
                  <span className="sc-dot"></span>
                </div>
              </div>

              <div className="gh-stats-grid">
                <StatItem icon={<FiFolder />} label="Repositories" value={publicRepos} color="#818cf8" />
                <StatItem icon={<FiStar />} label="Total Stars" value={totalStars} color="#fbbf24" />
                <StatItem icon={<FiGitBranch />} label="Total Forks" value={totalForks} color="#4ade80" />
                <StatItem icon={<FiActivity />} label="Active (30d)" value={recentActivity} color="#f472b6" />
              </div>

              <div className="stat-card-footer">
                <span className="sc-meta">SYNC_CODE: OK</span>
                <span className="sc-meta">RT-01</span>
              </div>
            </motion.div>

            {/* Card 2: Language Hierarchy */}
            <motion.div
              className="cyber-stat-card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="card-glass-noise"></div>
              <div className="card-scanlines-v2"></div>
              
              <div className="stat-card-head">
                <div className="sc-icon-wrap"><FiCode /></div>
                <h4 className="sc-title">Language Hierarchy</h4>
                <div className="sc-decor">
                  <span className="sc-dot"></span>
                  <span className="sc-dot"></span>
                </div>
              </div>

              <div className="stat-card-body">
                <LanguageBar languages={languages} />
              </div>

              <div className="stat-card-footer">
                <span className="sc-meta">SYNC_CODE: OK</span>
                <span className="sc-meta">RT-02</span>
              </div>
            </motion.div>

            {/* Card 3: Top Repositories */}
            <motion.div
              className="cyber-stat-card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="card-glass-noise"></div>
              <div className="card-scanlines-v2"></div>
              
              <div className="stat-card-head">
                <div className="sc-icon-wrap"><FiTrendingUp /></div>
                <h4 className="sc-title">Top Repositories</h4>
                <div className="sc-decor">
                  <span className="sc-dot"></span>
                  <span className="sc-dot"></span>
                </div>
              </div>

              <div className="stat-card-body">
                <div className="gh-top-repos">
                  {repos
                    .sort((a, b) => (b.stargazers_count + b.forks_count) - (a.stargazers_count + a.forks_count))
                    .slice(0, 4)
                    .map(repo => (
                      <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="gh-repo-item">
                        <div className="gh-repo-name">
                          <FiFolder className="gh-repo-icon" />
                          <span>{repo.name}</span>
                        </div>
                        <div className="gh-repo-meta">
                          {repo.language && (
                            <span className="gh-repo-lang">
                              <span className="gh-lang-dot" style={{ backgroundColor: langColors[repo.language] || '#8b5cf6' }} />
                              {repo.language}
                            </span>
                          )}
                          <span className="gh-repo-stars"><FiStar /> {repo.stargazers_count}</span>
                        </div>
                      </a>
                    ))
                  }
                </div>
              </div>

              <div className="stat-card-footer">
                <span className="sc-meta">SYNC_CODE: OK</span>
                <span className="sc-meta">RT-03</span>
              </div>
            </motion.div>
          </div>
        )}

        <motion.div 
          className="github-action-area"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.a 
            href={`https://github.com/${USERNAME}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="full-profile-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGithub /> INITIALIZE FULL GITHUB PROFILE LINK <FiTerminal className="blink" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
