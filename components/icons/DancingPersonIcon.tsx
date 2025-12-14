/**
 * Dancing Person Icon - Keith Haring Style
 * Animated figure with vibration lines
 */

import React from "react";
import { motion } from "motion/react";

type DancingPersonIconProps = {
  size?: number;
  animated?: boolean;
  pose?: "jump" | "wave" | "dance" | "reach" | "celebrate";
  color?: string;
};

export function DancingPersonIcon({ 
  size = 24, 
  animated = false,
  pose = "dance",
  color = "currentColor"
}: DancingPersonIconProps) {
  const poses = {
    // Today - Jumping with joy
    jump: {
      body: "M12 8 L12 14 M8 11 L12 8 L16 11 M12 14 L8 18 M12 14 L16 18",
      head: { cx: 12, cy: 5, r: 2.5 },
      vibration: ["M6 6 L4 4", "M18 6 L20 4", "M6 16 L4 18", "M18 16 L20 18"],
    },
    // Moments - Person with heart/camera
    wave: {
      body: "M12 8 L12 14 M7 9 L12 8 M12 8 L17 9 M12 14 L9 20 M12 14 L15 20",
      head: { cx: 12, cy: 5, r: 2.5 },
      vibration: ["M15 7 L18 5", "M16 9 L19 9", "M17 11 L20 12"],
    },
    // Room - Person sitting/relaxing
    dance: {
      body: "M12 8 L12 14 M8 10 L12 8 L16 10 M12 14 L10 19 M12 14 L14 19",
      head: { cx: 12, cy: 5, r: 2.5 },
      vibration: ["M9 9 L7 7", "M15 9 L17 7", "M9 17 L7 19", "M15 17 L17 19"],
    },
    // Memory - Person looking at memories
    reach: {
      body: "M12 8 L12 14 M7 11 L12 8 M12 8 L17 5 M12 14 L9 19 M12 14 L15 19",
      head: { cx: 12, cy: 5, r: 2.5 },
      vibration: ["M16 3 L18 1", "M18 4 L20 3", "M19 6 L21 6"],
    },
    // Settings - Person with gear/wrench
    celebrate: {
      body: "M12 8 L12 14 M7 7 L12 8 M12 8 L17 7 M12 14 L8 19 M12 14 L16 19",
      head: { cx: 12, cy: 5, r: 2.5 },
      vibration: ["M6 5 L4 3", "M18 5 L20 3", "M7 18 L5 20", "M17 18 L19 20"],
    },
  };

  const currentPose = poses[pose];

  const bounceAnimation = animated ? {
    y: [0, -3, 0],
    rotate: [-2, 2, -2],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  } : {};

  const vibrateAnimation = animated ? {
    opacity: [1, 0.6, 1],
    scale: [1, 0.95, 1],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  } : {};

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={bounceAnimation}
      style={{ originX: 0.5, originY: 0.5 }}
    >
      {/* Vibration lines */}
      {currentPose.vibration.map((d, i) => (
        <motion.path
          key={`vibe-${i}`}
          d={d}
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={vibrateAnimation}
          style={{ opacity: 0.7 }}
        />
      ))}

      {/* Body */}
      <motion.path
        d={currentPose.body}
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Head */}
      <motion.circle
        cx={currentPose.head.cx}
        cy={currentPose.head.cy}
        r={currentPose.head.r}
        stroke={color}
        strokeWidth="3"
        fill="none"
      />

      {/* Decorative dots */}
      {animated && (
        <>
          <motion.circle
            cx="5"
            cy="12"
            r="1"
            fill={color}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
              transition: { duration: 0.8, repeat: Infinity, delay: 0 },
            }}
          />
          <motion.circle
            cx="19"
            cy="12"
            r="1"
            fill={color}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
              transition: { duration: 0.8, repeat: Infinity, delay: 0.2 },
            }}
          />
          <motion.circle
            cx="12"
            cy="20"
            r="1"
            fill={color}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
              transition: { duration: 0.8, repeat: Infinity, delay: 0.4 },
            }}
          />
        </>
      )}
    </motion.svg>
  );
}
