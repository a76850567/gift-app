/**
 * Swipe Card Component - DOPAMINE EDITION
 * Interactive swipeable task card with retro shadows
 */

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Check, Pause, Trash2, Sparkles } from "lucide-react";
import { cn, clamp, Button, Badge } from "../framework";
import type { Task } from "../types/gift";

type SwipeCardProps = {
  task: Task;
  onDone: () => void;
  onRest: () => void;
  onDelete: () => void;
  reduceMotion: boolean;
};

export function SwipeCard({
  task,
  onDone,
  onRest,
  onDelete,
  reduceMotion,
}: SwipeCardProps) {
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef<number | null>(null);

  const threshold = 110;
  const intent = x > 40 ? "done" : x < -40 ? "rest" : "none";

  function onPointerDown(e: React.PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    setDragging(true);
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging || startX.current == null) return;
    const dx = e.clientX - startX.current;
    setX(clamp(dx, -180, 180));
  }

  function finish(action?: "done" | "rest") {
    if (reduceMotion) {
      if (action === "done") onDone();
      if (action === "rest") onRest();
      setX(0);
      setDragging(false);
      startX.current = null;
      return;
    }

    if (action === "done") {
      setX(300);
      setTimeout(() => {
        onDone();
        setX(0);
      }, 200);
    } else if (action === "rest") {
      setX(-300);
      setTimeout(() => {
        onRest();
        setX(0);
      }, 200);
    } else {
      setX(0);
    }

    setDragging(false);
    startX.current = null;
  }

  function onPointerUp() {
    if (!dragging) return;
    if (x >= threshold) finish("done");
    else if (x <= -threshold) finish("rest");
    else finish();
  }

  return (
    <div>
      {/* Swipe background hints */}
      <div className="relative">
        <div className="absolute inset-0 rounded-[2rem] flex items-center justify-between px-8 pointer-events-none z-0">
          <motion.div
            animate={{ scale: intent === "rest" ? 1.1 : 0.9 }}
            className={cn(
              "flex items-center gap-3 transition-opacity font-bold uppercase",
              "bg-gradient-to-r from-[var(--coral)] to-[var(--tangerine)] text-white",
              "px-6 py-3 rounded-full border-[3px] border-[var(--coral)] shadow-button",
              intent === "rest" ? "opacity-100" : "opacity-30"
            )}
          >
            <Pause size={20} />
            <span>Rest</span>
          </motion.div>

          <motion.div
            animate={{ scale: intent === "done" ? 1.1 : 0.9 }}
            className={cn(
              "flex items-center gap-3 transition-opacity font-bold uppercase",
              "bg-gradient-to-r from-[var(--lime)] to-[var(--mint)] text-black",
              "px-6 py-3 rounded-full border-[3px] border-[var(--lime)] shadow-button",
              intent === "done" ? "opacity-100" : "opacity-30"
            )}
          >
            <Check size={20} />
            <span>Done</span>
          </motion.div>
        </div>

        {/* Draggable card */}
        <motion.div
          style={{ x }}
          transition={
            reduceMotion
              ? undefined
              : { type: "spring", stiffness: 500, damping: 35 }
          }
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className={cn(
            "relative rounded-[2rem] border-[4px] bg-white/95 backdrop-blur",
            "p-6 select-none touch-none cursor-grab active:cursor-grabbing",
            "shadow-card hover:shadow-[10px_10px_0px_rgba(0,0,0,0.15)]",
            "transition-shadow z-10",
            task.status === "done" && "border-[var(--lime)]",
            task.status === "rest" && "border-[var(--coral)]",
            task.status === "pending" && "border-black/20"
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="text-xl font-black uppercase leading-tight">
                {task.title}
              </div>
              {task.note && (
                <div className="text-black/70 mt-2 font-medium">{task.note}</div>
              )}
              <div className="mt-4 flex gap-2 flex-wrap">
                {task.status === "done" ? (
                  <Badge variant="success" sparkle>
                    <Check size={14} />
                    Done
                  </Badge>
                ) : task.status === "rest" ? (
                  <Badge variant="warning">
                    <Pause size={14} />
                    Rest
                  </Badge>
                ) : (
                  <Badge variant="neutral">
                    <Sparkles size={14} className="sparkle" />
                    Swipe Me
                  </Badge>
                )}
              </div>
            </div>
            <button
              onClick={onDelete}
              className={cn(
                "rounded-2xl p-3 transition-all",
                "bg-white border-[3px] border-black/20",
                "hover:border-[var(--fire-red)] hover:bg-[var(--fire-red)] hover:text-white",
                "shadow-button hover:shadow-[6px_6px_0px_rgba(0,0,0,0.25)]",
                "active:translate-y-[2px] active:shadow-[2px_2px_0px_rgba(0,0,0,0.25)]"
              )}
              aria-label="Delete task"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex gap-3">
        <Button variant="secondary" onClick={onRest} fullWidth size="lg">
          <Pause size={20} />
          Rest
        </Button>
        <Button variant="success" onClick={onDone} fullWidth size="lg" sparkle>
          <Check size={20} />
          Done
        </Button>
      </div>
    </div>
  );
}
