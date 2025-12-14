/**
 * Framework UI Components - DOPAMINE DESIGN SYSTEM
 * Retro vibrant components with hard shadows and gradients
 */

import React from "react";
import { cn } from "../utils";
import { Sparkles } from "lucide-react";

// ==================== Card ====================

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "rainbow" | "glow" | "fire" | "mint" | "peach" | "lavender" | "lime";
  decorations?: boolean; // Add decorative patterns
  decorationPattern?: "hearts" | "stars" | "butterflies" | "diamonds" | "flowers" | "mixed";
};

export function Card({
  children,
  className,
  onClick,
  variant = "default",
  decorations = false,
  decorationPattern = "hearts",
}: CardProps) {
  const variants = {
    default: "bg-white border-[4px] border-transparent shadow-card relative overflow-hidden",
    rainbow: "bg-white border-[4px] border-transparent shadow-card relative overflow-hidden",
    glow: "bg-white border-[4px] border-transparent shadow-card relative overflow-hidden",
    fire: "bg-white border-[4px] border-transparent shadow-card relative overflow-hidden",
    mint: "bg-white border-[4px] border-transparent shadow-card relative overflow-hidden",
    peach: "bg-white border-[4px] border-transparent shadow-card relative overflow-hidden",
    lavender: "bg-white border-[4px] border-transparent shadow-card relative overflow-hidden",
    lime: "bg-white border-[4px] border-transparent shadow-card relative overflow-hidden",
  };

  // Border gradients for each variant
  const borderGradients = {
    default: "linear-gradient(135deg, #FF6B9D, #FFA07A, #FFD93D, #6BCF7F, #4D9FFF, #B078FF)",
    rainbow: "linear-gradient(90deg, #FF6B9D, #FFA07A, #FFD93D, #6BCF7F, #4D9FFF, #B078FF)",
    glow: "linear-gradient(135deg, #FF6B9D, #FFA07A)",
    fire: "linear-gradient(135deg, #FF6B9D, #FF4757)",
    mint: "linear-gradient(135deg, #6BCF7F, #4ECDC4)",
    peach: "linear-gradient(135deg, #FFA07A, #FFD93D)",
    lavender: "linear-gradient(135deg, #B078FF, #E893CF)",
    lime: "linear-gradient(135deg, #C7EA46, #6BCF7F)",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-[2rem] backdrop-blur p-6 transition-all",
        onClick && "cursor-pointer hover:translate-y-[-2px] active:translate-y-[2px]",
        variants[variant],
        className
      )}
      style={{
        backgroundImage: `${borderGradients[variant]}, white`,
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}
    >
      {children}
    </div>
  );
}

// ==================== Button ====================

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "rainbow" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  glow?: boolean;
  sparkle?: boolean;
};

export function Button({
  children,
  onClick,
  className,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  glow = false,
  sparkle = false,
}: ButtonProps) {
  const variants = {
    primary: "bg-gradient-to-br from-[var(--hot-pink)] to-[var(--coral)] text-white border-[var(--hot-pink)]",
    secondary: "bg-gradient-to-br from-[var(--tangerine)] to-[var(--sunshine)] text-black border-[var(--tangerine)]",
    rainbow: "gradient-rainbow-animated text-white border-white",
    ghost: "bg-white text-black border-black hover:bg-black/5",
    danger: "bg-gradient-to-br from-[var(--fire-red)] to-[var(--fire-orange)] text-white border-[var(--fire-red)]",
    success: "bg-gradient-to-br from-[var(--lime)] to-[var(--mint)] text-black border-[var(--lime)]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-[var(--radius)] font-bold uppercase tracking-wider",
        "border-[4px] shadow-button transition-all",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none",
        "hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,0.25)]",
        "active:translate-y-[2px] active:shadow-[2px_2px_0px_rgba(0,0,0,0.25)]",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        glow && "glow",
        className
      )}
    >
      <span className="inline-flex items-center gap-2 justify-center">
        {children}
        {sparkle && <Sparkles size={16} className="sparkle" />}
      </span>
    </button>
  );
}

// ==================== Input ====================

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

