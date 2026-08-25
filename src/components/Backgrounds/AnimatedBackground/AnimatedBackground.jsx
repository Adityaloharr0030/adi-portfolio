import { useEffect, useRef, useState } from 'react';
import './AnimatedBackground.css';

/* ═══════════════════════════════════════════════════════════
   🎥 SMART VIDEO BACKGROUND
   - Desktop: Loads video after page is ready (lazy)
   - Mobile: Shows static sakura image (saves bandwidth)
   ═══════════════════════════════════════════════════════════ */

/* ─── Detect mobile device ─── */
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent);
};

/* ─── Video Background ─── */
const VideoBackground = () => {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const mobile = isMobile();

  useEffect(() => {
    // On mobile, skip video entirely
    if (mobile) return;

    // On desktop, wait for page to be interactive before loading video
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 1000); // 1 second delay to let the page render first

    return () => clearTimeout(timer);
  }, [mobile]);

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    // Play video when loaded
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="animated-bg-wrapper" aria-hidden="true">
      {/* Static background image (always present, instant load) */}
      <div className={`hero-static-bg ${videoLoaded ? 'fade-out' : ''}`} />

      {/* Video only on desktop, loaded lazily */}
      {!mobile && showVideo && (
        <video
          ref={videoRef}
          className={`hero-video ${videoLoaded ? 'visible' : ''}`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlayThrough={handleVideoLoaded}
          onLoadedData={handleVideoLoaded}
          src="/videos/background.mp4"
        />
      )}

      <div className="hero-overlay-text" />
      <div className="hero-overlay-bottom" />
    </div>
  );
};

/* ─────────────────────────────────────────────────────── */
const AnimatedBackground = () => (
  <>
    <VideoBackground />
  </>
);
export default AnimatedBackground;
