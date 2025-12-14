/**
 * Create Recurring Task Button
 * For testing purposes - creates a sample 30-day recurring task
 */

import React from "react";
import { Button } from "../framework";
import { Target } from "lucide-react";
import { useGiftApp } from "../hooks/useGiftApp";
import { getDayKey } from "../framework";

export function CreateRecurringTaskButton() {
  const { addTask } = useGiftApp();

  const handleCreateSampleTask = () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 15); // Start 15 days ago
    
    const completionHistory = [];
    for (let i = 0; i < 15; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      
      // 80% chance of completion for testing
      const completed = Math.random() > 0.2;
      
      completionHistory.push({
        date: dateStr,
        completed,
        note: completed ? `Completed day ${i + 1}!` : undefined,
      });
    }

    // Create the recurring task (master task)
    const recurringTaskId = `task_${Date.now()}_recurring`;
    addTask("Run 5km every day", {
      type: "recurring",
      recurringGoal: {
        totalDays: 30,
        startDate: startDate.toISOString().split('T')[0],
        reward: {
          title: "Wedding Anniversary Photo Shoot Voucher",
          description: "Professional photo session at the best studio in town with your wife ❤️",
          imageUrl: "https://images.unsplash.com/photo-1627364155535-9ed50e63aece?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHklMjBjb3VwbGUlMjB2b3VjaGVyfGVufDF8fHx8MTc2NTcwMTk2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
        },
      },
      completionHistory,
    });
    
    // Create today's linked task
    const todayKey = getDayKey();
    const todayCompletion = completionHistory.find(h => h.date === todayKey);
    
    if (!todayCompletion || !todayCompletion.completed) {
      // Only create today's task if it's not already completed
      setTimeout(() => {
        addTask("🏃 Run 5km", {
          note: "Part of your 30-day challenge! Keep going! 💪",
          linkedRecurringTaskId: recurringTaskId,
        });
      }, 100);
    }
  };

  return (
    <Button
      variant="primary"
      onClick={handleCreateSampleTask}
      className="flex items-center gap-2"
    >
      <Target size={16} />
      Create Sample Goal
    </Button>
  );
}