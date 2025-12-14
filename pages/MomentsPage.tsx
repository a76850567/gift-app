/**
 * Moments Page - Redesigned
 * 整体进度聚合层 / 历史状态总览
 * "到目前为止，我们走到哪了"
 */

import React, { useMemo } from "react";
import { Shell, PageHeader, Badge } from "../framework";
import { useGiftApp } from "../hooks/useGiftApp";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Coffee, Trash2 } from "lucide-react";
import type { Task } from "../types/gift";
import { CardDecorations } from "../components/CardDecorations";
import { RecurringTaskCard } from "../components/RecurringTaskCard";
import { RecurringGoalsCarousel } from "../components/RecurringGoalsCarousel";

// 将所有任务按时间排序，构建时间线
type TimelineNode = {
  date: string; // YYYY-MM-DD
  tasks: Task[];
  dayIndex: number; // 从第一天开始计数
  totalDone: number;
  totalRest: number;
  totalPending: number;
};

// 彩色系统 - 暖色系（红橙黄）- 与 TODAY 卡片一致
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
  const hash = taskId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % COLOR_SCHEMES.length;
  return COLOR_SCHEMES[index];
};

// Mini Dancing Figure for Calendar - Keith Haring Style
function MiniDancingFigure({ color, index }: { color: string; index: number }) {
  const poses = [
    "M6 4 L6 7 M4 4 L6 4 M6 4 L8 4 M6 7 L5 9 M6 7 L7 9", // Arms up
    "M6 4 L6 7 M4 5 L6 4 L8 5 M6 7 L5 9 M6 7 L7 9", // Jump
    "M6 4 L6 7 M4 5 L6 4 M6 4 L8 5 M6 7 L5 9 M6 7 L7 9", // Side dance
  ];
  
  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 12 10"
      className="absolute inset-0"
      animate={{
        y: [0, -1, 0],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.15,
      }}
    >
      {/* Body */}
      <path
        d={poses[index % poses.length]}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Head */}
      <circle cx="6" cy="2.5" r="1.5" fill={color} />
    </motion.svg>
  );
}

