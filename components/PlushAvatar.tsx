/**
 * Plush Avatar Component - DOPAMINE EDITION
 * Animated avatar with fire effects at max level
 */

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles, Flame } from "lucide-react";
import { cn } from "../framework";
import type { PlushMood } from "../types/gift";

type PlushAvatarProps = {
  mood: PlushMood;
  reduceMotion: boolean;
  className?: string;
};

const MOOD_DATA: Record<
  PlushMood,
  {
    eyes: string;
    mouth: string;
    message: string;
    gradient: string;
    borderColor: string;
    stars: number;
    glow: boolean;
    fire: boolean;
  }
> = {
  sleepy: {
    eyes: "•  •",
    mouth: "﹏",
    message: "Take it easy.",
    gradient: "bg-gradient-to-br from-gray-200 to-gray-300",
    borderColor: "border-gray-400",
    stars: 2,
    glow: false,
    fire: false,
  },
  calm: {
    eyes: "•  •",
    mouth: "ᴗ",
    message: "I'm here.",
    gradient: "bg-gradient-to-br from-[var(--tangerine)] to-[var(--sunshine)]",
    borderColor: "border-[var(--tangerine)]",
    stars: 5,
    glow: false,
    fire: false,
  },
  happy: {
    eyes: "˘  ˘",
    mouth: "ᴗ",
    message: "I'm proud of you.",
    gradient: "bg-gradient-to-br from-[var(--hot-pink)] to-[var(--coral)]",
    borderColor: "border-[var(--hot-pink)]",
    stars: 8,
    glow: true,
    fire: false,
  },
  spark: {
    eyes: "✦  ✦",
    mouth: "ᴗ",
    message: "You're glowing! 🔥",
    gradient: "gradient-fire-animated",
    borderColor: "border-[var(--fire-red)]",
    stars: 12,
    glow: true,
    fire: true,
  },
};

function StarField({ count, fire }: { count: number; fire: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
      {Array.from({ length: count }).map((_, i) => {
        const size = Math.random() * 8 + 4;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = Math.random() * 2 + 2;

        return (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
            }}
          >
            {fire ? (
              <Flame
                size={size}
                className="text-[var(--fire-yellow)] sparkle"
                style={{ animationDuration: `${duration}s` }}
              />
            ) : (
              <Sparkles
                size={size}
                className="text-yellow-300 sparkle"
                style={{ animationDuration: `${duration}s` }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function PlushAvatar({ mood, reduceMotion, className }: PlushAvatarProps) {
  const data = MOOD_DATA[mood];

  return (
    <div className={cn("relative", className)}>
      {/* Glow aura */}
      {data.glow && (
        <div
          className={cn(
            "absolute -inset-6 rounded-[3rem] blur-3xl opacity-50",
            data.fire ? "gradient-fire-animated" : data.gradient
          )}
        />
      )}

      {/* Main card */}
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={
          reduceMotion
            ? undefined
            : {
                duration: data.fire ? 2 : 3,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className={cn(
          "relative rounded-[2.5rem] backdrop-blur p-6",
          "border-[5px] shadow-card",
          data.gradient,
          data.borderColor,
          data.fire && "glow"
        )}
      >
        {/* Star field */}
        <StarField count={data.stars} fire={data.fire} />

        {/* Header */}
        <div className="flex items-center gap-4 relative z-10">
          <motion.div
            animate={
              reduceMotion || !data.fire
                ? undefined
                : {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }
            }
            transition={
              reduceMotion || !data.fire
                ? undefined
                : {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            className={cn(
              "h-20 w-20 rounded-[2rem] flex items-center justify-center",
              "border-[4px] shadow-button",
              data.fire
                ? "bg-white border-white"
                : "bg-white/80 border-white/50"
            )}
          >
            {data.fire ? (
              <Flame className="text-[var(--fire-red)]" size={40} />
            ) : (
              <Heart className="text-[var(--hot-pink)]" size={36} />
            )}
          </motion.div>

          <div className="flex-1">
            <div
              className={cn(
                "text-3xl font-black uppercase leading-none",
                data.fire ? "text-white" : "text-black"
              )}
            >
              Plush
            </div>
            <div
              className={cn(
                "mt-2 font-semibold",
                data.fire ? "text-white/90" : "text-black/80"
              )}
            >
              {data.message}
            </div>
          </div>
        </div>

        {/* Face */}
        <div
          className={cn(
            "mt-6 rounded-[1.5rem] p-6 text-center relative z-10",
            "border-[3px] shadow-button",
            data.fire
              ? "bg-white/20 border-white/40 backdrop-blur"
              : "bg-black/5 border-black/10"
          )}
        >
          <motion.div
            animate={
              reduceMotion || !data.fire
                ? undefined
                : {
                    scale: [1, 1.1, 1],
                  }
            }
            transition={
              reduceMotion || !data.fire
                ? undefined
                : {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            className={cn(
              "text-4xl tracking-widest font-bold",
              data.fire ? "text-white" : "text-black/90"
            )}
          >
            {data.eyes}
          </motion.div>
          <div
            className={cn(
              "text-2xl mt-2 font-bold",
              data.fire ? "text-white" : "text-black/80"
            )}
          >
            {data.mouth}
          </div>
        </div>

        {/* Fire particles (only for spark level) */}
        {data.fire && !reduceMotion && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem]">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bottom-0"
                initial={{ y: 0, x: `${Math.random() * 100}%`, opacity: 1 }}
                animate={{
                  y: -200,
                  x: `${Math.random() * 100}%`,
                  opacity: 0,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut",
                }}
              >
                <Flame
                  size={16}
                  className="text-[var(--fire-yellow)]"
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}