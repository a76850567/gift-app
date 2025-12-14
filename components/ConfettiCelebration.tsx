/**
 * Confetti Celebration Component
 * Colorful confetti explosion animation when tasks are completed
 */

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

type ConfettiCelebrationProps = {
  trigger: boolean; // Set to true to trigger animation
  onComplete?: () => void;
};

const COLORS = [
  "#FF6B9D", // Hot Pink
  "#FFA07A", // Coral
  "#FFD93D", // Sunshine Yellow
  "#6BCF7F", // Mint Green
  "#4D9FFF", // Sky Blue
  "#B078FF", // Lavender Purple
  "#FF4757", // Fire Red
  "#C7EA46", // Lime
];

type Particle = {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  shape: "rect" | "circle";
  size: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
};

export function ConfettiCelebration({ trigger, onComplete }: ConfettiCelebrationProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (trigger && !isActive) {
      setIsActive(true);
      
      // Generate particles
      const newParticles: Particle[] = [];
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const velocity = 200 + Math.random() * 200;
        
        newParticles.push({
          id: i,
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          rotation: Math.random() * 360,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: Math.random() > 0.5 ? "rect" : "circle",
          size: 8 + Math.random() * 12,
          velocityX: Math.cos(angle) * velocity,
          velocityY: Math.sin(angle) * velocity - 100, // Upward bias
          rotationSpeed: (Math.random() - 0.5) * 720,
        });
      }

      setParticles(newParticles);

      // Clear after animation
      setTimeout(() => {
        setParticles([]);
        setIsActive(false);
        onComplete?.();
      }, 3000);
    }
  }, [trigger, isActive, onComplete]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: particle.shape === "circle" ? "50%" : "2px",
          }}
          initial={{
            x: 0,
            y: 0,
            rotate: particle.rotation,
            opacity: 1,
          }}
          animate={{
            x: particle.velocityX,
            y: particle.velocityY + 500, // Fall down with gravity
            rotate: particle.rotation + particle.rotationSpeed,
            opacity: 0,
          }}
          transition={{
            duration: 2.5,
            ease: [0.17, 0.67, 0.83, 0.67], // Custom ease for natural fall
            opacity: {
              duration: 2.5,
              ease: "easeIn",
            },
          }}
        />
      ))}
    </div>
  );
}

// Simpler confetti burst from a specific position
type ConfettiBurstProps = {
  x: number;
  y: number;
  trigger: boolean;
  onComplete?: () => void;
};

export function ConfettiBurst({ x, y, trigger, onComplete }: ConfettiBurstProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles: Particle[] = [];
      const particleCount = 30;

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 150 + Math.random() * 100;
        
        newParticles.push({
          id: i,
          x: x,
          y: y,
          rotation: Math.random() * 360,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: Math.random() > 0.6 ? "rect" : "circle",
          size: 6 + Math.random() * 8,
          velocityX: Math.cos(angle) * velocity,
          velocityY: Math.sin(angle) * velocity,
          rotationSpeed: (Math.random() - 0.5) * 540,
        });
      }

      setParticles(newParticles);

      setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 2000);
    }
  }, [trigger, x, y, onComplete]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: particle.shape === "circle" ? "50%" : "2px",
          }}
          initial={{
            x: 0,
            y: 0,
            rotate: particle.rotation,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: particle.velocityX,
            y: particle.velocityY + 300,
            rotate: particle.rotation + particle.rotationSpeed,
            opacity: 0,
            scale: 0.3,
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
