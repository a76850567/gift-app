/**
 * Today Page
 * Main task management page with stacked cards
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, RotateCcw } from "lucide-react";
import {
  Shell,
  PageHeader,
  Badge,
  Button,
  Input,
} from "../framework";
import { useGiftApp } from "../hooks/useGiftApp";
import { useTheme } from "../framework/hooks";
import { DancingPlushCrew } from "../components/DancingPlushCrew";
import { TaskStack } from "../components/TaskStack";
import { TaskCompletionModal } from "../components/TaskCompletionModal";
import { HeartIcon } from "../components/icons/HeartIcon";
import { FlameIcon } from "../components/icons/FlameIcon";
import { motion } from "framer-motion";
import { DecoratedCard } from "../components/DecoratedCard";
import { ConfettiCelebration } from "../components/ConfettiCelebration";
import { CreateMultipleGoalsButton } from "../components/CreateMultipleGoalsButton";

export function TodayPage() {
  const navigate = useNavigate();
  const { 
    state, 
    todayTasks, 
    addTask, 
    markTaskDone, 
    markTaskRest,
    addMoment,
    addWarmth,
    resetAll,
  } = useGiftApp();
  const { theme } = useTheme({ accent: "pink", reduceMotion: false });
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [completionModalOpen, setCompletionModalOpen] = useState(false);
  const [completedTaskTitle, setCompletedTaskTitle] = useState("");
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);
  const [confettiTrigger, setConfettiTrigger] = useState(false);

  const doneCount = todayTasks.filter((t) => t.status === "done").length;
  const restCount = todayTasks.filter((t) => t.status === "rest").length;
  const pendingCount = todayTasks.filter((t) => t.status === "pending").length;

  // Filter pending tasks for TaskStack
  const pendingTasks = todayTasks.filter((t) => t.status === "pending");

  // Debug logging
  console.log('📋 TodayPage - todayTasks:', todayTasks);
  console.log('📋 TodayPage - todayTasks.length:', todayTasks.length);
  console.log('📋 TodayPage - pendingTasks.length:', pendingTasks.length);
  console.log('📋 TodayPage - doneCount:', doneCount, 'restCount:', restCount, 'pendingCount:', pendingCount);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const handleTaskComplete = (taskId: string) => {
    const task = todayTasks.find((t) => t.id === taskId);
    if (task) {
      setCompletedTaskTitle(task.title);
      setPendingTaskId(taskId);
      setCompletionModalOpen(true);
    }
  };

  const handleTaskSkip = (taskId: string) => {
    markTaskRest(taskId);
  };

  const handleCompletionSubmit = (data: {
    text?: string;
    photoDataUrl?: string;
    audioDataUrl?: string;
  }) => {
    if (pendingTaskId) {
      // Log for debugging
      console.log("🎯 Completing task:", pendingTaskId);
      console.log("📊 Current warmth:", state.warmth);
      
      markTaskDone(pendingTaskId);

      // Add moment if user provided any content
      if (data.text || data.photoDataUrl) {
        addMoment({
          text: data.text || "Completed a task! 🎉",
          photoDataUrl: data.photoDataUrl,
          linkedTaskId: pendingTaskId,
        });
      }

      // Trigger confetti celebration! 🎉
      setConfettiTrigger(true);
      setTimeout(() => setConfettiTrigger(false), 100);

      setPendingTaskId(null);
      
      // Log after completion
      setTimeout(() => {
        console.log("✅ New warmth should be:", state.warmth + 5);
      }, 100);
    }
  };

  return (
    <Shell>
      <PageHeader
        title="Today"
        subtitle={`${new Date().toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })}`}
      />

      {/* Confetti Celebration */}
      <ConfettiCelebration trigger={confettiTrigger} />

      <div className="mt-3 space-y-3">
        {/* 1. Plush Avatar with Warmth Progress */}
        <DancingPlushCrew 
          mood={state.plushMood} 
          reduceMotion={theme.reduceMotion}
          warmth={state.warmth}
          onAddWarmth={addWarmth}
        />

        {/* 2. Task Stack - Main Feature with Rainbow Border */}
        <DecoratedCard 
          variant="default" 
          decorationPattern="mixed"
          decorationDensity="medium"
        >
          <div className="mb-3">
            <div className="font-black uppercase text-lg mb-1">Your Tasks</div>
            <div className="text-black/60 text-xs">
              Swipe <span className="font-bold">Right ✓</span> to complete • 
              Swipe <span className="font-bold">Left ✗</span> to skip
            </div>
          </div>

          <TaskStack
            tasks={pendingTasks}
            onTaskComplete={handleTaskComplete}
            onTaskSkip={handleTaskSkip}
          />

          {/* Add Task Button (shown when all tasks are done) */}
          {pendingCount === 0 && (
            <div className="mt-6 pt-6 border-t-[3px] border-black/10">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">🎉</div>
                <div className="font-black uppercase text-lg">All Done!</div>
                <div className="text-black/60 text-sm">Want to add more tasks?</div>
              </div>
              
              <div className="space-y-3">
                <Input
                  value={newTaskTitle}
                  onChange={setNewTaskTitle}
                  placeholder="e.g., wrap the gift ribbon / text an old friend"
                  className="w-full"
                />
                <Button onClick={handleAddTask} className="w-full">
                  <Plus size={18} className="inline mr-2" />
                  Add Another Task
                </Button>
              </div>
            </div>
          )}
        </DecoratedCard>

        {/* 3. Today's Progress with Mint Border & Heart Decorations */}
        <DecoratedCard 
          variant="mint"
          decorationPattern="hearts"
          decorationDensity="low"
        >
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[var(--hot-pink)] to-[var(--coral)] border-[3px] border-[var(--hot-pink)] shadow-button">
                <HeartIcon size={20} variant="default" animated />
              </div>
              <div>
                <div className="font-black text-sm uppercase">Progress</div>
                <div className="text-black/60 text-[10px]">No guilt. Just momentum.</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="success">{doneCount}</Badge>
              <Badge variant="warning">{restCount}</Badge>
              <Badge variant="info">{pendingCount}</Badge>
            </div>
          </div>
          
          {/* Test Button - Create Sample Goals */}
          <div className="mt-3 pt-3 border-t-[3px] border-black/10">
            <CreateMultipleGoalsButton />
          </div>
          
          {/* Reset Button */}
          <button
            onClick={() => {
              if (window.confirm("🔄 Reset all data? This will:\n\n• Clear all tasks\n• Reset warmth to 30\n• Reset streak to 0\n• Delete all moments\n\nThis cannot be undone!")) {
                resetAll();
              }
            }}
            className="w-full mt-3 pt-3 border-t-[3px] border-black/10 flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-br from-[var(--fire-orange)] to-[var(--fire-red)] hover:from-[var(--fire-red)] hover:to-[var(--fire-orange)] border-[3px] border-[var(--fire-red)] shadow-button text-white font-bold text-sm uppercase transition-all hover:scale-105 active:scale-95"
          >
            <RotateCcw size={16} strokeWidth={3} />
            Reset All Data
          </button>
        </DecoratedCard>
      </div>

      {/* Floating Add Button (shown when there are pending tasks) */}
      {pendingCount > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const title = prompt("Add a new task:");
            if (title && title.trim()) {
              addTask(title);
            }
          }}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-br from-[var(--hot-pink)] to-[var(--fire-red)] border-[4px] border-white shadow-card flex items-center justify-center text-white z-50"
        >
          <Plus size={32} strokeWidth={3} />
        </motion.button>
      )}

      {/* Task Completion Modal */}
      <TaskCompletionModal
        isOpen={completionModalOpen}
        onClose={() => setCompletionModalOpen(false)}
        onSubmit={handleCompletionSubmit}
        taskTitle={completedTaskTitle}
      />
    </Shell>
  );
}