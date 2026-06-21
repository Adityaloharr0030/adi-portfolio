/**
 * Speedometer.jsx
 * ───────────────
 * Neon-styled speedometer showing current speed.
 * Polls the vehicle ref since this is an HTML overlay (outside R3F Canvas).
 */
import { useState, useEffect } from 'react';

const Speedometer = ({ vehicleRef }) => {
  const [speed, setSpeed] = useState(0);
  const [isBoosting, setIsBoosting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (vehicleRef?.current) {
        setSpeed(vehicleRef.current.speed || 0);
        setIsBoosting(vehicleRef.current.isBoosting || false);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [vehicleRef]);

  const displaySpeed = Math.round(speed * 160);
  const barWidth = Math.min((speed / 1.4) * 100, 100);

  return (
    <div className={`speedometer ${isBoosting ? 'boosting' : ''}`}>
      <div className="speedo-bar-track">
        <div
          className="speedo-bar-fill"
          style={{ width: `${barWidth}%` }}
        />
      </div>
      <div className="speedo-value">
        <span className="speedo-number">{displaySpeed}</span>
        <span className="speedo-unit">KM/H</span>
      </div>
      {isBoosting && <span className="speedo-boost">⚡ BOOST</span>}
    </div>
  );
};

export default Speedometer;
