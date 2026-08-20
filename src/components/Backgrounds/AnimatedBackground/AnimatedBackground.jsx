import { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

/* ═══════════════════════════════════════════════════════════
   🎥 LOCAL VIDEO — sakura-river.mp4 (no iframe lag!)
   🌸 Canvas Sakura Physics Engine (40 petals, 60 fps)
   ═══════════════════════════════════════════════════════════ */

/* ─── Video Background ─── */
const VideoBackground = () => (
  <div className="animated-bg-wrapper" aria-hidden="true">
    <video
      className="hero-video"
      autoPlay
      loop
      muted
      playsInline
      src="/videos/background.mp4"
    />
    <div className="hero-overlay-text" />
    <div className="hero-overlay-bottom" />
  </div>
);

/* ─────────────────────────────────────────────────────── */
const AnimatedBackground = () => (
  <>
    <VideoBackground />
  </>
);
export default AnimatedBackground;
