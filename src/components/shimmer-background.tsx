import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    resizeTimer: ReturnType<typeof setTimeout>;
  }
}

const ShimmerBackground = (): JSX.Element => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioStarted, setAudioStarted] = useState<boolean>(false);

  // Separate effect for audio initialization
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.load(); // Force load
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setAudioStarted(true);
          })
          .catch(() => {
            // Autoplay failed, will need user interaction
          });
      }
    }
  }, []);

  useEffect(() => {
    const canvas = document.getElementById(
      "backgroundCanvas",
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d", {
      alpha: false,
    }) as CanvasRenderingContext2D;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let animationFrameId: number;
    let lastFrameTime = 0;
    const TARGET_FPS = 60;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    const setSize = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap DPR at 2
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      initDots(); // Reinitialize dots when size changes
    };

    const dotSpacing = isMobile ? 20 : 15; // Increase spacing on mobile
    const chars = "▲*#-+~.";
    let shimmerProgress = 0;
    let dots: Array<
      Array<{
        x: number;
        y: number;
        baseOpacity: number;
        char: string;
        fillStyle: string;
      }>
    > = [];

    const initDots = () => {
      dots = [];
      const displayWidth = canvas.width / (window.devicePixelRatio || 1);
      const displayHeight = canvas.height / (window.devicePixelRatio || 1);

      ctx.font = `${dotSpacing / 1.5}px var(--font-Geist)`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (let x = 0; x < displayWidth; x += dotSpacing) {
        const column = [];
        for (let y = 0; y < displayHeight; y += dotSpacing) {
          const baseOpacity = 0.0; // Slightly increased base opacity
          column.push({
            x,
            y,
            baseOpacity,
            char: chars[Math.floor(Math.random() * chars.length)],
            fillStyle: `rgba(255, 155, 100, ${baseOpacity})`,
          });
        }
        dots.push(column);
      }
    };

    const drawBackground = (timestamp: number): void => {
      if (timestamp - lastFrameTime < FRAME_INTERVAL) {
        animationFrameId = requestAnimationFrame(drawBackground);
        return;
      }

      lastFrameTime = timestamp;
      ctx.fillStyle = "#ffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const displayWidth = canvas.width / (window.devicePixelRatio || 1);
      const displayHeight = canvas.height / (window.devicePixelRatio || 1);
      const shimmerX = -displayWidth / 2 + shimmerProgress * (displayWidth * 2);
      const shimmerY = displayHeight / 2.5;
      const shimmerRadius = displayWidth * 0.8;
      const shimmerRadiusSquared = shimmerRadius * shimmerRadius;

      dots.forEach((column) => {
        column.forEach((dot) => {
          const dx = (dot.x - shimmerX) * 2;
          const dy = dot.y - shimmerY;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < shimmerRadiusSquared) {
            const shimmerFactor =
              1 - Math.sqrt(distanceSquared) / shimmerRadius;
            const shimmerEffect = Math.pow(shimmerFactor, 4) * 0.5;
            ctx.fillStyle = `rgba(300, 300, 400, ${dot.baseOpacity + shimmerEffect})`;
          } else {
            ctx.fillStyle = dot.fillStyle;
          }

          ctx.fillText(dot.char, dot.x, dot.y);
        });
      });

      shimmerProgress += 0.003; // Reduced speed
      shimmerProgress %= 1;
      animationFrameId = requestAnimationFrame(drawBackground);
    };

    setSize();
    initDots();
    const resizeHandler = () => {
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(setSize, 250);
    };
    window.addEventListener("resize", resizeHandler);
    animationFrameId = requestAnimationFrame(drawBackground);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleClick = () => {
    if (audioRef.current && !audioStarted) {
      audioRef.current
        .play()
        .then(() => {
          setAudioStarted(true);
        })
        .catch((err) => {
          console.log("Audio playback failed:", err);
        });
    }
  };

  return (
    <div className="fixed inset-0 -z-10" onClick={handleClick}>
      <canvas id="backgroundCanvas" />
      <audio
        ref={audioRef}
        src="/background-sound.mp3"
        preload="auto"
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ShimmerBackground;
