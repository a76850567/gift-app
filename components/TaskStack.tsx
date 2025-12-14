/**
 * TaskStack Component
 * Stacked task cards with fan-style layout
 */

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "motion/react";
import { Check, X, Target } from "lucide-react";
import type { Task } from "../types/gift";
import { useGiftApp } from "../hooks/useGiftApp";

type TaskStackProps = {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  onTaskSkip: (taskId: string) => void;
};

const SWIPE_THRESHOLD = 150; // 滑动阈值
const TOTAL_OFFSET = 60; // 扇形总偏移范围（减小到60px让卡片更紧密）
const MAX_VISIBLE_CARDS = 5; // 最多显示5张卡片

// 彩色系统 - 暖色系（红橙黄）与温暖值相关 - 高饱和度版本
const COLOR_SCHEMES = [
  // 红色系 (占比30%) - 高饱和度
  { from: "#FF6B9D", to: "#FF1744", border: "#C62828" }, // 鲜粉→鲜红
  { from: "#FF4081", to: "#F50057", border: "#C51162" }, // 玫红→深玫红
  { from: "#FF5252", to: "#FF1744", border: "#D50000" }, // 亮红→鲜红
  
  // 橙色系 (占比40%) - 高饱和度
  { from: "#FFB74D", to: "#FF9800", border: "#E65100" }, // 金橙→鲜橙
  { from: "#FFA726", to: "#FB8C00", border: "#EF6C00" }, // 亮橙→深橙
  { from: "#FF7043", to: "#FF5722", border: "#D84315" }, // 橘色→深橘
  { from: "#FF8A65", to: "#FF6E40", border: "#FF3D00" }, // 珊瑚→亮橘
  
  // 黄色系 (占比20%) - 高饱和度
  { from: "#FFEB3B", to: "#FFC107", border: "#FF8F00" }, // 鲜黄→金黄
  { from: "#FFD54F", to: "#FFB300", border: "#FF6F00" }, // 亮黄→橙黄
  
  // 暖粉橙系 (占比10%) - 高饱和度
  { from: "#FFD740", to: "#FFA000", border: "#FF6F00" }, // 金色→琥珀
];

// 为每个任务分配一个固定的颜色（基于任务ID）
const getTaskColor = (taskId: string) => {
  // 使用任务ID生成一个稳定的索引
  const hash = taskId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % COLOR_SCHEMES.length;
  return COLOR_SCHEMES[index];
};

export function TaskStack({ tasks, onTaskComplete, onTaskSkip }: TaskStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"done" | "skip" | null>(null);

  // Remove filter - tasks should already be filtered by parent
  if (tasks.length === 0) {
    return null; // Don't show anything when there are no tasks
  }

  const handleSwipeComplete = (swipeDirection: "done" | "skip") => {
    const task = tasks[0]; // Always use the first task
    setDirection(swipeDirection);

    // Wait for animation to complete
    setTimeout(() => {
      if (swipeDirection === "done") {
        onTaskComplete(task.id);
      } else {
        onTaskSkip(task.id);
      }
      setDirection(null);
    }, 300);
  };

  // Calculate horizontal offset for fan effect
  // Center card (index 2) = 0, top card (index 0) = +60px, bottom card (index 4) = -60px
  const calculateOffset = (index: number, totalCards: number) => {
    const middleIndex = Math.floor(totalCards / 2);
    const offset = (middleIndex - index) * (TOTAL_OFFSET / totalCards);
    return offset;
  };

  const visibleTasks = tasks.slice(0, MAX_VISIBLE_CARDS); // Always show first 5 tasks

  return (
    <div className="relative w-full mx-auto" style={{ height: "170px", maxWidth: "280px" }}>
      {/* Stack - fan layout */}
      {visibleTasks.map((task, index) => {
        const isTopCard = index === 0;
        const zIndex = visibleTasks.length - index;
        const horizontalOffset = calculateOffset(index, visibleTasks.length);

        return (
          <div
            key={task.id}
            style={{
              position: "absolute",
              top: 0,
              left: `calc(50% + ${horizontalOffset}px)`,
              transform: "translateX(-50%)",
              zIndex,
              width: "220px",
              height: "170px",
            }}
          >
            {isTopCard ? (
              <SwipeableCard
                task={task}
                onSwipeComplete={handleSwipeComplete}
              />
            ) : (
              <StaticCard task={task} />
            )}
          </div>
        );
      })}

      {/* Counter badge */}
      <div className="absolute top-4 right-4 z-50 bg-gradient-to-br from-[var(--hot-pink)] to-[var(--coral)] text-white px-4 py-2 rounded-full border-[3px] border-white shadow-button font-black text-sm">
        {tasks.length} left
      </div>
    </div>
  );
}

// ==================== Swipeable Card ====================

type SwipeableCardProps = {
  task: Task;
  onSwipeComplete: (direction: "done" | "skip") => void;
};

