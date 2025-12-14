/**
 * Dopamine Button - With Heart and Flame Icons
 * Special buttons with animated heart/flame icons
 */

import React from "react";
import { motion } from "framer-motion";
import { HeartIcon } from "./icons/HeartIcon";
import { FlameIcon } from "./icons/FlameIcon";
import { cn } from "../framework";

type DopamineButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "heart" | "fire" | "heart-fire";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
};

export function DopamineButton({
  children,
  onClick,
  variant = "heart",
  size = "md",
  disabled = false,
  fullWidth = false,
  className,
}: DopamineButtonProps) {
  const sizes = {
    sm: { padding: "px-4 py-2", text: "text-sm", icon: 16 },
    md: { padding: "px-6 py-3", text: "text-base", icon: 20 },
    lg: { padding: "px-8 py-4", text: "text-lg", icon: 24 },
  };

  const variants = {
    heart: {
      gradient: "bg-gradient-to-br from-[var(--hot-pink)] to-[var(--coral)]",
      border: "border-[var(--hot-pink)]",
      icon: <HeartIcon size={sizes[size].icon} variant="default" animated />,
    },
    fire: {
      gradient: "bg-gradient-to-br from-[var(--fire-red)] via-[var(--fire-orange)] to-[var(--fire-yellow)]",
      border: "border-[var(--fire-red)]",
      icon: <FlameIcon size={sizes[size].icon} variant="intense" animated />,
    },
    "heart-fire": {
      gradient: "bg-gradient-to-br from-[var(--fire-red)] via-[var(--fire-orange)] to-[var(--hot-pink)]",
      border: "border-[var(--fire-red)]",
      icon: (
        <div className="relative inline-block">
          <HeartIcon size={sizes[size].icon} variant="fire" animated />
          <div className="absolute -top-1 -right-1">
            <FlameIcon size={sizes[size].icon * 0.6} variant="multi" animated />
          </div>
        </div>
      ),
    },
  };

  const config = variants[variant];

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.98, y: 2 }}
      className={cn(
        "rounded-[var(--radius)] font-bold uppercase tracking-wider text-white",
        "border-[4px] shadow-button transition-all",
        "flex items-center justify-center gap-3",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
        config.gradient,
        config.border,
        sizes[size].padding,
        sizes[size].text,
        fullWidth && "w-full",
        className
      )}
    >
      {config.icon}
      <span>{children}</span>
    </motion.button>
  );
}