export function MomentsPage() {
  const { state, getAllTasks, markTaskDone, markTaskRest } = useGiftApp();
  
  // 获取所有重复任务
  const recurringTasks = useMemo(() => {
    const allTasks = getAllTasks();
    return allTasks.filter(task => task.type === "recurring");
  }, [getAllTasks]);
  
  // 构建时间线数据
  const timeline = useMemo(() => {
    const allTasks = getAllTasks();
    const dayMap = new Map<string, Task[]>();
    
    // 按日期分组（只显示单次任务）
    Object.entries(state.tasksByDay).forEach(([date, tasks]) => {
      const singleTasks = tasks.filter(t => t.type !== "recurring");
      if (singleTasks.length > 0) {
        dayMap.set(date, singleTasks);
      }
    });
    
    // 排序并构建节点
    const sortedDates = Array.from(dayMap.keys()).sort();
    const nodes: TimelineNode[] = sortedDates.map((date, index) => {
      const tasks = dayMap.get(date) || [];
      return {
        date,
        tasks,
        dayIndex: index + 1,
        totalDone: tasks.filter(t => t.status === "done").length,
        totalRest: tasks.filter(t => t.status === "rest").length,
        totalPending: tasks.filter(t => t.status === "pending").length,
      };
    });
    
    return nodes;
  }, [state.tasksByDay, getAllTasks]);
  
  // 统计总数
  const stats = useMemo(() => {
    const allTasks = getAllTasks();
    return {
      totalDays: timeline.length,
      totalTasks: allTasks.length,
      totalDone: allTasks.filter(t => t.status === "done").length,
      totalRest: allTasks.filter(t => t.status === "rest").length,
      totalPending: allTasks.filter(t => t.status === "pending").length,
      currentStreak: state.streak,
      warmth: state.warmth,
    };
  }, [timeline, getAllTasks, state.streak, state.warmth]);
  
  // 格式化日期显示
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };
  
  return (
    <Shell>
      <PageHeader
        subtitle="Timeline"
        title="Where we are now."
        badges={
          <div className="flex gap-2">
            <Badge variant="info">{stats.totalDays} days</Badge>
            <Badge variant="warning">🔥 {stats.currentStreak}</Badge>
          </div>
        }
      />

      {/* 整体统计 */}
      <div className="mt-2 rounded-xl border-[2px] border-black/20 bg-white/90 backdrop-blur shadow-card p-1.5 relative overflow-hidden">
        {/* Decorative pattern in background */}
        <CardDecorations pattern="mixed" density="low" />
        
        <div className="font-black uppercase text-[8px] mb-1 text-black/60 relative z-10">Overall Progress</div>
        
        <div className="grid grid-cols-3 gap-1 relative z-10">
          <div className="text-center">
            <div className="text-base font-black text-[var(--neon-green)]">{stats.totalDone}</div>
            <div className="text-[7px] text-black/60 uppercase font-bold">Done</div>
          </div>
          <div className="text-center">
            <div className="text-base font-black text-[var(--fire-orange)]">{stats.totalRest}</div>
            <div className="text-[7px] text-black/60 uppercase font-bold">Rest</div>
          </div>
          <div className="text-center">
            <div className="text-base font-black text-[var(--sky-blue)]">{stats.totalPending}</div>
            <div className="text-[7px] text-black/60 uppercase font-bold">Pending</div>
          </div>
        </div>
        
        <div className="mt-1 pt-1 border-t-[2px] border-black/10 relative z-10">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-black/60 font-bold uppercase text-[7px]">Warmth</span>
            <span className="font-black text-[var(--hot-pink)]">{stats.warmth}</span>
          </div>
        </div>
      </div>

      {/* 重复任务进度区块 */}
      {recurringTasks.length > 0 && (
        <RecurringGoalsCarousel tasks={recurringTasks} />
      )}

      {/* 时间线 - 星轨式结构 */}
      <div className="mt-2 space-y-1.5">
        <div className="font-black uppercase text-[9px] text-black/60 px-2">History</div>
        
        {timeline.length === 0 ? (
          <div className="rounded-[2rem] border-[4px] border-black/20 bg-white/90 backdrop-blur shadow-card p-8 text-center">
            <Circle size={48} className="mx-auto text-black/20 mb-3" />
            <div className="font-bold text-black/60">No tasks yet</div>
            <div className="text-sm text-black/40 mt-1">Start your journey today</div>
          </div>
        ) : (
          <HistoryCalendar timeline={timeline} />
        )}
      </div>
    </Shell>
  );
}