function SwipeableCard({ task, onSwipeComplete }: SwipeableCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const taskColor = getTaskColor(task.id);
  const { getAllTasks } = useGiftApp();
  
  // Find linked recurring task
  const linkedRecurringTask = task.linkedRecurringTaskId 
    ? getAllTasks().find(t => t.id === task.linkedRecurringTaskId && t.type === "recurring")
    : null;
  
  // Rotate based on x position
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  
  // Opacity indicators
  const doneOpacity = useTransform(x, [0, SWIPE_THRESHOLD], [0, 1]);
  const skipOpacity = useTransform(x, [0, -SWIPE_THRESHOLD], [0, 1]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offsetX = info.offset.x;

    if (offsetX > SWIPE_THRESHOLD) {
      // Swipe right - Done
      onSwipeComplete("done");
    } else if (offsetX < -SWIPE_THRESHOLD) {
      // Swipe left - Skip
      onSwipeComplete("skip");
    }
  };

  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      onDragEnd={handleDragEnd}
      style={{ x, y, rotate, width: "100%", height: "100%" }}
      className="relative cursor-grab active:cursor-grabbing"
    >
      {/* Done indicator (right) */}
      <motion.div
        style={{ opacity: doneOpacity }}
        className="absolute -right-12 top-1/2 -translate-y-1/2 z-50"
      >
        <div className="bg-[var(--lime)] text-black p-4 rounded-full border-[4px] border-black shadow-button">
          <Check size={32} strokeWidth={4} />
        </div>
      </motion.div>

      {/* Skip indicator (left) */}
      <motion.div
        style={{ opacity: skipOpacity }}
        className="absolute -left-12 top-1/2 -translate-y-1/2 z-50"
      >
        <div className="bg-[var(--fire-orange)] text-white p-4 rounded-full border-[4px] border-black shadow-button">
          <X size={32} strokeWidth={4} />
        </div>
      </motion.div>

      {/* Card content */}
      <div 
        className="rounded-[2rem] border-[4px] shadow-card w-full h-full flex flex-col overflow-hidden relative"
        style={{
          borderColor: taskColor.border,
          backgroundColor: "white",
        }}
      >
        {/* Colorful decorations on white background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem] opacity-40">
          {Array.from({ length: 18 }, (_, i) => {
            const patterns = ["❤️", "⭐", "🦋", "💎", "🌸"];
            const pattern = patterns[Math.floor(Math.random() * patterns.length)];
            const x = Math.random() * 100;
            const y = 50 + Math.random() * 50; // Only in bottom half
            const size = 18 + Math.random() * 16;
            const rotation = Math.random() * 360;
            const delay = Math.random() * 2;

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  fontSize: `${size}px`,
                }}
                initial={{ 
                  rotate: rotation,
                  scale: 0,
                }}
                animate={{ 
                  rotate: rotation + 360,
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
                    delay: delay,
                    ease: "backOut",
                  },
                }}
              >
                {pattern}
              </motion.div>
            );
          })}
        </div>

        {/* Colorful header section */}
        <div 
          className="p-4 pb-6 relative z-10"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${taskColor.from}, ${taskColor.to})`,
          }}
        >
          <div 
            className="inline-block bg-white/50 px-2 py-0.5 rounded-full border-[2px] text-[10px] font-bold uppercase mb-2"
            style={{ borderColor: taskColor.border }}
          >
            Task #{task.id.slice(-4)}
          </div>
          <h3 className="font-black uppercase" style={{ fontSize: "clamp(1rem, 4.5vw, 1.35rem)", lineHeight: "1.2" }}>
            {task.title}
          </h3>
        </div>

        {/* White content section */}
        <div className="flex-1 p-4 pt-3 flex flex-col relative z-10">
          {/* Long-term Goal Badge (if linked) */}
          {linkedRecurringTask && (
            <div className="mb-2 flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--hot-pink)]/10 border-[2px] border-[var(--hot-pink)]/30">
              <Target size={12} className="text-[var(--hot-pink)] flex-shrink-0" />
              <div className="text-[9px] font-bold text-[var(--hot-pink)] uppercase truncate">
                {linkedRecurringTask.title}
              </div>
            </div>
          )}
          
          {task.note && (
            <p className="text-black/70 text-xs leading-relaxed mb-auto">{task.note}</p>
          )}

          {/* Swipe instruction */}
          <div className="mt-auto pt-3 border-t-[3px] border-black/10">
            <div className="text-center text-[10px] text-black/60 font-bold uppercase leading-tight">
              👈 Skip • Complete 👉
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ==================== Static Card (Preview) ====================

function StaticCard({ task }: { task: Task }) {
  const taskColor = getTaskColor(task.id);

  return (
    <div 
      className="rounded-[2rem] border-[4px] shadow-card w-full h-full flex flex-col overflow-hidden relative pointer-events-none"
      style={{
        borderColor: taskColor.border,
        backgroundColor: "white",
      }}
    >
      {/* Colorful decorations on white background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2rem] opacity-30">
        {Array.from({ length: 15 }, (_, i) => {
          const patterns = ["❤️", "⭐", "🦋", "💎", "🌸"];
          const pattern = patterns[Math.floor(Math.random() * patterns.length)];
          const x = Math.random() * 100;
          const y = 50 + Math.random() * 50; // Only in bottom half
          const size = 16 + Math.random() * 12;
          const rotation = Math.random() * 360;

          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                fontSize: `${size}px`,
                transform: `rotate(${rotation}deg)`,
              }}
            >
              {pattern}
            </div>
          );
        })}
      </div>

      {/* Colorful header section */}
      <div 
        className="p-6 pb-8 relative z-10"
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${taskColor.from}, ${taskColor.to})`,
        }}
      >
        <div 
          className="inline-block bg-white/50 px-3 py-1 rounded-full border-[2px] text-xs font-bold uppercase mb-4"
          style={{ borderColor: taskColor.border }}
        >
          Task #{task.id.slice(-4)}
        </div>
        <h3 className="font-black uppercase" style={{ fontSize: "clamp(1.25rem, 5vw, 1.75rem)", lineHeight: "1.2" }}>
          {task.title}
        </h3>
      </div>

      {/* White content section */}
      <div className="flex-1 p-6 pt-4 flex flex-col relative z-10">
        {task.note && (
          <p className="text-black/70 text-sm leading-relaxed line-clamp-3">{task.note}</p>
        )}
      </div>
    </div>
  );
}