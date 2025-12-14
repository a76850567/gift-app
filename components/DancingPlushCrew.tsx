/**
 * Dancing Plush Crew - Keith Haring Style
 * A group of dancing figures that respond to mood
 */

import React from "react";
import { motion } from "framer-motion";
import type { PlushMood } from "../types/gift";

type DancingPlushCrewProps = {
  mood: PlushMood;
  reduceMotion: boolean;
  className?: string;
  warmth?: number; // Add warmth prop for progress display
  onAddWarmth?: (amount: number) => void; // Optional test function
  compact?: boolean; // Compact mode for smaller displays
};

const MOOD_CONFIG: Record<
  PlushMood,
  {
    message: string;
    gradient: string;
    borderColor: string;
    figureCount: number;
    energy: "low" | "medium" | "high" | "max";
    colors: string[];
  }
> = {
  sleepy: {
    message: "Take it easy.",
    gradient: "bg-gradient-to-br from-gray-200 to-gray-300",
    borderColor: "border-gray-400",
    figureCount: 1,
    energy: "low",
    colors: ["#9CA3AF"],
  },
  calm: {
    message: "I'm here.",
    gradient: "bg-gradient-to-br from-[#FFD93D] to-[#FF9B3D]",
    borderColor: "border-[#FF9B3D]",
    figureCount: 2,
    energy: "medium",
    colors: ["#FF9B3D", "#FFD93D"],
  },
  happy: {
    message: "I'm proud of you.",
    gradient: "bg-gradient-to-br from-[#FF1B8D] to-[#FF6B4A]",
    borderColor: "border-[#FF1B8D]",
    figureCount: 3,
    energy: "high",
    colors: ["#FF1B8D", "#FF6B4A", "#FFD93D"],
  },
  spark: {
    message: "You're glowing! 🔥",
    gradient: "gradient-fire-animated",
    borderColor: "border-[var(--fire-red)]",
    figureCount: 5,
    energy: "max",
    colors: ["#FF1B8D", "#FF6B4A", "#FFD93D", "#B8E62E", "#4ECDC4"],
  },
};

// Dancing poses for Keith Haring style figures
const DANCE_POSES = [
  // Pose 1: Arms up celebration
  {
    body: "M12 8 L12 14 M7 7 L12 8 M12 8 L17 7 M12 14 L8 19 M12 14 L16 19",
    head: { cx: 12, cy: 5 },
    vibration: ["M6 5 L4 3", "M18 5 L20 3", "M7 18 L5 20", "M17 18 L19 20"],
  },
  // Pose 2: Jump with joy
  {
    body: "M12 8 L12 14 M8 11 L12 8 L16 11 M12 14 L8 18 M12 14 L16 18",
    head: { cx: 12, cy: 5 },
    vibration: ["M6 6 L4 4", "M18 6 L20 4", "M6 16 L4 18", "M18 16 L20 18"],
  },
  // Pose 3: Side dance
  {
    body: "M12 8 L12 14 M8 10 L12 8 L16 10 M12 14 L10 19 M12 14 L14 19",
    head: { cx: 12, cy: 5 },
    vibration: ["M9 9 L7 7", "M15 9 L17 7", "M9 17 L7 19", "M15 17 L17 19"],
  },
  // Pose 4: Reaching up
  {
    body: "M12 8 L12 14 M7 11 L12 8 M12 8 L17 5 M12 14 L9 19 M12 14 L15 19",
    head: { cx: 12, cy: 5 },
    vibration: ["M16 3 L18 1", "M18 4 L20 3", "M19 6 L21 6"],
  },
  // Pose 5: Wide stance celebration
  {
    body: "M12 8 L12 14 M6 9 L12 8 M12 8 L18 9 M12 14 L7 20 M12 14 L17 20",
    head: { cx: 12, cy: 5 },
    vibration: ["M5 7 L3 5", "M19 7 L21 5", "M5 19 L3 21", "M19 19 L21 21"],
  },
];

