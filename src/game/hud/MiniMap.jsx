/**
 * MiniMap.jsx
 * ───────────
 * Small top-right minimap showing straight-road layout and car position.
 * Rewritten for Z-axis highway (no circular track).
 */
import { useEffect, useRef } from 'react';
import { zonePositions } from '../../data/portfolioData';

const MAP_W = 50;
const MAP_H = 160;
const ROAD_Z_MAX = 320; // must match ScrollVehicleController's max Z
const PADDING = 12;

const MiniMap = ({ vehicleRef, visitedZones }) => {
  const canvasRef = useRef(null);
  const animRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = MAP_W;
    canvas.height = MAP_H;

    const zToY = (z) => PADDING + ((ROAD_Z_MAX - z) / ROAD_Z_MAX) * (MAP_H - PADDING * 2);
    const centerX = MAP_W / 2;

    const draw = () => {
      ctx.clearRect(0, 0, MAP_W, MAP_H);

      // Background
      ctx.fillStyle = 'rgba(5, 5, 16, 0.85)';
      ctx.fillRect(0, 0, MAP_W, MAP_H);

      // Road line (vertical center)
      ctx.beginPath();
      ctx.moveTo(centerX, PADDING);
      ctx.lineTo(centerX, MAP_H - PADDING);
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.25)';
      ctx.lineWidth = 6;
      ctx.stroke();

      // Dashed center line
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(centerX, PADDING);
      ctx.lineTo(centerX, MAP_H - PADDING);
      ctx.strokeStyle = 'rgba(129, 140, 248, 0.12)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      // Zone markers
      for (const [name, zone] of Object.entries(zonePositions)) {
        const y = zToY(zone.z);

        // Zone dot
        ctx.beginPath();
        ctx.arc(centerX, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = visitedZones.has(name) ? zone.color : 'rgba(255,255,255,0.15)';
        ctx.fill();

        // Zone label
        ctx.font = '7px Orbitron, monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.textAlign = 'right';
        ctx.fillText(zone.label.substring(0, 4).toUpperCase(), centerX - 8, y + 3);
      }

      // Car position
      if (vehicleRef?.current) {
        const [, , vz] = vehicleRef.current.position;
        const carY = zToY(vz);

        ctx.save();
        ctx.translate(centerX, carY);

        // Car triangle (pointing up = forward)
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
      ctx.strokeRect(0, 0, MAP_W, MAP_H);

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [vehicleRef, visitedZones]);

  return (
    <div className="minimap" style={{ width: MAP_W, height: MAP_H }}>
      <canvas ref={canvasRef} />
      <div className="minimap-label">MAP</div>
    </div>
  );
};

export default MiniMap;
