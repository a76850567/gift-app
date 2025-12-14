/**
 * Flame Icon - DOPAMINE STYLE
 * Animated fire with gradient and flicker
 */

import React from "react";
import { motion } from "framer-motion";

type FlameIconProps = {
  size?: number;
  variant?: "default" | "intense" | "soft" | "multi";
  animated?: boolean;
  className?: string;
};

export function FlameIcon({
  size = 24,
  variant = "default",
  animated = true,
  className = "",
}: FlameIconProps) {
  const variants = {
    default: {
      gradient: (
        <linearGradient id="flame-gradient-default" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="var(--fire-yellow)" />
          <stop offset="50%" stopColor="var(--fire-orange)" />
          <stop offset="100%" stopColor="var(--fire-red)" />
        </linearGradient>
      ),
      fill: "url(#flame-gradient-default)",
    },
    intense: {
      gradient: (
        <linearGradient id="flame-gradient-intense" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFF" />
          <stop offset="30%" stopColor="var(--fire-yellow)" />
          <stop offset="70%" stopColor="var(--fire-orange)" />
          <stop offset="100%" stopColor="var(--fire-red)" />
        </linearGradient>
      ),
      fill: "url(#flame-gradient-intense)",
    },
    soft: {
      gradient: (
        <linearGradient id="flame-gradient-soft" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="var(--sunshine)" />
          <stop offset="50%" stopColor="var(--tangerine)" />
          <stop offset="100%" stopColor="var(--coral)" />
        </linearGradient>
      ),
      fill: "url(#flame-gradient-soft)",
    },
    multi: {
      gradient: (
        <radialGradient id="flame-gradient-multi" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FFF" />
          <stop offset="20%" stopColor="var(--fire-yellow)" />
          <stop offset="50%" stopColor="var(--fire-orange)" />
          <stop offset="100%" stopColor="var(--fire-red)" />
        </radialGradient>
      ),
      fill: "url(#flame-gradient-multi)",
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
        <filter id="flame-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main flame shape */}
      <motion.path
        d="M12 2C12 2 8 6 8 10C8 13.31 10.24 16 12 16C13.76 16 16 13.31 16 10C16 6 12 2 12 2Z"
        fill={config.fill}
        filter="url(#flame-glow)"
        animate={
          animated
            ? {
                scale: [1, 1.05, 0.95, 1],
                scaleY: [1, 1.1, 0.9, 1],
              }
            : undefined
        }
        transition={
          animated
            ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : undefined
        }
      />

      {/* Secondary flame */}
      <motion.path
        d="M12 5C12 5 10 7.5 10 10C10 12 11 13.5 12 13.5C13 13.5 14 12 14 10C14 7.5 12 5 12 5Z"
        fill="var(--fire-yellow)"
        opacity="0.8"
        animate={
          animated
            ? {
                scale: [1, 1.1, 0.95, 1],
                opacity: [0.6, 0.9, 0.6],
              }
            : undefined
        }
        transition={
          animated
            ? {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }
            : undefined
        }
      />

      {/* Inner white core */}
      {variant === "intense" && (
        <motion.path
          d="M12 7C12 7 11 8.5 11 10C11 11 11.5 12 12 12C12.5 12 13 11 13 10C13 8.5 12 7 12 7Z"
          fill="white"
          opacity="0.9"
          animate={
            animated
              ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }
              : undefined
          }
          transition={
            animated
              ? {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : undefined
          }
        />
      )}

      {/* Flame base (drip) */}
      <motion.path
        d="M12 16C12 16 9 16.5 9 18C9 19.5 10.34 21 12 21C13.66 21 15 19.5 15 18C15 16.5 12 16 12 16Z"
        fill={config.fill}
        opacity="0.7"
        animate={
          animated
            ? {
                scaleY: [1, 0.9, 1.1, 1],
                y: [0, -1, 1, 0],
              }
            : undefined
        }
        transition={
          animated
            ? {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : undefined
        }
      />

      {/* Sparkles for multi variant */}
      {variant === "multi" && (
        <>
          <motion.circle
            cx="12"
            cy="8"
            r="1"
            fill="white"
            opacity="0.9"
            animate={animated ? { opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] } : undefined}
            transition={animated ? { duration: 1, repeat: Infinity } : undefined}
          />
          <motion.circle
            cx="10"
            cy="11"
            r="0.8"
            fill="var(--fire-yellow)"
            opacity="0.8"
            animate={animated ? { opacity: [0.3, 0.9, 0.3], scale: [0.7, 1.1, 0.7] } : undefined}
            transition={animated ? { duration: 1.5, repeat: Infinity, delay: 0.3 } : undefined}
          />
          <motion.circle
            cx="14"
            cy="11"
            r="0.8"
            fill="var(--fire-yellow)"
            opacity="0.8"
            animate={animated ? { opacity: [0.3, 0.9, 0.3], scale: [0.7, 1.1, 0.7] } : undefined}
            transition={animated ? { duration: 1.5, repeat: Infinity, delay: 0.6 } : undefined}
          />
        </>
      )}
    </svg>
  );
}
