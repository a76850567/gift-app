/**
 * Decorated Card Wrapper
 * White cards with colorful gradient borders and decorative patterns
 */

import React from "react";
import { Card } from "../framework";
import { CardDecorations } from "./CardDecorations";

type DecoratedCardProps = {
  children: React.ReactNode;
  variant?: "default" | "rainbow" | "glow" | "fire" | "mint" | "peach" | "lavender" | "lime";
  className?: string;
  onClick?: () => void;
  decorations?: boolean;
  decorationPattern?: "hearts" | "stars" | "butterflies" | "diamonds" | "flowers" | "mixed";
  decorationDensity?: "low" | "medium" | "high";
};

export function DecoratedCard({
  children,
  variant = "default",
  className,
  onClick,
  decorations = true,
  decorationPattern = "mixed",
  decorationDensity = "medium",
}: DecoratedCardProps) {
  return (
    <Card variant={variant} className={className} onClick={onClick}>
      {decorations && (
        <CardDecorations 
          pattern={decorationPattern} 
          density={decorationDensity} 
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </Card>
  );
}
