import React, { useRef, useEffect } from "react";

const DottedLandscape: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // CONTROLS - Tweak these values manually
  const dotSize = 2; // Size of each dot (2-8 works well)
  const waveHeight = 60; // Height variation of waves (30-120)
  const waveFrequency = 0.015; // Wave frequency/detail (0.01-0.03)
  const animationSpeed = 1.2; // Animation speed (0 = static, 2 = fast)
  const waveCount = 3; // Number of wave layers (2-5)

  // Simple noise function (similar to Perlin noise)
  const noise = (x: number, y: number, seedVal = 0): number => {
    const n = Math.sin(x * 12.9898 + y * 78.233 + seedVal) * 43758.5453;
    return n - Math.floor(n);
  };

  // Generate wave height at given x coordinate using sine waves
  const getWaveHeight = (
    x: number,
    canvas: HTMLCanvasElement,
    time: number,
  ): number => {
    const baseHeight = canvas.height * 0.6;
    let waveValue = 0;

    // Layer multiple sine waves for more complex wave patterns
    for (let i = 0; i < waveCount; i++) {
      const frequency = waveFrequency * (i + 1);
      const amplitude = waveHeight / (i + 1);
      const phase = time * 0.01 * (i + 1);
      waveValue += Math.sin(x * frequency + phase) * amplitude;
    }

    return baseHeight + waveValue;
  };

  // Check if a point is above the waves
  const isAboveWaves = (
    x: number,
    y: number,
    canvas: HTMLCanvasElement,
    time: number,
  ): boolean => {
    return y < getWaveHeight(x, canvas, time);
  };

  const drawDottedWaves = (
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    time: number,
  ) => {
    // Clear canvas with dark blue background
    ctx.fillStyle = "#001122";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw dots
    for (let x = dotSize; x < canvas.width; x += dotSize * 2) {
      for (let y = dotSize; y < canvas.height; y += dotSize * 2) {
        if (isAboveWaves(x, y, canvas, time)) {
          // Sky/air area - sparse dots with blue tint
          if (Math.random() < 0.2) {
            ctx.fillStyle = "#112233";
            ctx.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
          }
        } else {
          // Water area - dense dots with wave-based coloring
          const waveDepth = y - getWaveHeight(x, canvas, time);
          const intensity = Math.min(1, waveDepth / 80);

          // Create blue gradient from light blue (surface) to dark blue (deep)
          const blue = Math.floor(100 + intensity * 100);
          const green = Math.floor(50 + intensity * 80);
          const red = Math.floor(20 + intensity * 40);

          ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
          ctx.fillRect(x - dotSize / 2, y - dotSize / 2, dotSize, dotSize);
        }
      }
    }

    // Add some foam/spray particles near wave peaks
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * canvas.width;
      const waveY = getWaveHeight(x, canvas, time);
      const y = waveY + (Math.random() - 0.5) * 20;

      if (y > 0 && y < canvas.height) {
        const alpha = Math.random() * 0.8;
        ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (animationSpeed > 0) {
      timeRef.current += animationSpeed;
    }

    drawDottedWaves(canvas, ctx, timeRef.current);
    animationRef.current = window.requestAnimationFrame(animate);
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // For background use, you might want to set canvas size to window size:
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;

    // For now, keeping fixed size for testing
    canvas.width = 800;
    canvas.height = 400;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawDottedWaves(canvas, ctx, timeRef.current);
  };

  useEffect(() => {
    resizeCanvas();
    animate();

    // Optional: Add window resize listener for background use
    // window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      // window.removeEventListener('resize', resizeCanvas);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={canvasRef} className="border border-gray-600" />;
};

export default DottedLandscape;
