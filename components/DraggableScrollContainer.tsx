/**
 * DraggableScrollContainer - 可拖拽滚动容器
 * 在内容下方放置透明拖拽层，不干扰内容的点击事件
 */

import React, { useRef, useState, useEffect, ReactNode } from "react";

interface DraggableScrollContainerProps {
  children: ReactNode;
  className?: string;
  onScroll?: () => void;
}

export function DraggableScrollContainer({ 
  children, 
  className = "",
  onScroll
}: DraggableScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  // 全局鼠标移动和释放监听
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const dx = e.pageX - startX;
      container.scrollLeft = startScrollLeft - dx;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = '';
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, startX, startScrollLeft]);

  // 滚动监听
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !onScroll) return;

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // 拖拽层的鼠标按下事件
  const handleDragLayerMouseDown = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(true);
    setStartX(e.pageX);
    setStartScrollLeft(container.scrollLeft);
    e.preventDefault(); // 阻止默认行为
  };

  return (
    <div className="relative">
      {/* 滚动容器 */}
      <div
        ref={containerRef}
        className={className}
      >
        {children}
      </div>

      {/* 透明拖拽层 - 在内容下方，只响应空白区域的拖拽 */}
      <div
        className={`absolute inset-0 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ pointerEvents: isDragging ? 'auto' : 'none' }} // 只在拖拽时拦截事件
        onMouseDown={handleDragLayerMouseDown}
      />
    </div>
  );
}