// 时间线节点卡片
function TimelineNodeCard({ node, isLast }: { node: TimelineNode; isLast: boolean }) {
  const [expanded, setExpanded] = React.useState(isLast); // 默认展开最后一天
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
    return { short: `${month}/${day}`, weekday };
  };
  
  const { short, weekday } = formatDate(node.date);
  
  // 节点状态颜色
  const getNodeColor = () => {
    if (node.totalDone > 0 && node.totalRest === 0) return "bg-[var(--neon-green)]"; // 全部完成
    if (node.totalRest > 0 && node.totalDone === 0) return "bg-[var(--fire-orange)]"; // 全休息
    if (node.totalDone > 0 && node.totalRest > 0) return "bg-[var(--sky-blue)]"; // 混合
    return "bg-black/20"; // 全部待定
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: node.dayIndex * 0.05 }}
      className="relative pl-16 pr-2 pb-4"
    >
      {/* 节点圆点 */}
      <motion.div
        className={`absolute left-[18px] top-3 w-6 h-6 rounded-full border-[3px] border-white shadow-button ${getNodeColor()}`}
        whileHover={{ scale: 1.2 }}
        onClick={() => setExpanded(!expanded)}
      />
      
      {/* 节点内容 */}
      <motion.div
        className="rounded-[1.5rem] border-[3px] border-black/20 bg-white/90 backdrop-blur shadow-card overflow-hidden cursor-pointer relative"
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Decorative pattern in background */}
        <CardDecorations pattern="mixed" density="low" />
        
        {/* 头部 */}
        <div className="p-3 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div>
              <div className="font-black text-lg">{short}</div>
              <div className="text-xs text-black/60 font-bold uppercase">{weekday}</div>
            </div>
            <div className="flex gap-1">
              {node.totalDone > 0 && (
                <div className="px-2 py-1 rounded-lg bg-[var(--neon-green)]/20 border-[2px] border-[var(--neon-green)] text-[var(--neon-green)] text-xs font-bold">
                  {node.totalDone}✓
                </div>
              )}
              {node.totalRest > 0 && (
                <div className="px-2 py-1 rounded-lg bg-[var(--fire-orange)]/20 border-[2px] border-[var(--fire-orange)] text-[var(--fire-orange)] text-xs font-bold">
                  {node.totalRest}☕
                </div>
              )}
              {node.totalPending > 0 && (
                <div className="px-2 py-1 rounded-lg bg-black/10 border-[2px] border-black/20 text-black/60 text-xs font-bold">
                  {node.totalPending}○
                </div>
              )}
            </div>
          </div>
          
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            className="text-black/40"
          >
            ▼
          </motion.div>
        </div>
        
        {/* 展开的任务列表 */}
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="border-t-[3px] border-black/10 bg-white/50"
          >
            <div className="p-3 space-y-2">
              {node.tasks.map((task) => (
                <TaskNodeItem key={task.id} task={task} />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

// 单个任务节点
function TaskNodeItem({ task }: { task: Task }) {
  const taskColor = getTaskColor(task.id);
  
  const getStatusIcon = () => {
    switch (task.status) {
      case "done":
        return <CheckCircle2 size={18} className="text-white" strokeWidth={3} />;
      case "rest":
        return <Coffee size={18} className="text-white" strokeWidth={3} />;
      default:
        return <Circle size={18} className="text-white" strokeWidth={3} />;
    }
  };
  
  const getStatusLabel = () => {
    switch (task.status) {
      case "done":
        return "✓ Done";
      case "rest":
        return "☕ Rest";
      default:
        return "○ Pending";
    }
  };
  
  return (
    <motion.div
      className="rounded-[1.5rem] border-[4px] shadow-card overflow-hidden relative"
      style={{
        borderColor: taskColor.border,
        backgroundColor: "white",
      }}
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Colorful header with gradient - 仿照 TODAY 卡片 */}
      <div
        className="p-3 pb-4 relative z-10"
        style={{
          backgroundImage: `linear-gradient(to bottom right, ${taskColor.from}, ${taskColor.to})`,
        }}
      >
        {/* Status badge */}
        <div
          className="inline-flex items-center gap-1 bg-white/30 backdrop-blur-sm px-2 py-0.5 rounded-full border-[2px] text-[10px] font-bold uppercase mb-2"
          style={{ borderColor: "rgba(255,255,255,0.6)" }}
        >
          <div className="w-3 h-3 flex items-center justify-center">
            {getStatusIcon()}
          </div>
          <span className="text-white">{getStatusLabel()}</span>
        </div>

        {/* Task title */}
        <div className="font-black text-white text-base leading-tight">
          {task.title}
        </div>
      </div>

      {/* White content area with decorations */}
      {task.note && (
        <div className="p-3 pt-2 bg-white relative z-10">
          <div className="text-xs text-black/70 leading-relaxed">
            {task.note}
          </div>
        </div>
      )}

      {/* Decorative pattern in background - 使用 CardDecorations 组件 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[1.5rem]">
        <CardDecorations pattern="mixed" density="medium" />
      </div>
    </motion.div>
  );
}

// 历史日历组件
function HistoryCalendar({ timeline }: { timeline: TimelineNode[] }) {
  const [selectedDay, setSelectedDay] = React.useState<TimelineNode | null>(null);
  
  // 构建日历数据：获取时间范围
  const { startDate, endDate, calendarMonths } = useMemo(() => {
    if (timeline.length === 0) {
      return { startDate: new Date(), endDate: new Date(), calendarMonths: [] };
    }
    
    const dates = timeline.map(n => new Date(n.date));
    const start = new Date(Math.min(...dates.map(d => d.getTime())));
    const end = new Date(Math.max(...dates.map(d => d.getTime())));
    
    // 构建月份数组
    const months: Array<{
      year: number;
      month: number;
      weeks: Array<Array<{
        date: Date;
        dateStr: string;
        node: TimelineNode | null;
        isCurrentMonth: boolean;
      } | null>>;
    }> = [];
    
    const current = new Date(start.getFullYear(), start.getMonth(), 1);
    const lastMonth = new Date(end.getFullYear(), end.getMonth(), 1);
    
    while (current <= lastMonth) {
      const year = current.getFullYear();
      const month = current.getMonth();
      
      // 获取该月第一天和最后一天
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      
      // 获取第一天是周几（0=周日）
      const firstDayOfWeek = firstDay.getDay();
      
      // 构建周数组
      const weeks: typeof months[0]['weeks'] = [];
      let week: typeof weeks[0] = [];
      
      // 填充第一周的空白
      for (let i = 0; i < firstDayOfWeek; i++) {
        week.push(null);
      }
      
      // 填充日期
      for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toISOString().split('T')[0];
        const node = timeline.find(n => n.date === dateStr) || null;
        
        week.push({
          date,
          dateStr,
          node,
          isCurrentMonth: true,
        });
        
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }
      
      // 填充最后一周的空白
      if (week.length > 0) {
        while (week.length < 7) {
          week.push(null);
        }
        weeks.push(week);
      }
      
      months.push({ year, month, weeks });
      
      current.setMonth(current.getMonth() + 1);
    }
    
    return { startDate: start, endDate: end, calendarMonths: months };
  }, [timeline]);
  
  // 获取日期格子的颜色和样式
  const getDayStyle = (node: TimelineNode | null) => {
    if (!node) {
      return {
        bg: 'bg-black/5',
        border: 'border-black/10',
        figureCount: 0,
        color: '#D1D5DB',
        intensity: 0,
        animated: false,
      };
    }
    
    const total = node.totalDone + node.totalRest + node.totalPending;
    const doneCount = node.totalDone;
    
    // Based on number of completed tasks, show different dancing figures
    if (doneCount >= 5) {
      // 5+ tasks done - 5个跳舞小人 + 炫彩火焰动画
      return {
        bg: 'gradient-fire-animated',
        border: 'border-[var(--fire-red)]',
        figureCount: 5,
        colors: ['#FF1B8D', '#FF6B4A', '#FFD93D', '#B8E62E', '#4ECDC4'],
        intensity: 100,
        animated: true,
        glow: true,
      };
    } else if (doneCount >= 3) {
      // 3-4 tasks done - 3个跳舞小人 + 彩虹动画
      return {
        bg: 'gradient-rainbow-animated',
        border: 'border-[var(--hot-pink)]',
        figureCount: 3,
        colors: ['#FF1B8D', '#FF6B4A', '#FFD93D'],
        intensity: 80,
        animated: true,
        glow: false,
      };
    } else if (doneCount >= 2) {
      // 2 tasks done - 2个跳舞小人
      return {
        bg: 'bg-gradient-to-br from-[#FFD93D] to-[#FF9B3D]',
        border: 'border-[#FF9B3D]',
        figureCount: 2,
        colors: ['#FF9B3D', '#FFD93D'],
        intensity: 60,
        animated: false,
        glow: false,
      };
    } else if (doneCount === 1) {
      // 1 task done - 1个跳舞小人
      return {
        bg: 'bg-gradient-to-br from-[#FFE082] to-[#FFB74D]',
        border: 'border-[#FFB74D]',
        figureCount: 1,
        colors: ['#FFB74D'],
        intensity: 40,
        animated: false,
        glow: false,
      };
    } else if (node.totalRest > 0) {
      // 休息 - 1个灰橙色小人
      return {
        bg: 'bg-gradient-to-br from-[#FF9B3D]/40 to-[#FF6B4A]/40',
        border: 'border-[#FF9B3D]/60',
        figureCount: 1,
        colors: ['#FF9B3D'],
        intensity: 30,
        animated: false,
        glow: false,
      };
    } else {
      // 仅登录未完成 - 1个灰色小人
      return {
        bg: 'bg-black/10',
        border: 'border-black/20',
        figureCount: 1,
        colors: ['#9CA3AF'],
        intensity: 20,
        animated: false,
        glow: false,
      };
    }
  };
  
  return (
    <div className="space-y-2">
      {calendarMonths.map((monthData) => (
        <motion.div
          key={`${monthData.year}-${monthData.month}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border-[2px] border-black/20 bg-white/90 backdrop-blur shadow-card p-1.5 relative overflow-hidden"
        >
          {/* Decorative pattern */}
          <CardDecorations pattern="mixed" density="low" />
          
          <div className="relative z-10">
            {/* 月份标题 */}
            <div className="font-black text-[10px] mb-1 text-black/80">
              {new Date(monthData.year, monthData.month).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
              })}
            </div>
            
            {/* 星期标题 */}
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center text-[7px] font-bold text-black/40 uppercase">
                  {day}
                </div>
              ))}
            </div>
            
            {/* 日历网格 */}
            <div className="space-y-0.5">
              {monthData.weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 gap-0.5">
                  {week.map((day, dayIndex) => {
                    if (!day) {
                      return <div key={dayIndex} className="aspect-square" />;
                    }
                    
                    const style = getDayStyle(day.node);
                    const isToday = day.dateStr === new Date().toISOString().split('T')[0];
                    const isSelected = selectedDay?.date === day.dateStr;
                    
                    return (
                      <motion.button
                        key={dayIndex}
                        onClick={() => setSelectedDay(day.node)}
                        className={`
                          aspect-square rounded border-[1.5px] relative overflow-hidden
                          ${style.bg} ${style.border}
                          ${isToday ? 'ring-1 ring-[var(--hot-pink)] ring-offset-1' : ''}
                          ${isSelected ? 'scale-110 shadow-button' : ''}
                          flex flex-col items-center justify-center
                          cursor-pointer transition-all
                        `}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Date number */}
                        <div className="text-[6px] font-black text-white/90 absolute top-0.5 left-0.5 z-10 mix-blend-overlay">
                          {day.date.getDate()}
                        </div>
                        
                        {/* Dancing figures */}
                        {style.figureCount > 0 && (
                          <div className="w-full h-full flex items-center justify-center gap-[1px]">
                            {Array.from({ length: style.figureCount }).map((_, i) => (
                              <div key={i} className="relative w-3 h-3">
                                <MiniDancingFigure color={style.colors[i % style.colors.length]} index={i} />
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              ))}
            </div>
            
            {/* 图例 */}
            <div className="mt-1.5 pt-1.5 border-t-[2px] border-black/10 flex flex-wrap gap-1 text-[7px]">
              <div className="flex items-center gap-0.5">
                <div className="w-2 h-2 rounded border-[1.5px] border-[var(--neon-green)] bg-[var(--neon-green)]" />
                <span className="text-black/60 font-bold">Done</span>
              </div>
              <div className="flex items-center gap-0.5">
                <div className="w-2 h-2 rounded border-[1.5px] border-[var(--sky-blue)] bg-[var(--sky-blue)]" />
                <span className="text-black/60 font-bold">Partial</span>
              </div>
              <div className="flex items-center gap-0.5">
                <div className="w-2 h-2 rounded border-[1.5px] border-[var(--fire-orange)] bg-[var(--fire-orange)]/40" />
                <span className="text-black/60 font-bold">Rest</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* 选中日期的详情弹窗 */}
      {selectedDay && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto"
        >
          <div className="rounded-[2rem] border-[4px] border-black/30 bg-white shadow-2xl p-4 relative overflow-hidden max-h-[60vh] overflow-y-auto">
            {/* Decorative pattern */}
            <CardDecorations pattern="mixed" density="medium" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-black text-lg">
                    {new Date(selectedDay.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-xs text-black/60 font-bold uppercase">
                    {new Date(selectedDay.date).toLocaleDateString('en-US', { weekday: 'long' })}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDay(null)}
                  className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center font-bold text-black/60 transition-colors"
                >
                  ×
                </button>
              </div>
              
              {/* Stats */}
              <div className="flex gap-2 mb-4">
                {selectedDay.totalDone > 0 && (
                  <div className="px-2 py-1 rounded-lg bg-[var(--neon-green)]/20 border-[2px] border-[var(--neon-green)] text-[var(--neon-green)] text-xs font-bold">
                    {selectedDay.totalDone}✓
                  </div>
                )}
                {selectedDay.totalRest > 0 && (
                  <div className="px-2 py-1 rounded-lg bg-[var(--fire-orange)]/20 border-[2px] border-[var(--fire-orange)] text-[var(--fire-orange)] text-xs font-bold">
                    {selectedDay.totalRest}☕
                  </div>
                )}
                {selectedDay.totalPending > 0 && (
                  <div className="px-2 py-1 rounded-lg bg-black/10 border-[2px] border-black/20 text-black/60 text-xs font-bold">
                    {selectedDay.totalPending}○
                  </div>
                )}
              </div>
              
              {/* Task list */}
              <div className="space-y-2">
                {selectedDay.tasks.map((task) => (
                  <TaskNodeItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setSelectedDay(null)}
          />
        </motion.div>
      )}
    </div>
  );
}