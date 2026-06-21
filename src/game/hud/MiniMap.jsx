/**
 * MiniMap.jsx
 * ───────────
 * Small top-right minimap showing track layout and car position.
 */
import { useEffect, useRef } from 'react';
import { zonePositions } from '../../data/portfolioData';

const MAP_SIZE = 140;
const TRACK_RADIUS = 50;
const SCALE = MAP_SIZE / (TRACK_RADIUS * 2.8);

const MiniMap = ({ vehicleRef, visitedZones }) => {
  const canvasRef = useRef(null);
  const animRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = MAP_SIZE;
    canvas.height = MAP_SIZE;
    const center = MAP_SIZE / 2;

    const draw = () => {
      ctx.clearRect(0, 0, MAP_SIZE, MAP_SIZE);

      // Background
      ctx.fillStyle = 'rgba(5, 5, 16, 0.85)';
      ctx.fillRect(0, 0, MAP_SIZE, MAP_SIZE);

      // Track circle
      ctx.beginPath();
      ctx.arc(center, center, TRACK_RADIUS * SCALE, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.3)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Zone markers
      for (const [name, zone] of Object.entries(zonePositions)) {
        const x = center + Math.cos(zone.angle) * zone.radius * SCALE;
        const y = center + Math.sin(zone.angle) * zone.radius * SCALE;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = visitedZones.has(name) ? zone.color : 'rgba(255,255,255,0.15)';
        ctx.fill();

        // Zone label
        ctx.font = '7px Orbitron, monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.textAlign = 'center';
        ctx.fillText(zone.label.substring(0, 4).toUpperCase(), x, y + 12);
      }

      // Car position
      if (vehicleRef?.current) {
        const [vx, , vz] = vehicleRef.current.position;
        const mx = center + vx * SCALE;
        const my = center + vz * SCALE;
        const rot = vehicleRef.current.rotation || 0;

        // Car dot
        ctx.save();
        ctx.translate(mx, my);
        ctx.rotate(rot);

        // Car triangle indicator
        ctx.beginPath();
        ctx.moveTo(0, -4);
        ctx.lineTo(-3, 3);
        ctx.lineTo(3, 3);
        ctx.closePath();
        ctx.fillStyle = '#38bdf8';
        ctx.fill();

        // Glow
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();
      }

      // Border
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.2)';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, MAP_SIZE, MAP_SIZE);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [vehicleRef, visitedZones]);

  return (
    <div className="minimap">
      <canvas ref={canvasRef} />
      <div className="minimap-label">MAP</div>
    </div>
  );
};

export default MiniMap;
