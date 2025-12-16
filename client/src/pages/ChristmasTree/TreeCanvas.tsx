import { useEffect, useRef } from 'react';

interface TreeCanvasProps {
  width?: number;
  height?: number;
}

export const TreeCanvas = ({ width = 400, height = 600 }: TreeCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to high DPI
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const centerX = width / 2;
    let animationTime = 0;

    // Ornaments positions - better distribution
    const ornaments = [
      { x: centerX - 35, y: 115, color: '#ff0000', type: 'solid', size: 14 },
      { x: centerX + 38, y: 125, color: '#0066cc', type: 'solid', size: 14 },
      { x: centerX - 28, y: 148, color: '#ffcc00', type: 'solid', size: 13 },
      { x: centerX + 32, y: 138, color: '#ffcc00', type: 'pattern-yellow', size: 13 },
      { x: centerX - 48, y: 175, color: '#ff0000', type: 'solid', size: 15 },
      { x: centerX + 48, y: 185, color: '#0066cc', type: 'solid', size: 15 },
      { x: centerX - 32, y: 205, color: '#ffcc00', type: 'solid', size: 14 },
      { x: centerX + 42, y: 195, color: '#0066cc', type: 'pattern-blue', size: 14 },
      { x: centerX - 22, y: 235, color: '#ff0000', type: 'solid', size: 13 },
      { x: centerX + 52, y: 245, color: '#0066cc', type: 'pattern-striped', size: 13 },
      { x: centerX - 42, y: 265, color: '#ffcc00', type: 'solid', size: 14 },
      { x: centerX + 32, y: 275, color: '#ff0000', type: 'solid', size: 14 },
      { x: centerX - 28, y: 305, color: '#0066cc', type: 'solid', size: 15 },
      { x: centerX + 38, y: 315, color: '#ffcc00', type: 'pattern-yellow', size: 15 },
      { x: centerX - 38, y: 345, color: '#ff0000', type: 'solid', size: 14 },
      { x: centerX + 42, y: 355, color: '#0066cc', type: 'solid', size: 14 },
    ];

    // White lights positions - more lights
    const lights = [
      { x: centerX - 32, y: 108 },
      { x: centerX + 28, y: 122 },
      { x: centerX - 22, y: 142 },
      { x: centerX + 38, y: 155 },
      { x: centerX - 42, y: 170 },
      { x: centerX + 22, y: 190 },
      { x: centerX - 28, y: 210 },
      { x: centerX + 48, y: 225 },
      { x: centerX - 38, y: 245 },
      { x: centerX + 28, y: 260 },
      { x: centerX - 32, y: 280 },
      { x: centerX + 42, y: 295 },
      { x: centerX - 22, y: 315 },
      { x: centerX + 32, y: 330 },
      { x: centerX - 38, y: 350 },
      { x: centerX + 28, y: 365 },
      { x: centerX - 15, y: 130 },
      { x: centerX + 15, y: 165 },
      { x: centerX - 20, y: 220 },
      { x: centerX + 20, y: 270 },
    ];

    const drawTree = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw tree layers (from bottom to top) with better proportions
      const layers = [
        { width: 250, height: 165, y: 435 },
        { width: 210, height: 145, y: 290 },
        { width: 170, height: 125, y: 165 },
        { width: 130, height: 105, y: 60 },
      ];

      layers.forEach((layer, index) => {
        // Main tree shape
        ctx.beginPath();
        ctx.moveTo(centerX, layer.y);
        ctx.lineTo(centerX - layer.width / 2, layer.y + layer.height);
        ctx.lineTo(centerX + layer.width / 2, layer.y + layer.height);
        ctx.closePath();
        
        // Beautiful gradient for depth
        const gradient = ctx.createLinearGradient(
          centerX - layer.width / 2,
          layer.y,
          centerX + layer.width / 2,
          layer.y + layer.height
        );
        
        // Richer green colors
        const darkGreen = '#0d4a1f';
        const midGreen = '#1a6b2e';
        const lightGreen = '#2a8f4a';
        
        gradient.addColorStop(0, darkGreen);
        gradient.addColorStop(0.3, midGreen);
        gradient.addColorStop(0.5, lightGreen);
        gradient.addColorStop(0.7, midGreen);
        gradient.addColorStop(1, darkGreen);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add texture with small branches
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 8; i++) {
          const branchX = centerX - layer.width / 2 + (layer.width / 8) * i;
          const branchY = layer.y + (layer.height / 4) * (i % 2 === 0 ? 1 : 2);
          ctx.beginPath();
          ctx.moveTo(branchX, branchY);
          ctx.lineTo(branchX + (i % 2 === 0 ? -8 : 8), branchY + 5);
          ctx.stroke();
        }
        
        // Add highlight on top
        const highlightGradient = ctx.createLinearGradient(
          centerX - layer.width / 4,
          layer.y,
          centerX + layer.width / 4,
          layer.y + layer.height / 3
        );
        highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
        highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = highlightGradient;
        ctx.beginPath();
        ctx.moveTo(centerX, layer.y);
        ctx.lineTo(centerX - layer.width / 4, layer.y + layer.height / 3);
        ctx.lineTo(centerX + layer.width / 4, layer.y + layer.height / 3);
        ctx.closePath();
        ctx.fill();
      });

      // Draw tree trunk with better detail
      const trunkWidth = 55;
      const trunkHeight = 85;
      const trunkX = centerX - trunkWidth / 2;
      const trunkY = height - trunkHeight;

      // Trunk gradient
      const trunkGradient = ctx.createLinearGradient(trunkX, trunkY, trunkX + trunkWidth, trunkY + trunkHeight);
      trunkGradient.addColorStop(0, '#6d4c41');
      trunkGradient.addColorStop(0.5, '#5d4037');
      trunkGradient.addColorStop(1, '#4e342e');
      
      ctx.fillStyle = trunkGradient;
      ctx.fillRect(trunkX, trunkY, trunkWidth, trunkHeight);
      
      // Trunk texture lines
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(trunkX + 5 + i * 10, trunkY);
        ctx.lineTo(trunkX + 5 + i * 10, trunkY + trunkHeight);
        ctx.stroke();
      }

      // Trunk shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(trunkX, trunkY + trunkHeight - 12, trunkWidth, 12);
    };

    const drawStar = () => {
      const starX = centerX;
      const starY = 28;
      const size = 35;
      const spikes = 5;
      const outerRadius = size;
      const innerRadius = size * 0.45;

      ctx.save();
      ctx.translate(starX, starY);
      ctx.rotate((animationTime * 0.3) % (Math.PI * 2));

      // Outer glow
      const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, outerRadius * 1.5);
      glowGradient.addColorStop(0, 'rgba(255, 215, 0, 0.6)');
      glowGradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.3)');
      glowGradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(0, 0, outerRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Star shape
      ctx.beginPath();
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (i * Math.PI) / spikes - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();

      // Beautiful gold gradient
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, outerRadius);
      gradient.addColorStop(0, '#fff9c4');
      gradient.addColorStop(0.3, '#ffd700');
      gradient.addColorStop(0.6, '#ffed4e');
      gradient.addColorStop(1, '#ffa000');
      ctx.fillStyle = gradient;
      ctx.fill();

      // Star outline
      ctx.strokeStyle = '#ffa000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Center highlight
      ctx.beginPath();
      ctx.arc(0, 0, innerRadius * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fill();

      ctx.restore();
    };

    const drawBow = () => {
      const bowX = centerX;
      const bowY = 52;
      const bowSize = 24;

      ctx.save();
      ctx.translate(bowX, bowY);
      ctx.rotate(Math.sin(animationTime * 0.015) * 0.08);

      // Bow shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.ellipse(0, bowSize / 2 + 2, bowSize * 0.6, bowSize * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Left loop
      const leftGradient = ctx.createRadialGradient(-bowSize / 2, 0, 0, -bowSize / 2, 0, bowSize / 2);
      leftGradient.addColorStop(0, '#ff4444');
      leftGradient.addColorStop(0.5, '#cc0000');
      leftGradient.addColorStop(1, '#990000');
      ctx.fillStyle = leftGradient;
      ctx.beginPath();
      ctx.ellipse(-bowSize / 2, 0, bowSize / 2, bowSize / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#990000';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Right loop
      const rightGradient = ctx.createRadialGradient(bowSize / 2, 0, 0, bowSize / 2, 0, bowSize / 2);
      rightGradient.addColorStop(0, '#ff4444');
      rightGradient.addColorStop(0.5, '#cc0000');
      rightGradient.addColorStop(1, '#990000');
      ctx.fillStyle = rightGradient;
      ctx.beginPath();
      ctx.ellipse(bowSize / 2, 0, bowSize / 2, bowSize / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Bow center knot
      ctx.fillStyle = '#990000';
      ctx.fillRect(-6, -4, 12, 8);
      ctx.strokeStyle = '#660000';
      ctx.lineWidth = 1;
      ctx.strokeRect(-6, -4, 12, 8);

      // Ribbons with gradient
      const ribbonGradient = ctx.createLinearGradient(0, bowSize / 2, 0, bowSize / 2 + 18);
      ribbonGradient.addColorStop(0, '#cc0000');
      ribbonGradient.addColorStop(1, '#990000');
      ctx.fillStyle = ribbonGradient;
      ctx.fillRect(-bowSize / 2 - 6, bowSize / 2, 4, 18);
      ctx.fillRect(bowSize / 2 + 2, bowSize / 2, 4, 18);

      ctx.restore();
    };

    const drawOrnament = (x: number, y: number, color: string, type: string, size: number) => {
      const bounce = Math.sin(animationTime * 0.025 + y * 0.08) * 4;
      const finalY = y + bounce;
      const rotation = Math.sin(animationTime * 0.02 + y * 0.1) * 0.1;

      ctx.save();
      ctx.translate(x, finalY);
      ctx.rotate(rotation);

      // Draw ornament shadow
      ctx.beginPath();
      ctx.ellipse(0, size + 3, size * 0.7, size * 0.35, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fill();

      // Draw ornament with gradient
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      
      if (type === 'solid') {
        const ornamentGradient = ctx.createRadialGradient(-size * 0.3, -size * 0.3, 0, 0, 0, size);
        const darkerColor = color === '#ff0000' ? '#cc0000' : color === '#0066cc' ? '#004499' : '#cc9900';
        ornamentGradient.addColorStop(0, color);
        ornamentGradient.addColorStop(0.5, darkerColor);
        ornamentGradient.addColorStop(1, darkerColor);
        ctx.fillStyle = ornamentGradient;
        ctx.fill();
      } else if (type === 'pattern-yellow') {
        // Yellow with orange chevron pattern
        ctx.fillStyle = '#ffcc00';
        ctx.fill();
        ctx.strokeStyle = '#ff8800';
        ctx.lineWidth = 2.5;
        for (let i = -size; i < size; i += 5) {
          ctx.beginPath();
          ctx.moveTo(i, -size);
          ctx.lineTo(i + 2.5, 0);
          ctx.lineTo(i + 5, -size);
          ctx.stroke();
        }
      } else if (type === 'pattern-blue') {
        // Blue with red chevron pattern
        ctx.fillStyle = '#0066cc';
        ctx.fill();
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 2.5;
        for (let i = -size; i < size; i += 5) {
          ctx.beginPath();
          ctx.moveTo(i, -size);
          ctx.lineTo(i + 2.5, 0);
          ctx.lineTo(i + 5, -size);
          ctx.stroke();
        }
      } else if (type === 'pattern-striped') {
        // Blue with red horizontal stripes
        ctx.fillStyle = '#0066cc';
        ctx.fill();
        ctx.strokeStyle = '#ff0000';
        ctx.lineWidth = 2;
        for (let i = -size; i < size; i += 4) {
          ctx.beginPath();
          ctx.moveTo(-size, i);
          ctx.lineTo(size, i);
          ctx.stroke();
        }
      }

      // Beautiful highlight
      const highlightGradient = ctx.createRadialGradient(-size * 0.4, -size * 0.4, 0, -size * 0.4, -size * 0.4, size * 0.5);
      highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
      highlightGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
      highlightGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = highlightGradient;
      ctx.beginPath();
      ctx.arc(-size * 0.4, -size * 0.4, size * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Top hook with gradient
      const hookGradient = ctx.createLinearGradient(-3, -size - 4, 3, -size);
      hookGradient.addColorStop(0, '#6d4c41');
      hookGradient.addColorStop(1, '#8b4513');
      ctx.fillStyle = hookGradient;
      ctx.fillRect(-3, -size - 5, 6, 6);
      ctx.strokeStyle = '#5d4037';
      ctx.lineWidth = 1;
      ctx.strokeRect(-3, -size - 5, 6, 6);

      // Reflection line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-size * 0.6, -size * 0.2);
      ctx.lineTo(size * 0.3, size * 0.4);
      ctx.stroke();

      ctx.restore();
    };

    const drawWhiteLight = (x: number, y: number, index: number) => {
      const twinkle = Math.sin(animationTime * 0.04 + index * 0.4) * 0.35 + 0.65;
      const size = 5 * twinkle;

      ctx.save();
      ctx.translate(x, y);

      // Outer glow
      const outerGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 3);
      outerGlow.addColorStop(0, `rgba(255, 255, 255, ${twinkle * 0.4})`);
      outerGlow.addColorStop(0.3, `rgba(255, 255, 255, ${twinkle * 0.2})`);
      outerGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(0, 0, size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Middle glow
      const middleGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2);
      middleGlow.addColorStop(0, `rgba(255, 255, 255, ${twinkle * 0.8})`);
      middleGlow.addColorStop(0.5, `rgba(255, 255, 255, ${twinkle * 0.4})`);
      middleGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = middleGlow;
      ctx.beginPath();
      ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
      ctx.fill();

      // Light bulb core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fill();

      // Bright center
      ctx.fillStyle = 'rgba(255, 255, 200, 0.9)';
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      animationTime += 1;
      
      drawTree();
      drawStar();
      drawBow();

      // Draw white lights
      lights.forEach((light, index) => {
        drawWhiteLight(light.x, light.y, index);
      });

      // Draw ornaments
      ornaments.forEach((ornament) => {
        drawOrnament(ornament.x, ornament.y, ornament.color, ornament.type, ornament.size);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{ display: 'block' }}
    />
  );
};
