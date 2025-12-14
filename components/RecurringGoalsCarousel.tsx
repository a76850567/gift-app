/**
 * RecurringGoalsCarousel - 横向滑动的 Long-term Goals 轮播组件
 * 支持鼠标拖拽、触摸滑动、自动对齐、指示器
 * 卡片会阻止事件冒泡，所以只有拖拽卡片外的区域才会触发容器的拖拽
 */

import React, { useRef, useState, useEffect } from "react";
import { Target } from "lucide-react";
import type { Task } from "../types/gift";
import { RecurringTaskCard } from "./RecurringTaskCard";

interface RecurringGoalsCarouselProps {
  tasks: Task[];
}

export function RecurringGoalsCarousel({ tasks }: RecurringGoalsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  // 监听滚动事件，更新当前索引
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // 计算当前显示的卡片索引
      const cardWidth = container.clientWidth * 0.85; // 85vw
      const gap = 12; // gap-3 = 12px
      const scrollLeft = container.scrollLeft + container.clientWidth / 2;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setCurrentIndex(Math.min(Math.max(0, index), tasks.length - 1));
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [tasks.length]);

  // Pointer 拖拽处理
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // 捕获 pointer 以便在移出容器时仍能拖拽
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    setIsDragging(true);
    setStartX(e.clientX);
    setStartScrollLeft(container.scrollLeft);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const dx = e.clientX - startX;
    container.scrollLeft = startScrollLeft - dx;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-1.5 mt-2">
      {/* 标题栏 */}
      <div className="flex items-center gap-1.5 px-2">
        <Target size={12} className="text-[var(--hot-pink)]" />
        <div className="font-black uppercase text-[9px] text-black/60">
          Long-term Goals
        </div>
        <div className="px-1.5 py-0.5 rounded-full bg-[var(--hot-pink)]/20 border-[2px] border-[var(--hot-pink)] text-[var(--hot-pink)] text-[9px] font-bold">
          {tasks.length}
        </div>
      </div>

      {/* 轮播容器 */}
      <div className="relative -mx-4">
        <div
          ref={scrollContainerRef}
          className={`overflow-x-auto pb-2 px-4 scrollbar-hide snap-x snap-mandatory ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ 
            userSelect: isDragging ? 'none' : 'auto',
            touchAction: 'pan-x',
            WebkitOverflowScrolling: 'touch'
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="flex gap-2" style={{ width: "max-content" }}>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="w-[85vw] flex-shrink-0 snap-start"
                style={{ maxWidth: "400px" }}
              >
                <RecurringTaskCard task={task} />
              </div>
            ))}
          </div>
        </div>

        {/* 滑动指示器 - 仅显示状态 */}
        {tasks.length > 1 && (
          <div className="flex justify-center gap-1 mt-1">
            {tasks.map((_, index) => (
              <div
                key={index}
                className={`rounded-full transition-all ${
                  index === currentIndex
                    ? "w-3 h-1 bg-[var(--hot-pink)]"
                    : "w-1 h-1 bg-black/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}