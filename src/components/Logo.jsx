import { motion } from 'framer-motion';

const Logo = ({ size = 32, className = "", animate = true }) => {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`logo-svg ${className}`}
      whileHover={animate ? { scale: 1.1, rotate: [0, -5, 5, 0] } : {}}
      whileTap={animate ? { scale: 0.9 } : {}}
    >
      <defs>
        <linearGradient id="logo-gradient" x1="256" x2="256" y1="0" y2="512" gradientUnits="userSpaceOnUse">
          <stop stopColor="#863bff"/>
          <stop offset="1" stopColor="#ae7fff"/>
        </linearGradient>
        <filter id="logo-glow" width="150%" height="150%" x="-25%" y="-25%" filterUnits="userSpaceOnUse">
          <feGaussianBlur stdDeviation="10" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Modern Geometric 'A' symbol representing Aditya */}
      <motion.path 
        fill="url(#logo-gradient)" 
        d="M256 60L420 440H340L256 240L172 440H92L256 60Z" 
        filter="url(#logo-glow)"
        initial={animate ? { pathLength: 0, opacity: 0 } : {}}
        animate={animate ? { pathLength: 1, opacity: 1 } : {}}
        transition={animate ? { duration: 1.5, ease: "easeInOut" } : {}}
      />
      <motion.path 
        fill="#fff" 
        fillOpacity="0.2" 
        d="M256 240L300 340H212L256 240Z" 
        initial={animate ? { opacity: 0 } : {}}
        animate={animate ? { opacity: 1 } : {}}
        transition={animate ? { delay: 1, duration: 1 } : {}}
      />
    </motion.svg>
  );
};

export default Logo;
