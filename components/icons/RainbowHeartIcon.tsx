/**
 * Rainbow Heart Icon - Sparkle & Radiance Style
 * Inspired by rainbow burst moodboard
 */

import React from "react";
import { motion } from "framer-motion";

type RainbowHeartIconProps = {
  size?: number;
  animated?: boolean;
  variant?: "default" | "burst" | "sparkle";
};

export function RainbowHeartIcon({ 
  size = 24, 
  animated = false,
  variant = "default"
}: RainbowHeartIconProps) {
  const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

  const pulseAnimation = animated ? {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  } : {};

  const rotateAnimation = animated ? {
    rotate: [0, 360],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "linear",
    },
  } : {};

  const sparkleAnimation = animated ? {
    opacity: [0, 1, 0],
    scale: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  } : {};

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF1B8D" />
          <stop offset="20%" stopColor="#FF6B35" />
          <stop offset="40%" stopColor="#FFD23F" />
          <stop offset="60%" stopColor="#00D9FF" />
          <stop offset="80%" stopColor="#A45EE5" />
          <stop offset="100%" stopColor="#FF1B8D" />
        </linearGradient>
        
        <radialGradient id="burst-gradient">
          <stop offset="0%" stopColor="#FFD23F" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FF1B8D" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#A45EE5" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Burst rays */}
      {variant === "burst" && (
        <motion.g animate={rotateAnimation} style={{ originX: 0.5, originY: 0.5 }}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.line
              key={`ray-${i}`}
              x1="12"
              y1="12"
              x2={12 + Math.cos((angle * Math.PI) / 180) * 8}
              y2={12 + Math.sin((angle * Math.PI) / 180) * 8}
              stroke="url(#rainbow-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              animate={animated ? {
                opacity: [0.3, 0.8, 0.3],
                transition: { duration: 1.5, repeat: Infinity, delay: i * 0.1 },
              } : {}}
            />
          ))}
        </motion.g>
      )}

      {/* Main heart */}
      <motion.path
        d={heartPath}
        fill="url(#rainbow-gradient)"
        stroke="#000"
        strokeWidth="1.5"
        animate={pulseAnimation}
      />

      {/* Sparkles */}
      {variant === "sparkle" && animated && (
        <>
          {[
            { x: 6, y: 6, delay: 0 },
            { x: 18, y: 6, delay: 0.3 },
            { x: 12, y: 18, delay: 0.6 },
            { x: 3, y: 12, delay: 0.9 },
            { x: 21, y: 12, delay: 1.2 },
          ].map((pos, i) => (
            <motion.g key={`sparkle-${i}`} animate={{
              ...sparkleAnimation,
              transition: { ...sparkleAnimation.transition, delay: pos.delay },
            }}>
              <path
                d={`M${pos.x} ${pos.y - 2} L${pos.x} ${pos.y + 2} M${pos.x - 2} ${pos.y} L${pos.x + 2} ${pos.y}`}
                stroke="#FFD23F"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </motion.g>
          ))}
        </>
      )}
    </svg>
  );
}
