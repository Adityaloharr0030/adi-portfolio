import './AnimatedBackground.css';

const AnimatedBackground = () => {
  return (
    <div className="animated-bg-wrapper" aria-hidden="true">
      <div className="bg-shape shape1"></div>
      <div className="bg-shape shape2"></div>
      <div className="bg-shape shape3"></div>
      <div className="bg-noise"></div>
    </div>
  );
};

export default AnimatedBackground;
