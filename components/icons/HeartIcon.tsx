/**
 * Burning Heart Icon - DOPAMINE STYLE
 * Animated heart with fire and sparkles
 */

import React from "react";
import { motion } from "framer-motion";

type HeartIconProps = {
  size?: number;
  variant?: "default" | "fire" | "sparkle" | "glow";
  animated?: boolean;
  className?: string;
};

export function HeartIcon({
  size = 24,
  variant = "default",
  animated = true,
  className = "",
}: HeartIconProps) {
  const heartPath = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

  const variants = {
    default: {
      gradient: (
        <linearGradient id="heart-gradient-default" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--hot-pink)" />
          <stop offset="100%" stopColor="var(--coral)" />
        </linearGradient>
      ),
      fill: "url(#heart-gradient-default)",
    },
    fire: {
      gradient: (
        <linearGradient id="heart-gradient-fire" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--fire-red)" />
          <stop offset="50%" stopColor="var(--fire-orange)" />
          <stop offset="100%" stopColor="var(--fire-yellow)" />
        </linearGradient>
      ),
      fill: "url(#heart-gradient-fire)",
    },
    sparkle: {
      gradient: (
        <linearGradient id="heart-gradient-sparkle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--hot-pink)" />
          <stop offset="50%" stopColor="var(--bubblegum)" />
          <stop offset="100%" stopColor="var(--lavender)" />
        </linearGradient>
      ),
      fill: "url(#heart-gradient-sparkle)",
    },
    glow: {
      gradient: (
        <radialGradient id="heart-gradient-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="var(--fire-yellow)" />
          <stop offset="50%" stopColor="var(--fire-orange)" />
          <stop offset="100%" stopColor="var(--fire-red)" />
        </radialGradient>
      ),
      fill: "url(#heart-gradient-glow)",
    },
  };

  const config = variants[variant];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {config.gradient}
        {/* Glow filter */}
        <filter id="heart-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main heart */}
      <motion.path
        d={heartPath}
        fill={config.fill}
        stroke="none"
        filter={variant === "glow" ? "url(#heart-glow)" : undefined}
        animate={
          animated
            ? {
                scale: [1, 1.1, 1],
              }
            : undefined
        }
        transition={
          animated
            ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : undefined
        }
      />

      {/* Inner sparkles */}
      {variant === "fire" && (
        <>
          <motion.circle
            cx="12"
            cy="10"
            r="1.5"
            fill="var(--fire-yellow)"
            opacity="0.8"
            animate={animated ? { opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] } : undefined}
            transition={animated ? { duration: 1, repeat: Infinity } : undefined}
          />
          <motion.circle
            cx="9"
            cy="12"
            r="1"
            fill="var(--fire-yellow)"
            opacity="0.6"
            animate={animated ? { opacity: [0.3, 0.9, 0.3], scale: [0.7, 1.1, 0.7] } : undefined}
            transition={animated ? { duration: 1.5, repeat: Infinity, delay: 0.3 } : undefined}
          />
          <motion.circle
            cx="15"
            cy="12"
            r="1"
            fill="var(--fire-yellow)"
            opacity="0.6"
            animate={animated ? { opacity: [0.3, 0.9, 0.3], scale: [0.7, 1.1, 0.7] } : undefined}
            transition={animated ? { duration: 1.5, repeat: Infinity, delay: 0.6 } : undefined}
          />
        </>
      )}

      {/* Sparkle stars */}
      {variant === "sparkle" && (
        <>
          <motion.path
            d="M12 6l0.5 1.5L14 8l-1.5 0.5L12 10l-0.5-1.5L10 8l1.5-0.5z"
            fill="white"
            opacity="0.9"
            animate={animated ? { rotate: [0, 180, 360], opacity: [0.5, 1, 0.5] } : undefined}
            transition={animated ? { duration: 2, repeat: Infinity } : undefined}
          />
          <motion.path
            d="M8 11l0.3 0.9L9 12.2l-0.7 0.3L8 13.4l-0.3-0.9L7 12.2l0.7-0.3z"
            fill="white"
            opacity="0.8"
            animate={animated ? { rotate: [0, -180, -360], opacity: [0.4, 1, 0.4] } : undefined}
            transition={animated ? { duration: 2.5, repeat: Infinity } : undefined}
          />
          <motion.path
            d="M16 11l0.3 0.9L17 12.2l-0.7 0.3L16 13.4l-0.3-0.9L15 12.2l0.7-0.3z"
            fill="white"
            opacity="0.8"
            animate={animated ? { rotate: [0, 180, 360], opacity: [0.4, 1, 0.4] } : undefined}
            transition={animated ? { duration: 2.5, repeat: Infinity, delay: 0.5 } : undefined}
          />
        </>
      )}
    </svg>
  );
}
