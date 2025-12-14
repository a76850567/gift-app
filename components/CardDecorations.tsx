/**
 * Card Decorations Component
 * Colorful scattered patterns on white cards (hearts, stars, butterflies, diamonds, flowers)
 */

import React from "react";
import { motion } from "motion/react";

type DecorationPattern = "hearts" | "stars" | "butterflies" | "diamonds" | "flowers" | "mixed";

type CardDecorationsProps = {
  pattern?: DecorationPattern;
  density?: "low" | "medium" | "high";
};

const COLORS = [
  "#FF1B7D", // Hot Pink - 更饱和
  "#FF6B4A", // Coral - 更饱和
  "#FFD700", // Gold - 更饱和
  "#00E676", // Bright Green - 更饱和
  "#2196F3", // Bright Blue - 更饱和
  "#9C27B0", // Purple - 更饱和
  "#FF4757", // Fire Red
  "#C7EA46", // Lime
];

export function CardDecorations({ 
  pattern = "mixed", 
  density = "medium" 
}: CardDecorationsProps) {
  const densityCount = {
    low: 12,      // 增加数量: 8 → 12
    medium: 20,   // 增加数量: 15 → 20
    high: 35,     // 增加数量: 25 → 35
  };

  const count = densityCount[density];

  // Generate random decorations
  const decorations = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const patterns = pattern === "mixed" 
        ? ["heart", "star", "butterfly", "diamond", "flower"]
        : [pattern.replace("s", "")]; // Remove plural
      
      const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
      const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      const randomX = Math.random() * 100;
      const randomY = Math.random() * 100;
      const randomSize = 16 + Math.random() * 20; // 增加尺寸: 12-24px → 16-36px
      const randomRotation = Math.random() * 360;
      const randomDelay = Math.random() * 2;

      return {
        id: i,
        pattern: randomPattern,
        color: randomColor,
        x: randomX,
        y: randomY,
        size: randomSize,
        rotation: randomRotation,
        delay: randomDelay,
      };
    });
  }, [count, pattern]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem] opacity-40">
      {decorations.map((deco) => (
        <motion.div
          key={deco.id}
          className="absolute drop-shadow-md"
          style={{
            left: `${deco.x}%`,
            top: `${deco.y}%`,
            color: deco.color,
          }}
          initial={{ 
            rotate: deco.rotation,
            scale: 0,
          }}
          animate={{ 
            rotate: deco.rotation + 360,
            scale: 1,
          }}
          transition={{
            rotate: {
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 0.5,
              delay: deco.delay,
              ease: "backOut",
            },
          }}
        >
          <DecorationIcon pattern={deco.pattern} size={deco.size} />
        </motion.div>
      ))}
    </div>
  );
}

function DecorationIcon({ pattern, size }: { pattern: string; size: number }) {
  switch (pattern) {
    case "heart":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      );
    
    case "star":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    
    case "butterfly":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3c-.55 0-1 .45-1 1v1.5c-1.25.2-2.45.65-3.5 1.35C6.15 5.9 4.65 5 3 5 1.35 5 0 6.35 0 8s1.35 3 3 3c.85 0 1.6-.35 2.15-.9.45.6 1 1.1 1.6 1.5L5 14c-.55.55-.55 1.45 0 2l2 2c.55.55 1.45.55 2 0l3-3 3 3c.55.55 1.45.55 2 0l2-2c.55-.55.55-1.45 0-2l-1.75-2.4c.6-.4 1.15-.9 1.6-1.5.55.55 1.3.9 2.15.9 1.65 0 3-1.35 3-3s-1.35-3-3-3c-1.65 0-3.15.9-4.5 1.85-1.05-.7-2.25-1.15-3.5-1.35V4c0-.55-.45-1-1-1z" />
        </svg>
      );
    
    case "diamond":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 15 10-15L12 2zm0 3.84L18.93 9H5.07L12 5.84z" />
        </svg>
      );
    
    case "flower":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="5" r="2.5" />
          <circle cx="12" cy="19" r="2.5" />
          <circle cx="5" cy="12" r="2.5" />
          <circle cx="19" cy="12" r="2.5" />
          <circle cx="7.5" cy="7.5" r="2" />
          <circle cx="16.5" cy="7.5" r="2" />
          <circle cx="7.5" cy="16.5" r="2" />
          <circle cx="16.5" cy="16.5" r="2" />
        </svg>
      );
    
    default:
      return null;
  }
}