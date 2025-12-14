/**
 * Framework Layout Components
 * Reusable layout components for app structure
 */

import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../utils";
import type { Route } from "../types";

// ==================== Shell ====================

type ShellProps = {
  children: React.ReactNode;
  className?: string;
  background?: string;
};

export function Shell({ children, className, background }: ShellProps) {
  return (
    <div
      className={cn(
        "min-h-screen text-black relative",
        background || "bg-gradient-to-br from-[#E5F0FF] via-[#E5F9FF] via-[#E5EFFF] to-[#F0E5FF]",
        className
      )}
    >
      <div className="max-w-md mx-auto px-4 pt-4 pb-16 relative z-10">{children}</div> {/* max-w-md = 448px for mobile */}
    </div>
  );
}

// ==================== Page Header ====================

type PageHeaderProps = {
  subtitle?: string;
  title: string;
  action?: React.ReactNode;
  badges?: React.ReactNode;
  className?: string;
};

export function PageHeader({
  subtitle,
  title,
  action,
  badges,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-3", className)}>
      <div className="min-w-0 flex-1">
        {subtitle && <div className="text-xs text-black/60">{subtitle}</div>}
        <div className="text-xl font-semibold">{title}</div>
      </div>
      {(action || badges) && (
        <div className="flex flex-col items-end gap-2">
          {badges}
          {action}
        </div>
      )}
    </div>
  );
}

// ==================== Bottom Navigation ====================

type BottomNavProps = {
  routes: Route[];
  className?: string;
  onAddGoal?: () => void;
};

export function BottomNav({ routes, className, onAddGoal }: BottomNavProps) {
  const linkBase = "flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all font-bold uppercase text-[10px] tracking-wider";
  const active = "gradient-rainbow-animated text-white border-[2px] border-white shadow-button";
  const idle = "text-black/70 hover:bg-white/50 border-[2px] border-transparent";

  // Split routes into two groups for the center button
  const halfIndex = Math.ceil(routes.length / 2);
  const leftRoutes = routes.slice(0, halfIndex);
  const rightRoutes = routes.slice(halfIndex);

  return (
    <div className={cn("fixed bottom-0 left-0 right-0 z-40", className)}>
      <div className="max-w-md mx-auto px-4 pb-2"> {/* Changed from max-w-3xl to max-w-md */}
        <nav className="rounded-[1.5rem] border-[3px] border-black/20 bg-white/90 backdrop-blur shadow-card p-2 flex justify-between items-center">
          {/* Left Routes */}
          <div className="flex gap-1">
            {leftRoutes.map((route) => {
              const IconComponent = route.icon;
              return (
                <NavLink
                  key={route.path}
                  to={route.path}
                  end={route.path === "/"}
                  className={({ isActive }) => cn(linkBase, isActive ? active : idle)}
                >
                  {({ isActive }) => (
                    <>
                      <IconComponent size={20} isActive={isActive} />
                      <span>{route.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Center Add Button */}
          {onAddGoal && (
            <button
              onClick={onAddGoal}
              className="relative flex items-center justify-center w-14 h-14 rounded-full gradient-rainbow-animated border-[4px] border-white shadow-button hover:scale-110 active:scale-95 transition-transform -mt-8"
              aria-label="Create new goal"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          )}

          {/* Right Routes */}
          <div className="flex gap-1">
            {rightRoutes.map((route) => {
              const IconComponent = route.icon;
              return (
                <NavLink
                  key={route.path}
                  to={route.path}
                  end={route.path === "/"}
                  className={({ isActive }) => cn(linkBase, isActive ? active : idle)}
                >
                  {({ isActive }) => (
                    <>
                      <IconComponent size={20} isActive={isActive} />
                      <span>{route.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}

// ==================== Top Navigation ====================

type TopNavProps = {
  title?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
};

export function TopNav({ title, left, right, className }: TopNavProps) {
  return (
    <div
      className={cn(
        "sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-black/10",
        className
      )}
    >
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between"> {/* Changed from max-w-3xl to max-w-md */}
        <div className="flex items-center gap-3">
          {left}
          {title && <h1 className="text-lg font-semibold">{title}</h1>}
        </div>
        {right && <div>{right}</div>}
      </div>
    </div>
  );
}

// ==================== Section ====================

type SectionProps = {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function Section({
  title,
  description,
  action,
  children,
  className,
}: SectionProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {(title || description || action) && (
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
            {description && (
              <p className="text-sm text-black/60 mt-1">{description}</p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

// ==================== Sidebar Layout ====================

type SidebarLayoutProps = {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  sidebarWidth?: "sm" | "md" | "lg";
  className?: string;
};

export function SidebarLayout({
  sidebar,
  children,
  sidebarWidth = "md",
  className,
}: SidebarLayoutProps) {
  const widths = {
    sm: "w-48",
    md: "w-64",
    lg: "w-80",
  };

  return (
    <div className={cn("flex gap-6", className)}>
      <aside className={cn("flex-shrink-0", widths[sidebarWidth])}>
        {sidebar}
      </aside>
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}

// ==================== Stack ====================

type StackProps = {
  children: React.ReactNode;
  gap?: 2 | 3 | 4 | 6 | 8;
  direction?: "vertical" | "horizontal";
  align?: "start" | "center" | "end" | "stretch";
  className?: string;
};

export function Stack({
  children,
  gap = 4,
  direction = "vertical",
  align = "stretch",
  className,
}: StackProps) {
  const gapMap = {
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
  };

  const alignMap = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  return (
    <div
      className={cn(
        "flex",
        direction === "vertical" ? "flex-col" : "flex-row",
        gapMap[gap],
        alignMap[align],
        className
      )}
    >
      {children}
    </div>
  );
}

// ==================== Spacer ====================

export function Spacer({ size = 4 }: { size?: 2 | 4 | 6 | 8 | 12 }) {
  const sizeMap = {
    2: "h-2",
    4: "h-4",
    6: "h-6",
    8: "h-8",
    12: "h-12",
  };

  return <div className={sizeMap[size]} />;
}