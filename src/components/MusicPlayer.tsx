import React, { useState, useEffect, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const animations = {
  container: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  playButton: {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.9 },
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },
  playButtonWrapper: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  },
  icon: {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
    transition: { duration: 0.15 },
  },
  content: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 },
  },
  albumCover: {
    initial: { opacity: 0, scale: 0.8 },
    animate: (isPlaying: boolean) => ({
      opacity: 1,
      scale: isPlaying ? [1, 1.02, 1] : 1,
      transition: {
        opacity: { duration: 0.3 },
        scale: {
          repeat: isPlaying ? Infinity : 0,
          duration: 1.6,
          ease: "easeInOut",
        },
      },
    }),
  },
};

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    const AUDIO_SOURCE = "/100.mp3";
    const audio = new Audio(AUDIO_SOURCE);
    audioRef.current = audio;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.removeEventListener("ended", handleEnded);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const togglePlayPause = async (): Promise<void> => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      } else {
        await audio.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Playback failed:", error);
    }
  };

  return (
    <motion.div
      className="flex h-full w-full items-center justify-between px-4"
      {...animations.container}
    >
      <motion.div
        className="flex items-center gap-4"
        {...animations.playButtonWrapper}
      >
        <motion.button
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause" : "Play"}
          {...animations.playButton}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div key="pause" {...animations.icon}>
                <Pause className="h-4 w-4 text-white" />
              </motion.div>
            ) : (
              <motion.div key="play" {...animations.icon}>
                <Play className="h-4 w-4 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      <motion.div className="flex flex-col" {...animations.content}>
        <span className="text-sm font-medium text-white">100</span>
        <span className="text-sm text-(--text-accent)">Dean Blunt</span>
      </motion.div>

      <motion.div
        className="h-12 w-12 overflow-hidden rounded-lg"
        custom={isPlaying}
        variants={animations.albumCover}
        initial="initial"
        animate="animate"
      >
        <img
          src="/album-cover.jpeg"
          alt="Album Cover - 100 by Dean Blunt"
          className="h-full w-full object-cover"
          loading="eager"
          draggable={false}
        />
      </motion.div>
    </motion.div>
  );
};

export default MusicPlayer;