export function Input({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  error,
  disabled = false,
  required = false,
  className,
}: InputProps) {
  return (
    <label className={cn("block", className)}>
      {label && (
        <div className="text-sm font-semibold uppercase tracking-wider text-black/80 mb-2">
          {label}
          {required && <span className="text-[var(--fire-red)] ml-1">*</span>}
        </div>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={cn(
          "w-full rounded-[var(--radius)] border-[3px] bg-white px-5 py-3",
          "outline-none transition-all",
          "focus:border-[var(--hot-pink)] focus:shadow-[0_0_20px_var(--hot-pink)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error ? "border-[var(--fire-red)]" : "border-black/20"
        )}
      />
      {error && <div className="text-sm text-[var(--fire-red)] font-semibold mt-2 uppercase">{error}</div>}
    </label>
  );
}

// ==================== Textarea ====================

type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

export function Textarea({
  value,
  onChange,
  placeholder,
  label,
  rows = 4,
  error,
  disabled = false,
  required = false,
  className,
}: TextareaProps) {
  return (
    <label className={cn("block", className)}>
      {label && (
        <div className="text-sm font-semibold uppercase tracking-wider text-black/80 mb-2">
          {label}
          {required && <span className="text-[var(--fire-red)] ml-1">*</span>}
        </div>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        className={cn(
          "w-full rounded-[var(--radius)] border-[3px] bg-white px-5 py-3",
          "outline-none transition-all resize-none",
          "focus:border-[var(--hot-pink)] focus:shadow-[0_0_20px_var(--hot-pink)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error ? "border-[var(--fire-red)]" : "border-black/20"
        )}
      />
      {error && <div className="text-sm text-[var(--fire-red)] font-semibold mt-2 uppercase">{error}</div>}
    </label>
  );
}

// ==================== Select ====================

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
};

export function Select({
  value,
  onChange,
  options,
  label,
  placeholder,
  error,
  disabled = false,
  required = false,
  className,
}: SelectProps) {
  return (
    <label className={cn("block", className)}>
      {label && (
        <div className="text-sm font-semibold uppercase tracking-wider text-black/80 mb-2">
          {label}
          {required && <span className="text-[var(--fire-red)] ml-1">*</span>}
        </div>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        className={cn(
          "w-full rounded-[var(--radius)] border-[3px] bg-white px-5 py-3",
          "outline-none transition-all",
          "focus:border-[var(--hot-pink)] focus:shadow-[0_0_20px_var(--hot-pink)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          error ? "border-[var(--fire-red)]" : "border-black/20"
        )}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="text-sm text-[var(--fire-red)] font-semibold mt-2 uppercase">{error}</div>}
    </label>
  );
}

// ==================== Checkbox ====================

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
};

export function Checkbox({
  checked,
  onChange,
  label,
  disabled = false,
  className,
}: CheckboxProps) {
  return (
    <label className={cn("flex items-center gap-3 cursor-pointer", className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="h-6 w-6 rounded-lg cursor-pointer disabled:opacity-50 accent-[var(--hot-pink)]"
      />
      {label && <span className="text-black/80 font-medium">{label}</span>}
    </label>
  );
}

// ==================== Badge ====================

type BadgeProps = {
  children: React.ReactNode;
  variant?: "neutral" | "success" | "warning" | "danger" | "info" | "rainbow";
  size?: "sm" | "md";
  className?: string;
  sparkle?: boolean;
};

export function Badge({
  children,
  variant = "neutral",
  size = "md",
  className,
  sparkle = false,
}: BadgeProps) {
  const variants = {
    neutral: "bg-black/10 text-black border-black/20",
    success: "bg-gradient-to-r from-[var(--lime)] to-[var(--mint)] text-black border-[var(--lime)]",
    warning: "bg-gradient-to-r from-[var(--coral)] to-[var(--tangerine)] text-white border-[var(--coral)]",
    danger: "bg-gradient-to-r from-[var(--fire-red)] to-[var(--fire-orange)] text-white border-[var(--fire-red)]",
    info: "bg-gradient-to-r from-[var(--sky)] to-[var(--lavender)] text-white border-[var(--sky)]",
    rainbow: "gradient-rainbow-animated text-white border-white",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-wider",
        "border-[2px] shadow-[2px_2px_0px_rgba(0,0,0,0.2)]",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
      {sparkle && <Sparkles size={12} className="sparkle" />}
    </span>
  );
}

// ==================== Divider ====================

export function Divider({ className }: { className?: string }) {
  return <div className={cn("border-t-[3px] border-black/10 my-6", className)} />;
}

// ==================== Empty State ====================

type EmptyStateProps = {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn("text-center py-12", className)}>
      {icon && <div className="flex justify-center mb-4 text-black/20">{icon}</div>}
      <div className="text-xl font-bold uppercase text-black/70">{title}</div>
      {description && <div className="text-sm text-black/50 mt-2">{description}</div>}
      {action && (
        <div className="mt-6">
          <Button onClick={action.onClick} variant="ghost">
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}

// ==================== Loading ====================

type LoadingProps = {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
};

export function Loading({ size = "md", text, className }: LoadingProps) {
  const sizes = {
    sm: "h-6 w-6 border-3",
    md: "h-12 w-12 border-4",
    lg: "h-16 w-16 border-[6px]",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div
        className={cn(
          "animate-spin rounded-full",
          "border-black/20 border-t-[var(--hot-pink)]",
          sizes[size]
        )}
      />
      {text && <div className="text-sm font-semibold uppercase text-black/60">{text}</div>}
    </div>
  );
}

// ==================== Modal ====================

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg";
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
}: ModalProps) {
  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bounce-in">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full rounded-[2rem] bg-white shadow-card border-[4px] border-black",
          sizes[size]
        )}
      >
        {title && (
          <div className="border-b-[3px] border-black/10 px-6 py-4">
            <h2 className="text-2xl font-black uppercase">{title}</h2>
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
        {footer && (
          <div className="border-t-[3px] border-black/10 px-6 py-4">{footer}</div>
        )}
      </div>
    </div>
  );
}

// ==================== Container ====================

export function Container({
  children,
  className,
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const sizes = {
    sm: "max-w-2xl",
    md: "max-w-3xl",
    lg: "max-w-5xl",
    xl: "max-w-7xl",
  };

  return (
    <div className={cn("mx-auto px-4", sizes[size], className)}>
      {children}
    </div>
  );
}

// ==================== Grid ====================

export function Grid({
  children,
  cols = 1,
  gap = 4,
  className,
}: {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 2 | 3 | 4 | 6 | 8;
  className?: string;
}) {
  const colsMap = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  const gapMap = {
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
  };

  return (
    <div className={cn("grid", colsMap[cols], gapMap[gap], className)}>
      {children}
    </div>
  );
}