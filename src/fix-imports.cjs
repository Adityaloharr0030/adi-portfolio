const fs = require('fs');
const path = require('path');

const componentMap = {
  'Navbar': 'Layout/Navbar',
  'Footer': 'Layout/Footer',
  'CustomCursor': 'UI/CustomCursor',
  'ThemeToggle': 'UI/ThemeToggle',
  'Toast': 'UI/Toast',
  'Logo': 'UI/Logo',
  'MagneticButton': 'UI/MagneticButton',
  'Preloader': 'UI/Preloader',
  'ErrorBoundary': 'UI/ErrorBoundary',
  'Hero': 'Sections/Hero',
  'ContactOrb': 'Sections/Hero',
  'About': 'Sections/About',
  'Skills': 'Sections/Skills',
  'Experience': 'Sections/Experience',
  'Projects': 'Sections/Projects',
  'ProjectCard': 'Sections/Projects',
  'SpotlightCard': 'Sections/Projects',
  'Certifications': 'Sections/Certifications',
  'Contact': 'Sections/Contact',
  'GitHubStats': 'Sections/GitHubStats',
  'CloudCodeExplorer': 'Sections/CloudCodeExplorer',
  'AnimatedBackground': 'Backgrounds/AnimatedBackground',
  'ParticleBackground': 'Backgrounds/ParticleBackground',
  'RunningCarBackground': 'Backgrounds/RunningCarBackground',
  'WebGLBackground': 'Backgrounds/WebGLBackground',
  'SystemMonitor': 'System/SystemMonitor'
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css')) {
      results.push(file);
    }
  });
  return results;
}

const allFiles = walk(__dirname);

allFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Fix imports pointing TO components
  // Pattern: import X from '../components/Y' or '../../components/Y' or './components/Y'
  // Also CSS imports like import '../components/Y.css'
  
  // Replace imports from './components/X' -> './components/Category/X/X'
  // Replace imports from '../components/X' -> '../components/Category/X/X'
  
  const regex = /(['"])([\.\/]+)components\/([A-Za-z0-9]+)(['"])/g;
  content = content.replace(regex, (match, p1, p2, p3, p4) => {
    if (componentMap[p3]) {
      return `${p1}${p2}components/${componentMap[p3]}/${p3}${p4}`;
    }
    return match;
  });

  const cssRegex = /(['"])([\.\/]+)components\/([A-Za-z0-9]+)\.css(['"])/g;
  content = content.replace(cssRegex, (match, p1, p2, p3, p4) => {
    if (componentMap[p3]) {
      return `${p1}${p2}components/${componentMap[p3]}/${p3}.css${p4}`;
    }
    return match;
  });

  // 2. Fix imports INSIDE moved components
  // If a file is in src/components/Category/X/ and it imports '../something' it needs to be '../../../something'
  // But wait, it used to be in src/components/, so '../' meant 'src/'. Now it needs to be '../../../'.
  // Let's identify if the file is inside one of our new component folders.
  const relPath = path.relative(__dirname, file).replace(/\\/g, '/');
  
  if (relPath.startsWith('components/')) {
    const parts = relPath.split('/');
    if (parts.length >= 4) { // e.g. components/Layout/Navbar/Navbar.jsx
      // The file was moved 2 levels deeper.
      // So any import starting with '../' needs to become '../../../'
      // But imports starting with './' (like './Navbar.css') are fine as they moved together.
      // Wait, what if it imported another component? e.g. import Logo from './Logo'
      // It was './Logo', now it needs to be '../../UI/Logo/Logo'.
      
      const insideRegex = /from (['"])(\.\/[A-Za-z0-9]+)(['"])/g;
      content = content.replace(insideRegex, (match, p1, p2, p3) => {
        const compName = p2.replace('./', '');
        if (componentMap[compName]) {
          return `from ${p1}../../${componentMap[compName]}/${compName}${p3}`;
        }
        return match;
      });

      // Update `../` to `../../../` for assets/data/game/pages imports
      // e.g. `import x from '../game/x'` -> `import x from '../../../game/x'`
      const upRegex = /(['"])\.\.\/([^'"]+)(['"])/g;
      content = content.replace(upRegex, (match, p1, p2, p3) => {
        // If it's importing from components, we already handled it above or it shouldn't have been `../components` (since it was in components).
        // If it was `../game`, it becomes `../../../game`
        return `${p1}../../../${p2}${p3}`;
      });
    }
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated imports in ${relPath}`);
  }
});