function DancingFigure({
  pose,
  color,
  delay,
  energy,
  reduceMotion,
}: {
  pose: typeof DANCE_POSES[0];
  color: string;
  delay: number;
  energy: "low" | "medium" | "high" | "max";
  reduceMotion: boolean;
}) {
  const energyConfig = {
    low: { bounce: 2, rotate: 1, duration: 2, scale: 1.02 },
    medium: { bounce: 4, rotate: 3, duration: 1.5, scale: 1.05 },
    high: { bounce: 6, rotate: 5, duration: 1.2, scale: 1.08 },
    max: { bounce: 8, rotate: 8, duration: 0.8, scale: 1.12 },
  };

  const config = energyConfig[energy];

  const bounceAnimation = !reduceMotion
    ? {
        y: [0, -config.bounce, 0],
        rotate: [-config.rotate, config.rotate, -config.rotate],
        scale: [1, config.scale, 1],
        transition: {
          duration: config.duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }
    : {};

  const vibrateAnimation = !reduceMotion
    ? {
        opacity: [0.7, 1, 0.7],
        scale: [0.95, 1, 0.95],
        transition: {
          duration: config.duration * 0.7,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }
    : {};

  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={bounceAnimation}
      style={{ originX: 0.5, originY: 0.5 }}
    >
      {/* Vibration lines */}
      {pose.vibration.map((d, i) => (
        <motion.path
          key={`vibe-${i}`}
          d={d}
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          animate={vibrateAnimation}
        />
      ))}

      {/* Body */}
      <motion.path
        d={pose.body}
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Head */}
      <motion.circle
        cx={pose.head.cx}
        cy={pose.head.cy}
        r="2.5"
        stroke={color}
        strokeWidth="3.5"
        fill="none"
      />

      {/* Decorative dots around */}
      {!reduceMotion && energy !== "low" && (
        <>
          {[
            { x: 5, y: 12 },
            { x: 19, y: 12 },
            { x: 12, y: 20 },
          ].map((pos, i) => (
            <motion.circle
              key={`dot-${i}`}
              cx={pos.x}
              cy={pos.y}
              r="1.2"
              fill={color}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  delay: delay + i * 0.2,
                },
              }}
            />
          ))}
        </>
      )}
    </motion.svg>
  );
}

