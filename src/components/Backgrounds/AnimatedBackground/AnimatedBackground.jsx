import { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

/* ═══════════════════════════════════════════════════════════
   🎥 LOCAL VIDEO — sakura-river.mp4 (no iframe lag!)
   🌸 Canvas Sakura Physics Engine (40 petals, 60 fps)
   ═══════════════════════════════════════════════════════════ */

/* ─── Video Background ─── */
const VideoBackground = () => (
  <div className="animated-bg-wrapper" aria-hidden="true">
    <iframe
      className="hero-video-iframe"
      src="https://www.youtube-nocookie.com/embed/L_qz60sJU_I?autoplay=1&controls=0&showinfo=0&autohide=1&mute=1&loop=1&playlist=L_qz60sJU_I&vq=hd2160"
      title="4K Dark Sakura Background"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
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
