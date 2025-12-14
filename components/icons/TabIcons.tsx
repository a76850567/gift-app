/**
 * Tab Bar Icons - Keith Haring Style
 * Custom animated icons for each tab
 */

import React from "react";
import { motion } from "framer-motion";
import { DancingPersonIcon } from "./DancingPersonIcon";

type IconProps = {
  size?: number;
  isActive?: boolean;
};

// ==================== Today Icon ====================
export function TodayIcon({ size = 24, isActive = false }: IconProps) {
  return (
    <DancingPersonIcon 
      size={size} 
      animated={isActive} 
      pose="jump"
      color={isActive ? "currentColor" : "#000"}
    />
  );
}

// ==================== Moments Icon ====================
export function MomentsIcon({ size = 24, isActive = false }: IconProps) {
  const cameraPath = "M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z";
  
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Camera body - Keith Haring style */}
      <motion.rect
        x="3"
        y="6"
        width="18"
        height="13"
        rx="2"
        stroke={isActive ? "currentColor" : "#000"}
        strokeWidth="3"
        fill="none"
        animate={isActive ? {
          rotate: [-2, 2, -2],
          transition: { duration: 0.6, repeat: Infinity },
        } : {}}
      />
      
      {/* Lens */}
      <motion.circle
        cx="12"
        cy="13"
        r="4"
        stroke={isActive ? "currentColor" : "#000"}
        strokeWidth="2.5"
        fill="none"
        animate={isActive ? {
          scale: [1, 1.1, 1],
          transition: { duration: 0.8, repeat: Infinity },
        } : {}}
      />
      
      {/* Flash */}
      <motion.rect
        x="16"
        y="3"
        width="3"
        height="2"
        rx="1"
        fill={isActive ? "currentColor" : "#000"}
        animate={isActive ? {
          opacity: [1, 0.3, 1],
          transition: { duration: 0.5, repeat: Infinity },
        } : {}}
      />
      
      {/* Sparkle dots */}
      {isActive && (
        <>
          <motion.circle
            cx="6"
            cy="10"
            r="1"
            fill="currentColor"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
              transition: { duration: 0.7, repeat: Infinity, delay: 0 },
            }}
          />
          <motion.circle
            cx="18"
            cy="16"
            r="1"
            fill="currentColor"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
              transition: { duration: 0.7, repeat: Infinity, delay: 0.3 },
            }}
          />
        </>
      )}
    </svg>
  );
}

// ==================== Space Icon (替代 Room) ====================
export function SpaceIcon({ size = 24, isActive = false }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Planet */}
      <motion.circle
        cx="12"
        cy="12"
        r="6"
        stroke={isActive ? "currentColor" : "#000"}
        strokeWidth="3"
        fill="none"
        animate={isActive ? {
          scale: [1, 1.08, 1],
          transition: { duration: 2, repeat: Infinity },
        } : {}}
      />
      
      {/* Ring around planet */}
      <motion.ellipse
        cx="12"
        cy="12"
        rx="9"
        ry="3"
        stroke={isActive ? "currentColor" : "#000"}
        strokeWidth="2.5"
        fill="none"
        animate={isActive ? {
          rotate: [0, 360],
          transition: { duration: 8, repeat: Infinity, ease: "linear" },
        } : {}}
      />
      
      {/* Small orbiting creatures */}
      {isActive && (
        <>
          {[0, 120, 240].map((angle, i) => (
            <motion.circle
              key={`creature-${i}`}
              cx="12"
              cy="12"
              r="1.5"
              fill="currentColor"
              animate={{
                x: Math.cos((angle * Math.PI) / 180) * 8,
                y: Math.sin((angle * Math.PI) / 180) * 8,
                rotate: [0, 360],
              }}
              transition={{
                x: { duration: 3, repeat: Infinity, ease: "linear" },
                y: { duration: 3, repeat: Infinity, ease: "linear" },
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              }}
            />
          ))}
        </>
      )}
      
      {/* Stars */}
      {isActive && (
        <>
          {[{ x: 3, y: 5 }, { x: 21, y: 7 }, { x: 5, y: 19 }].map((pos, i) => (
            <motion.circle
              key={`star-${i}`}
              cx={pos.x}
              cy={pos.y}
              r="1"
              fill="currentColor"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
        </>
      )}
    </svg>
  );
}

// ==================== Me Icon (替代 Settings) ====================
export function MeIcon({ size = 24, isActive = false }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Head */}
      <motion.circle
        cx="12"
        cy="8"
        r="4"
        stroke={isActive ? "currentColor" : "#000"}
        strokeWidth="3"
        fill="none"
        animate={isActive ? {
          y: [-1, 1, -1],
          transition: { duration: 1.5, repeat: Infinity },
        } : {}}
      />
      
      {/* Body - Keith Haring style */}
      <motion.path
        d="M12 12 C12 12, 8 14, 8 18 L8 20 M12 12 C12 12, 16 14, 16 18 L16 20"
        stroke={isActive ? "currentColor" : "#000"}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        animate={isActive ? {
          y: [-1, 1, -1],
          transition: { duration: 1.5, repeat: Infinity, delay: 0.1 },
        } : {}}
      />
      
      {/* Arms */}
      <motion.path
        d="M8 14 L5 12 M16 14 L19 12"
        stroke={isActive ? "currentColor" : "#000"}
        strokeWidth="3"
        strokeLinecap="round"
        animate={isActive ? {
          rotate: [-5, 5, -5],
          transition: { duration: 0.8, repeat: Infinity },
        } : {}}
        style={{ transformOrigin: "12px 14px" }}
      />
      
      {/* Heart on chest */}
      {isActive && (
        <motion.path
          d="M12 15.5 L11 14.7 C10.5 14.3 10.2 14 10.2 13.6 C10.2 13.2 10.5 12.9 10.9 12.9 C11.1 12.9 11.3 13 11.4 13.2 L12 13.8 L12.6 13.2 C12.7 13 12.9 12.9 13.1 12.9 C13.5 12.9 13.8 13.2 13.8 13.6 C13.8 14 13.5 14.3 13 14.7 L12 15.5 Z"
          fill="currentColor"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
          }}
        />
      )}
      
      {/* Sparkles around */}
      {isActive && (
        <>
          {[{ x: 6, y: 6 }, { x: 18, y: 6 }].map((pos, i) => (
            <motion.circle
              key={`sparkle-${i}`}
              cx={pos.x}
              cy={pos.y}
              r="1"
              fill="currentColor"
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </>
      )}
    </svg>
  );
}