export function DancingPlushCrew({
  mood,
  reduceMotion,
  className,
  warmth,
  onAddWarmth,
  compact,
}: DancingPlushCrewProps) {
  const config = MOOD_CONFIG[mood];

  // Select poses for the crew
  const crewPoses = DANCE_POSES.slice(0, config.figureCount);

  // Debug: log mood changes
  console.log(
    "🎨 Dancing Plush Crew - Mood:",
    mood,
    "| Figures:",
    config.figureCount
  );
  
  // Compact mode: only show dancing figures without the full card
  if (compact) {
    return (
      <div className={className}>
        <div
          className={`flex gap-1 items-end justify-center ${ 
            config.figureCount === 1
              ? "w-10"
              : config.figureCount === 2
              ? "w-20"
              : config.figureCount === 3
              ? "w-28"
              : "w-40"
          }`}
        >
          {crewPoses.map((pose, i) => (
            <div key={i} className="w-8 h-8">
              <DancingFigure
                pose={pose}
                color={config.colors[i % config.colors.length]}
                delay={i * 0.15}
                energy={config.energy}
                reduceMotion={reduceMotion}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Main card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`relative rounded-[2rem] backdrop-blur p-2 border-[4px] shadow-card ${config.gradient} ${config.borderColor}`}
      >
        {/* Title */}
        <div className="text-center mb-1.5 relative z-10">
          <motion.div
            animate={
              !reduceMotion && config.energy === "max"
                ? {
                    scale: [1, 1.05, 1],
                    transition: { duration: 1.5, repeat: Infinity },
                  }
                : {}
            }
            className="text-sm font-black uppercase text-white drop-shadow-lg"
          >
            {config.energy === "low" && "Resting"}
            {config.energy === "medium" && "Warming Up"}
            {config.energy === "high" && "Dancing"}
            {config.energy === "max" && "Party Mode!"}
          </motion.div>
          <div className="text-[10px] font-semibold text-white/90">
            {config.message}
          </div>
        </div>

        {/* Dancing crew */}
        <div
          className={`relative rounded-[2rem] bg-white/20 backdrop-blur border-[4px] border-white/40 shadow-button p-2 mx-3 ${ // Added mx-3 for horizontal margin
            config.figureCount === 1
              ? "h-16" // Increased from h-12
              : config.figureCount === 2
              ? "h-18" // Increased from h-14
              : config.figureCount === 3
              ? "h-20" // Increased from h-16
              : "h-22" // Increased from h-18
          }`}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 rounded-[1.5rem] overflow-hidden">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  white 10px,
                  white 20px
                )`,
              }}
            />
          </div>

          {/* Figures grid */}
          <div
            className={`relative z-10 grid h-full ${
              config.figureCount === 1
                ? "grid-cols-1"
                : config.figureCount === 2
                ? "grid-cols-2"
                : config.figureCount === 3
                ? "grid-cols-3"
                : "grid-cols-5"
            } gap-2 items-center`}
          >
            {crewPoses.map((pose, i) => (
              <div key={i} className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-12"> {/* Reduced from w-16 h-16 */}
                  <DancingFigure
                    pose={pose}
                    color={config.colors[i % config.colors.length]}
                    delay={i * 0.15}
                    energy={config.energy}
                    reduceMotion={reduceMotion}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Energy indicator */}
        <div className="mt-2 flex justify-center gap-1.5">
          {[...Array(4)].map((_, i) => {
            const isActive =
              (config.energy === "low" && i === 0) ||
              (config.energy === "medium" && i <= 1) ||
              (config.energy === "high" && i <= 2) ||
              (config.energy === "max" && i <= 3);

            return (
              <motion.div
                key={i}
                animate={
                  isActive && !reduceMotion
                    ? {
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                        transition: {
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.1,
                        },
                      }
                    : {}
                }
                className={`w-2.5 h-2.5 rounded-full border-2 ${
                  isActive
                    ? "bg-white border-white shadow-button"
                    : "bg-transparent border-white/30"
                }`}
              />
            );
          })}
        </div>

        {/* Warmth Progress (if warmth is provided) */}
        {warmth !== undefined && (
          <div className="mt-2 pt-2 border-t-[3px] border-white/20 space-y-1.5">
            <div className="flex items-center justify-between text-white">
              <div className="text-[10px] font-bold uppercase opacity-90">
                {warmth < 20 && `${20 - warmth} to unlock 2nd dancer`}
                {warmth >= 20 && warmth < 60 && `${60 - warmth} to unlock 3rd dancer`}
                {warmth >= 60 && warmth < 120 && `${120 - warmth} to unlock party mode!`}
                {warmth >= 120 && "Maximum energy! 🔥"}
              </div>
              <div className="text-lg font-black">{warmth}</div>
            </div>
            
            {/* Progress bar */}
            <div className="relative h-2.5 rounded-full bg-white/20 border-[2px] border-white/30 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min((warmth / 120) * 100, 100)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            
            {/* Milestone labels */}
            <div className="flex justify-between text-[9px] font-bold text-white/60">
              <span>0</span>
              <span>20</span>
              <span>60</span>
              <span>120</span>
            </div>

            {/* Test buttons (only if onAddWarmth is provided) */}
            {onAddWarmth && (
              <div className="flex gap-1.5 pt-1.5">
                <button
                  onClick={() => onAddWarmth(5)}
                  className="flex-1 py-1 px-2.5 rounded-xl bg-white/20 hover:bg-white/30 border-[2px] border-white/40 text-white text-[10px] font-bold uppercase transition-colors"
                >
                  +5
                </button>
                <button
                  onClick={() => onAddWarmth(30)}
                  className="flex-1 py-1 px-2.5 rounded-xl bg-white/20 hover:bg-white/30 border-[2px] border-white/40 text-white text-[10px] font-bold uppercase transition-colors"
                >
                  +30
                </button>
                <button
                  onClick={() => onAddWarmth(-10)}
                  className="flex-1 py-1 px-2.5 rounded-xl bg-white/20 hover:bg-white/30 border-[2px] border-white/40 text-white text-[10px] font-bold uppercase transition-colors"
                >
                  -10
                </button>
              </div>
            )}
          </div>
        )}

        {/* Sparkles for max energy */}
        {config.energy === "max" && !reduceMotion && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
            {[...Array(12)].map((_, i) => {
              const x = Math.random() * 100;
              const y = Math.random() * 100;
              const delay = Math.random() * 2;

              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ left: `${x}%`, top: `${y}%` }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                    rotate: [0, 180, 360],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      delay,
                    },
                  }}
                >
                  <div className="w-2 h-2 bg-white rounded-full shadow-glow" />
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}