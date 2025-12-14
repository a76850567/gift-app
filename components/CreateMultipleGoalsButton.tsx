/**
 * Create Multiple Goals Button
 * For testing purposes - creates several sample recurring tasks with different durations
 */

import React from "react";
import { Button } from "../framework";
import { Sparkles } from "lucide-react";
import { useGiftApp } from "../hooks/useGiftApp";
import { getDayKey } from "../framework";

const GOAL_TEMPLATES = [
  {
    title: "Run 5km every day",
    emoji: "🏃",
    totalDays: 30,
    daysAgo: 20,
    completionRate: 0.85,
    reward: {
      title: "Wedding Anniversary Photo Shoot",
      description: "Professional photo session at the best studio in town with your wife ❤️",
      imageUrl: "https://images.unsplash.com/photo-1627364155535-9ed50e63aece?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwcGhvdG9ncmFwaHklMjBjb3VwbGUlMjB2b3VjaGVyfGVufDF8fHx8MTc2NTcwMTk2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
  },
  {
    title: "Read for 30 minutes",
    emoji: "📚",
    totalDays: 60,
    daysAgo: 35,
    completionRate: 0.75,
    reward: {
      title: "Bookstore Shopping Voucher",
      description: "$100 gift card for your favorite bookstore 📖",
      imageUrl: "https://images.unsplash.com/photo-1707142979946-a745d1d0092c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWFkaW5nJTIwYm9vayUyMGNvZmZlZXxlbnwxfHx8fDE3NjU2OTc5MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  },
  {
    title: "Meditate for 10 minutes",
    emoji: "🧘",
    totalDays: 21,
    daysAgo: 14,
    completionRate: 0.9,
    reward: {
      title: "Premium Spa Massage Session",
      description: "90-minute full body massage at luxury spa 💆",
      imageUrl: "https://images.unsplash.com/photo-1667061481921-b31e615ae740?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwc3BhJTIwd2VsbG5lc3N8ZW58MXx8fHwxNjU3MDIyNDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  },
  {
    title: "Write a love note to my wife",
    emoji: "💌",
    totalDays: 14,
    daysAgo: 7,
    completionRate: 1.0,
    reward: {
      title: "Romantic Dinner at 5-Star Restaurant",
      description: "Chef's tasting menu for two at the finest restaurant 🍷",
      imageUrl: "https://images.unsplash.com/photo-1680079033073-860e3b9c2094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMGRpbm5lciUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY1NzAyMjQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  },
  {
    title: "Practice coding new skills",
    emoji: "💻",
    totalDays: 45,
    daysAgo: 28,
    completionRate: 0.7,
    reward: {
      title: "Premium Online Course Access",
      description: "Annual subscription to your favorite learning platform 🎓",
      imageUrl: "https://images.unsplash.com/photo-1762330916233-221b49fce7f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBjb3Vyc2UlMjBsZWFybmluZ3xlbnwxfHx8fDE3NjU2NDc3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  },
  {
    title: "Workout at the gym",
    emoji: "💪",
    totalDays: 30,
    daysAgo: 18,
    completionRate: 0.8,
    reward: {
      title: "Premium Gym Membership Upgrade",
      description: "3 months of personal training sessions included 🏋️",
      imageUrl: "https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29ya291dCUyMGd5bXxlbnwxfHx8fDE3NjU2NDcxNDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  },
];

export function CreateMultipleGoalsButton() {
  const { addTask, getAllTasks } = useGiftApp();

  const handleCreateMultipleGoals = () => {
    const existingTasks = getAllTasks();
    const hasRecurringTasks = existingTasks.some(t => t.type === "recurring");
    
    if (hasRecurringTasks) {
      alert("Goals already created! Delete existing goals first to recreate.");
      return;
    }

    GOAL_TEMPLATES.forEach((template, templateIndex) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - template.daysAgo);
      
      const completionHistory = [];
      
      // Generate completion history for all days up to today
      for (let i = 0; i < template.daysAgo; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        
        // Use completion rate to determine if day was completed
        const completed = Math.random() < template.completionRate;
        
        completionHistory.push({
          date: dateStr,
          completed,
          note: completed ? `${template.emoji} Day ${i + 1} completed!` : undefined,
        });
      }

      // Create the recurring task (master task)
      const recurringTaskId = `task_${Date.now()}_${templateIndex}_recurring`;
      
      setTimeout(() => {
        addTask(template.title, {
          type: "recurring",
          recurringGoal: {
            totalDays: template.totalDays,
            startDate: startDate.toISOString().split('T')[0],
            reward: template.reward,
          },
          completionHistory,
        });
        
        // Create today's linked task only if not completed yet
        const todayKey = getDayKey();
        const todayCompletion = completionHistory.find(h => h.date === todayKey);
        
        if (!todayCompletion || !todayCompletion.completed) {
          // Only create today's task if current progress is less than total days
          if (template.daysAgo < template.totalDays) {
            setTimeout(() => {
              addTask(`${template.emoji} ${template.title.split(' ').slice(0, 3).join(' ')}`, {
                note: `Part of your ${template.totalDays}-day challenge! Keep it up! 💪`,
                linkedRecurringTaskId: recurringTaskId,
              });
            }, 100 + templateIndex * 50);
          }
        }
      }, templateIndex * 100);
    });
  };

  return (
    <Button 
      onClick={handleCreateMultipleGoals}
      variant="primary"
      className="w-full"
    >
      <Sparkles size={18} className="inline mr-2" />
      Create Sample Goals
    </Button>
  );
}