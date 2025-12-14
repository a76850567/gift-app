/**
 * Recurring Task Card Component
 * Displays progress for long-term recurring tasks (e.g., 30-day running challenge)
 */

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Calendar, Gift, Edit2, X, Users } from "lucide-react";
import type { Task } from "../types/gift";
import { CardDecorations } from "./CardDecorations";
import { DecoratedCard } from "./DecoratedCard";
import { DancingPlushCrew } from "./DancingPlushCrew";
import type { PlushMood } from "../types/gift";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { EditGoalModal } from "./EditGoalModal";
import { useGiftApp } from "../hooks/useGiftApp";

type RecurringTaskCardProps = {
  task: Task;
};

export const RecurringTaskCard = React.memo(function RecurringTaskCard({ task }: RecurringTaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const pointerStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const { state } = useGiftApp();

  if (!task.recurringGoal || !task.completionHistory) {
    return null;
  }

  const { totalDays, startDate, witnessIds } = task.recurringGoal;
  const history = task.completionHistory;
  
  // Get witness friends
  const witnesses = witnessIds && witnessIds.length > 0 
    ? (state.friends || []).filter(f => witnessIds.includes(f.id))
    : [];
  
  // Calculate progress
  const completedDays = history.filter(h => h.completed).length;
  const progressPercent = (completedDays / totalDays) * 100;
  
  // Calculate current streak
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let currentStreak = 0;
  for (const entry of sortedHistory) {
    if (entry.completed) {
      currentStreak++;
    } else {
      break;
    }
  }
  
  // Get status
  const isCompleted = completedDays >= totalDays;
  const isActive = !isCompleted && completedDays > 0;
  
  // Determine plush mood based on progress
  const getPlushMood = (): PlushMood => {
    if (progressPercent >= 80) return "spark";
    if (progressPercent >= 50) return "happy";
    if (progressPercent >= 20) return "calm";
    return "sleepy";
  };
  
  const plushMood = getPlushMood();
  
  // Handle click - only expand if it was a quick tap without movement
  const handlePointerDown = (e: React.PointerEvent) => {
    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    };
    
    // 阻止事件冒泡到轮播容器
    e.stopPropagation();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerStartRef.current) return;
    
    const dx = Math.abs(e.clientX - pointerStartRef.current.x);
    const dy = Math.abs(e.clientY - pointerStartRef.current.y);
    const dt = Date.now() - pointerStartRef.current.time;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // 如果移动距离小于 10px 且时间小于 300ms，认为是点击
    if (distance < 10 && dt < 300) {
      setIsExpanded(!isExpanded);
    }
    
    pointerStartRef.current = null;
    
    // 阻止事件冒泡
    e.stopPropagation();
  };
  
  // 打开编辑模式
  const handleEditClick = (e: React.PointerEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log('🟢 RecurringTaskCard: Opening edit modal');
    setIsEditing(true);
    console.log('🟢 RecurringTaskCard: isEditing set to true');
  };

  console.log('🟣 RecurringTaskCard render: isExpanded =', isExpanded);
  
  return (
    <div className="relative">
      <DecoratedCard 
        variant="default"
        decorationPattern="mixed"
        decorationDensity="low"
        className="relative"
      >
        {/* Reward Gift Image in Background */}
        {task.recurringGoal.reward?.imageUrl && (
          <div className="absolute inset-0 overflow-hidden rounded-[1.5rem] pointer-events-none">
            <ImageWithFallback
              src={task.recurringGoal.reward.imageUrl}
              alt={task.recurringGoal.reward.title}
              className="absolute -right-4 -bottom-4 w-40 h-40 object-cover opacity-60 transform rotate-12 blur-[1px]"
            />
          </div>
        )}
        
        <div
          className="relative z-10"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {/* Header Section */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <div className="flex-1 min-w-0">
              {/* Task Title */}
              <div className="flex items-center gap-1 mb-0.5">
                <Calendar size={10} className="text-[var(--hot-pink)] flex-shrink-0" />
                <h3 className="font-black text-xs text-black/80 truncate">
                  {task.title}
                </h3>
              </div>
              
              {/* Subtitle */}
              <div className="text-[8px] text-black/50 font-bold uppercase">
                {totalDays} Days Challenge
              </div>
            </div>
            
            {/* Edit Button and Status Badge */}
            <div className="flex items-center gap-1.5">
              {/* Edit Button */}
              <motion.button
                onPointerDown={(e) => {
                  console.log('🔴 BUTTON POINTER DOWN - Event reached button!');
                  e.stopPropagation();
                  e.preventDefault();
                  handleEditClick(e);
                }}
                className="p-1 rounded-md bg-[var(--sky-blue)] border-[2px] border-black text-white flex-shrink-0 shadow-button"
                style={{ cursor: 'pointer', pointerEvents: 'auto' }}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                <Edit2 size={10} />
              </motion.button>
              
              {/* Status Badge */}
              <div className={`
                px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase border-[2px] flex-shrink-0
                ${isCompleted 
                  ? 'bg-[var(--neon-green)]/20 border-[var(--neon-green)] text-[var(--neon-green)]' 
                  : 'bg-[var(--hot-pink)]/20 border-[var(--hot-pink)] text-[var(--hot-pink)]'
                }
              `}>
                {isCompleted ? '✓' : '⚡'}
              </div>
            </div>
          </div>

          {/* Progress Display */}
          <div className="mb-1.5">
            {/* Big Numbers */}
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-xl font-black text-[var(--hot-pink)]">
                {completedDays}
              </span>
              <span className="text-[9px] text-black/40 font-bold">
                / {totalDays}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-1.5 rounded-full bg-black/10 border-[2px] border-black/20 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--hot-pink)] to-[var(--fire-orange)]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Reward Section (if exists) - Compact */}
          {task.recurringGoal.reward && (
            <div className="rounded-lg border-[2px] border-[var(--fire-orange)] bg-gradient-to-br from-[var(--fire-orange)]/10 to-[var(--hot-pink)]/10 p-1.5 mb-1.5">
              <div className="flex items-center gap-1.5">
                <Gift size={12} className="text-[var(--fire-orange)] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[8px] font-bold text-[var(--fire-orange)] uppercase">
                    🎁 Reward
                  </div>
                  <div className="text-[10px] font-bold text-black/80 leading-tight truncate">
                    {task.recurringGoal.reward.title}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Row */}
          <div className="flex items-center justify-between text-[8px]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <span className="text-black/40 font-bold uppercase">Streak</span>
                <span className="font-black text-[var(--fire-orange)]">
                  🔥{currentStreak}
                </span>
              </div>
              <div className="flex items-center gap-0.5">
                <span className="text-black/40 font-bold uppercase">Left</span>
                <span className="font-black text-[var(--sky-blue)]">
                  {totalDays - completedDays}
                </span>
              </div>
            </div>
            
            {/* Expand indicator */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              className="text-black/30 text-[10px]"
            >
              ▼
            </motion.div>
          </div>
        </div>
        
        {/* Expanded insights */}
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t-[3px] border-black/10 mt-4"
          >
            <div className="pt-4 space-y-3">
              {/* Reward Preview - Full Clarity */}
              {task.recurringGoal.reward?.imageUrl && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="rounded-xl border-[3px] border-[var(--fire-orange)] bg-gradient-to-br from-[var(--fire-orange)]/20 to-[var(--hot-pink)]/20 p-3 overflow-hidden"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Gift size={16} className="text-[var(--fire-orange)]" />
                    <div>
                      <div className="text-[10px] font-bold text-[var(--fire-orange)] uppercase">
                        Your Reward
                      </div>
                      <div className="text-sm font-black text-black/80">
                        {task.recurringGoal.reward.title}
                      </div>
                    </div>
                  </div>
                  
                  {/* Full Image Display */}
                  <div className="relative rounded-lg overflow-hidden border-[3px] border-black/20 shadow-button">
                    <ImageWithFallback
                      src={task.recurringGoal.reward.imageUrl}
                      alt={task.recurringGoal.reward.title}
                      className="w-full h-40 object-cover"
                    />
                    {/* Shine effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                  </div>
                  
                  {task.recurringGoal.reward.description && (
                    <div className="mt-2 text-xs text-black/70 font-bold">
                      {task.recurringGoal.reward.description}
                    </div>
                  )}
                </motion.div>
              )}
              
              {/* Accountability Partners */}
              {witnesses.length > 0 && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="rounded-xl border-[3px] border-[var(--sky-blue)] bg-gradient-to-br from-[var(--sky-blue)]/20 to-[var(--lavender-purple)]/20 p-3"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={16} className="text-[var(--sky-blue)]" />
                    <div>
                      <div className="text-[10px] font-bold text-[var(--sky-blue)] uppercase">
                        Accountability Partners
                      </div>
                      <div className="text-xs text-black/60">
                        {witnesses.length} {witnesses.length === 1 ? 'friend' : 'friends'} cheering you on
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {witnesses.map((friend) => (
                      <div
                        key={friend.id}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border-[2px] border-[var(--sky-blue)]/30 bg-white/50"
                      >
                        <img
                          src={friend.avatarUrl}
                          alt={friend.name}
                          className="w-6 h-6 rounded-full border-[2px] border-[var(--sky-blue)]"
                        />
                        <span className="text-xs font-bold text-black/80">
                          {friend.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Trend Analysis */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="text-xs font-bold text-black/60 uppercase">
                    📊 Trend Analysis
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {/* Completion Rate */}
                  <div className="rounded-xl border-[2px] border-[var(--neon-green)] bg-[var(--neon-green)]/10 p-3">
                    <div className="text-[10px] text-black/60 font-bold mb-1">
                      COMPLETION RATE
                    </div>
                    <div className="text-xl font-black text-[var(--neon-green)]">
                      {Math.round(progressPercent)}%
                    </div>
                  </div>
                  
                  {/* Best Streak */}
                  <div className="rounded-xl border-[2px] border-[var(--fire-orange)] bg-[var(--fire-orange)]/10 p-3">
                    <div className="text-[10px] text-black/60 font-bold mb-1">
                      BEST STREAK
                    </div>
                    <div className="text-xl font-black text-[var(--fire-orange)]">
                      {currentStreak} 🔥
                    </div>
                  </div>
                </div>
              </div>

              {/* Motivational Message */}
              <div className="rounded-xl border-[3px] border-[var(--hot-pink)] bg-gradient-to-br from-[var(--hot-pink)]/20 to-[var(--fire-orange)]/20 p-3">
                <div className="flex items-start gap-2">
                  <div className="text-xl">💪</div>
                  <div>
                    <div className="text-xs font-bold text-[var(--hot-pink)] mb-1">
                      MOTIVATION
                    </div>
                    <div className="text-sm font-bold text-black/80">
                      {progressPercent >= 80 
                        ? "You're crushing it! Just a few more days to victory! 🎉"
                        : progressPercent >= 50
                        ? "Halfway there! Your consistency is building unstoppable momentum! 🚀"
                        : progressPercent >= 20
                        ? "Great start! Every day brings you closer to your goal! ⭐"
                        : "The journey of a thousand miles begins with a single step! 🌟"
                      }
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Tips */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-black/60 uppercase mb-2">
                  💡 Tips to Stay on Track
                </div>
                
                <div className="space-y-2">
                  {/* Tip 1 - Time-based */}
                  <div className="flex items-start gap-2 text-xs">
                    <div className="w-5 h-5 rounded-full bg-[var(--sky-blue)]/20 border-[2px] border-[var(--sky-blue)] flex items-center justify-center flex-shrink-0 text-[10px]">
                      1
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-black/80">Set a daily reminder</div>
                      <div className="text-black/60">Pick the same time each day to build a habit loop</div>
                    </div>
                  </div>
                  
                  {/* Tip 2 - Habit stacking */}
                  <div className="flex items-start gap-2 text-xs">
                    <div className="w-5 h-5 rounded-full bg-[var(--hot-pink)]/20 border-[2px] border-[var(--hot-pink)] flex items-center justify-center flex-shrink-0 text-[10px]">
                      2
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-black/80">Stack with existing habits</div>
                      <div className="text-black/60">Link this task to something you already do daily</div>
                    </div>
                  </div>
                  
                  {/* Tip 3 - Recovery */}
                  <div className="flex items-start gap-2 text-xs">
                    <div className="w-5 h-5 rounded-full bg-[var(--fire-orange)]/20 border-[2px] border-[var(--fire-orange)] flex items-center justify-center flex-shrink-0 text-[10px]">
                      3
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-black/80">Don't break the chain</div>
                      <div className="text-black/60">Missing one day is okay—just don't miss two in a row!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* 编辑模态框 */}
        <EditGoalModal
          task={task}
          isOpen={isEditing}
          onClose={() => {
            console.log('🟣 RecurringTaskCard: onClose callback called');
            setIsEditing(false);
            console.log('🟣 RecurringTaskCard: isEditing set to false');
          }}
        />
      </DecoratedCard>
    </div>
  );
});