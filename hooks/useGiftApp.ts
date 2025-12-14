/**
 * useGiftApp Hook
 * Main application state management
 */

import { useState, useEffect, useMemo } from "react";
import {
  useLocalStorage,
  getDayKey,
  getYesterdayKey,
  generateId,
  clamp,
} from "../framework";
import type {
  GiftAppState,
  Task,
  Moment,
  PlushMood,
  AIVideo,
} from "../types/gift";

const STORAGE_KEY = "gift_app_state_v2";

// ==================== Helpers ====================

function computePlushMood(warmth: number): PlushMood {
  if (warmth >= 120) return "spark";
  if (warmth >= 60) return "happy";
  if (warmth >= 20) return "calm";
  return "sleepy";
}

function defaultTasks(): Task[] {
  return [
    {
      id: generateId("task"),
      title: "Take a 5-minute walk outside",
      note: "Fresh air helps clear your mind.",
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId("task"),
      title: "Drink a glass of water",
      note: "Stay hydrated, stay healthy.",
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId("task"),
      title: "Send a kind message to someone",
      note: "Old friends deserve a warm hello.",
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId("task"),
      title: "Organize one small area",
      note: "A clean space brings peace.",
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: generateId("task"),
      title: "Write down one thing you're grateful for",
      note: "Gratitude opens the heart.",
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];
}

// Create default long-term recurring goals with realistic progress
function defaultRecurringTasks(): Task[] {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 15); // Started 15 days ago
  
  // Helper to generate realistic history
  const generateHistory = (totalDays: number, completionRate: number) => {
    const history: Array<{ date: string; completed: boolean }> = [];
    for (let i = 0; i < totalDays; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      history.push({
        date: date.toISOString().split('T')[0],
        completed: Math.random() < completionRate,
      });
    }
    return history;
  };
  
  return [
    {
      id: generateId("task"),
      title: "🏃 Run 5km every day",
      note: "Building endurance and discipline",
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      type: "recurring",
      recurringGoal: {
        totalDays: 30,
        startDate: startDate.toISOString().split('T')[0],
        reward: {
          title: "New Running Shoes",
          description: "Treat yourself to professional running gear!",
          imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
        },
      },
      completionHistory: generateHistory(15, 0.7), // 70% completion rate
    },
    {
      id: generateId("task"),
      title: "📚 Read 30 pages daily",
      note: "Expanding knowledge and imagination",
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      type: "recurring",
      recurringGoal: {
        totalDays: 30,
        startDate: startDate.toISOString().split('T')[0],
        reward: {
          title: "Buy 3 New Books",
          description: "Get those books you've been wanting!",
          imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop",
        },
      },
      completionHistory: generateHistory(15, 0.85), // 85% completion rate
    },
    {
      id: generateId("task"),
      title: "🧘 Meditate for 10 minutes",
      note: "Cultivating inner peace and mindfulness",
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      type: "recurring",
      recurringGoal: {
        totalDays: 21,
        startDate: startDate.toISOString().split('T')[0],
        reward: {
          title: "Meditation Cushion",
          description: "A comfortable zafu for your practice",
          imageUrl: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop",
        },
      },
      completionHistory: generateHistory(15, 0.6), // 60% completion rate
    },
    {
      id: generateId("task"),
      title: "💌 Write a love note",
      note: "Expressing gratitude and affection daily",
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      type: "recurring",
      recurringGoal: {
        totalDays: 30,
        startDate: startDate.toISOString().split('T')[0],
        reward: {
          title: "Romantic Dinner Date",
          description: "A special evening to celebrate your love",
          imageUrl: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
        },
      },
      completionHistory: generateHistory(15, 0.9), // 90% completion rate - very dedicated!
    },
    {
      id: generateId("task"),
      title: "💻 Code for 2 hours",
      note: "Learning new programming skills",
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      type: "recurring",
      recurringGoal: {
        totalDays: 30,
        startDate: startDate.toISOString().split('T')[0],
        reward: {
          title: "Mechanical Keyboard",
          description: "Upgrade your coding setup!",
          imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
        },
      },
      completionHistory: generateHistory(15, 0.75), // 75% completion rate
    },
    {
      id: generateId("task"),
      title: "💪 Workout at the gym",
      note: "Building strength and health",
      status: "pending",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      type: "recurring",
      recurringGoal: {
        totalDays: 30,
        startDate: startDate.toISOString().split('T')[0],
        reward: {
          title: "Fitness Tracker Watch",
          description: "Track your progress with smart tech!",
          imageUrl: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=300&fit=crop",
        },
      },
      completionHistory: generateHistory(15, 0.65), // 65% completion rate
    },
  ];
}

function createInitialState(): GiftAppState {
  const today = getDayKey();
  
  // Create historical data for the past 7 days
  const tasksByDay: Record<string, Task[]> = {};
  
  // Generate tasks for past days (7 days of history)
  for (let i = 7; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayKey = date.toISOString().split('T')[0];
    
    if (i === 0) {
      // Today: recurring goals + fresh daily tasks
      tasksByDay[dayKey] = [
        ...defaultRecurringTasks(),
        ...defaultTasks(),
      ];
    } else {
      // Past days: generate completed/rest tasks with variety
      const pastTasks: Task[] = [];
      
      // Vary task count: some days have more tasks (3-7 tasks)
      let numTasks: number;
      let taskSuccessRate: number;
      
      // Create different patterns:
      // - High achievement days (5-7 tasks, 90% success) 
      // - Normal days (4-5 tasks, 70% success)
      // - Relaxed days (3-4 tasks, 50% success)
      const dayType = i % 3;
      if (dayType === 0) {
        // High achievement day
        numTasks = 5 + Math.floor(Math.random() * 3); // 5-7 tasks
        taskSuccessRate = 0.9; // 90% done
      } else if (dayType === 1) {
        // Normal day
        numTasks = 4 + Math.floor(Math.random() * 2); // 4-5 tasks
        taskSuccessRate = 0.7; // 70% done
      } else {
        // Relaxed day
        numTasks = 3 + Math.floor(Math.random() * 2); // 3-4 tasks
        taskSuccessRate = 0.5; // 50% done, 30% rest
      }
      
      for (let j = 0; j < numTasks; j++) {
        const taskTemplates = [
          { title: "Take a morning walk", note: "Fresh air energizes the day" },
          { title: "Drink water", note: "Staying hydrated" },
          { title: "Read for 20 minutes", note: "Feeding the mind" },
          { title: "Practice gratitude", note: "Appreciating the little things" },
          { title: "Stretch & breathe", note: "Body needs movement" },
          { title: "Tidy workspace", note: "Clear space, clear mind" },
          { title: "Call a friend", note: "Maintaining connections" },
          { title: "Cook a healthy meal", note: "Nourishing the body" },
          { title: "Write in journal", note: "Reflection brings clarity" },
          { title: "Listen to music", note: "Sound heals the soul" },
        ];
        
        const template = taskTemplates[Math.floor(Math.random() * taskTemplates.length)];
        const rand = Math.random();
        
        // Status distribution based on success rate
        let status: "done" | "rest" | "pending";
        if (rand < taskSuccessRate) {
          status = "done";
        } else if (rand < taskSuccessRate + 0.2) {
          status = "rest";
        } else {
          status = "pending";
        }
        
        pastTasks.push({
          id: generateId("task"),
          title: template.title,
          note: template.note,
          status,
          createdAt: date.getTime(),
          updatedAt: date.getTime(),
        });
      }
      
      tasksByDay[dayKey] = pastTasks;
    }
  }
  
  return {
    warmth: 30, // Start with some warmth to show 2 dancing figures (calm mood)
    streak: 3, // Show a 3-day streak
    lastActiveDayKey: today,
    plushMood: "calm",
    tasksByDay,
    moments: [],
    aiVideos: [ // 添加一些默认 AI 视频
      {
        id: generateId("video"),
        title: "Journey of Growth",
        description: "47 tasks completed, 30 warmth collected. Every step counts.",
        thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop",
        tasksSnapshot: 47,
        warmthSnapshot: 30,
        generatedAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
        createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
        updatedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
      },
      {
        id: generateId("video"),
        title: "Moments That Matter",
        description: "A visual celebration of your 3-day streak and 52 achievements.",
        thumbnailUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400&h=300&fit=crop",
        tasksSnapshot: 52,
        warmthSnapshot: 35,
        generatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
        createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
        updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
      },
      {
        id: generateId("video"),
        title: "Steps Forward",
        description: "Capturing 39 moments of growth with 28 units of warmth.",
        thumbnailUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop",
        tasksSnapshot: 39,
        warmthSnapshot: 28,
        generatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
        createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
        updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
      },
      {
        id: generateId("video"),
        title: "Life in Motion",
        description: "3 days of showing up, 44 tasks conquered.",
        thumbnailUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop",
        tasksSnapshot: 44,
        warmthSnapshot: 32,
        generatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 day ago
        createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
        updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
      },
      {
        id: generateId("video"),
        title: "Progress Chronicle",
        description: "A visual story of your 3-day journey with 56 achievements and 38 warmth.",
        thumbnailUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        tasksSnapshot: 56,
        warmthSnapshot: 38,
        generatedAt: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
        createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
        updatedAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
      },
      {
        id: generateId("video"),
        title: "Dance of Days",
        description: "61 tasks completed with dedication. Your warmth shines at 42.",
        thumbnailUrl: "https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=400&h=300&fit=crop",
        tasksSnapshot: 61,
        warmthSnapshot: 42,
        generatedAt: Date.now() - 14 * 24 * 60 * 60 * 1000, // 14 days ago
        createdAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
        updatedAt: Date.now() - 14 * 24 * 60 * 60 * 1000,
      },
    ],
    friends: [ // 添加示例好友数据
      {
        id: generateId("friend"),
        name: "Emma Chen",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
        warmth: 85,
        streak: 12,
        lastActive: Date.now() - 2 * 60 * 60 * 1000,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        recentVideos: [
          {
            id: generateId("video"),
            title: "Morning Routine Mastery",
            description: "72 tasks completed, warmth level at 85",
            thumbnailUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=400&h=300&fit=crop",
            tasksSnapshot: 72,
            warmthSnapshot: 85,
            generatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
            createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
            updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
          },
          {
            id: generateId("video"),
            title: "Fitness Journey Week 2",
            description: "Consistency is key - 12 day streak!",
            thumbnailUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop",
            tasksSnapshot: 65,
            warmthSnapshot: 78,
            generatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
            createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
            updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
          },
        ],
      },
      {
        id: generateId("friend"),
        name: "Alex Kim",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
        warmth: 120,
        streak: 21,
        lastActive: Date.now() - 30 * 60 * 1000,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        recentVideos: [
          {
            id: generateId("video"),
            title: "Coding Marathon Success",
            description: "3 weeks of daily commits!",
            thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
            tasksSnapshot: 98,
            warmthSnapshot: 120,
            generatedAt: Date.now() - 6 * 60 * 60 * 1000,
            createdAt: Date.now() - 6 * 60 * 60 * 1000,
            updatedAt: Date.now() - 6 * 60 * 60 * 1000,
          },
        ],
      },
      {
        id: generateId("friend"),
        name: "Sophie Lee",
        avatarUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
        warmth: 150,
        streak: 30,
        lastActive: Date.now() - 10 * 60 * 1000,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        recentVideos: [
          {
            id: generateId("video"),
            title: "30-Day Yoga Journey Complete",
            description: "A whole month of daily practice!",
            thumbnailUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
            tasksSnapshot: 125,
            warmthSnapshot: 150,
            generatedAt: Date.now() - 3 * 60 * 60 * 1000,
            createdAt: Date.now() - 3 * 60 * 60 * 1000,
            updatedAt: Date.now() - 3 * 60 * 60 * 1000,
          },
          {
            id: generateId("video"),
            title: "Art Every Day - Week 4",
            description: "30 days of creative expression",
            thumbnailUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop",
            tasksSnapshot: 118,
            warmthSnapshot: 145,
            generatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
            createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
            updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
          },
        ],
      },
      {
        id: generateId("friend"),
        name: "Jake Thompson",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
        warmth: 95,
        streak: 15,
        lastActive: Date.now() - 5 * 60 * 60 * 1000,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        recentVideos: [
          {
            id: generateId("video"),
            title: "Guitar Practice Daily",
            description: "15 days of consistent practice",
            thumbnailUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop",
            tasksSnapshot: 78,
            warmthSnapshot: 95,
            generatedAt: Date.now() - 12 * 60 * 60 * 1000,
            createdAt: Date.now() - 12 * 60 * 60 * 1000,
            updatedAt: Date.now() - 12 * 60 * 60 * 1000,
          },
        ],
      },
      {
        id: generateId("friend"),
        name: "Mia Rodriguez",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
        warmth: 45,
        streak: 5,
        lastActive: Date.now() - 1 * 24 * 60 * 60 * 1000,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        recentVideos: [
          {
            id: generateId("video"),
            title: "Reading Challenge Started",
            description: "Building the habit one page at a time",
            thumbnailUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
            tasksSnapshot: 32,
            warmthSnapshot: 45,
            generatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
            createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
            updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
          },
          {
            id: generateId("video"),
            title: "Meditation Moments",
            description: "Finding peace in daily practice",
            thumbnailUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
            tasksSnapshot: 28,
            warmthSnapshot: 38,
            generatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
            createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
            updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
          },
        ],
      },
      {
        id: generateId("friend"),
        name: "David Park",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        warmth: 62,
        streak: 8,
        lastActive: Date.now() - 3 * 24 * 60 * 60 * 1000,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        recentVideos: [
          {
            id: generateId("video"),
            title: "Photography Challenge Week 1",
            description: "Capturing beauty every day",
            thumbnailUrl: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop",
            tasksSnapshot: 48,
            warmthSnapshot: 62,
            generatedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
            createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
            updatedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
          },
          {
            id: generateId("video"),
            title: "Learning Spanish Daily",
            description: "Duolingo streak going strong",
            thumbnailUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
            tasksSnapshot: 42,
            warmthSnapshot: 55,
            generatedAt: Date.now() - 8 * 24 * 60 * 60 * 1000,
            createdAt: Date.now() - 8 * 24 * 60 * 60 * 1000,
            updatedAt: Date.now() - 8 * 24 * 60 * 60 * 1000,
          },
        ],
      },
      {
        id: generateId("friend"),
        name: "Olivia Martinez",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
        warmth: 105,
        streak: 18,
        lastActive: Date.now() - 45 * 60 * 1000,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        recentVideos: [
          {
            id: generateId("video"),
            title: "Plant Care Routine",
            description: "Nurturing 18 days of green growth",
            thumbnailUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop",
            tasksSnapshot: 82,
            warmthSnapshot: 105,
            generatedAt: Date.now() - 8 * 60 * 60 * 1000,
            createdAt: Date.now() - 8 * 60 * 60 * 1000,
            updatedAt: Date.now() - 8 * 60 * 60 * 1000,
          },
          {
            id: generateId("video"),
            title: "Baking Adventures",
            description: "New recipe every other day",
            thumbnailUrl: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=300&fit=crop",
            tasksSnapshot: 75,
            warmthSnapshot: 98,
            generatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
            createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
            updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
          },
          {
            id: generateId("video"),
            title: "Evening Walks",
            description: "Exploring the neighborhood daily",
            thumbnailUrl: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400&h=300&fit=crop",
            tasksSnapshot: 68,
            warmthSnapshot: 90,
            generatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
            createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
            updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
          },
        ],
      },
      {
        id: generateId("friend"),
        name: "Liam Foster",
        avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face",
        warmth: 78,
        streak: 10,
        lastActive: Date.now() - 15 * 60 * 1000,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        recentVideos: [
          {
            id: generateId("video"),
            title: "Podcast Production Journey",
            description: "Recording daily episodes for 10 days",
            thumbnailUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=300&fit=crop",
            tasksSnapshot: 65,
            warmthSnapshot: 78,
            generatedAt: Date.now() - 4 * 60 * 60 * 1000,
            createdAt: Date.now() - 4 * 60 * 60 * 1000,
            updatedAt: Date.now() - 4 * 60 * 60 * 1000,
          },
          {
            id: generateId("video"),
            title: "Writing Habit Building",
            description: "1000 words every morning",
            thumbnailUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
            tasksSnapshot: 58,
            warmthSnapshot: 70,
            generatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
            createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
            updatedAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
          },
        ],
      },
      {
        id: generateId("friend"),
        name: "Zara Williams",
        avatarUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop&crop=face",
        warmth: 138,
        streak: 25,
        lastActive: Date.now() - 20 * 60 * 1000,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        recentVideos: [
          {
            id: generateId("video"),
            title: "Dance Practice Every Day",
            description: "25 days of movement and rhythm",
            thumbnailUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop",
            tasksSnapshot: 110,
            warmthSnapshot: 138,
            generatedAt: Date.now() - 6 * 60 * 60 * 1000,
            createdAt: Date.now() - 6 * 60 * 60 * 1000,
            updatedAt: Date.now() - 6 * 60 * 60 * 1000,
          },
          {
            id: generateId("video"),
            title: "Healthy Meal Prep",
            description: "Nutrition and wellness journey",
            thumbnailUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
            tasksSnapshot: 102,
            warmthSnapshot: 130,
            generatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
            createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
            updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
          },
          {
            id: generateId("video"),
            title: "Mindfulness & Stretching",
            description: "Starting each day with intention",
            thumbnailUrl: "https://images.unsplash.com/photo-1447452001602-7090c7ab2db3?w=400&h=300&fit=crop",
            tasksSnapshot: 95,
            warmthSnapshot: 122,
            generatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
            createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
            updatedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
          },
        ],
      },
      {
        id: generateId("friend"),
        name: "Marcus Chen",
        avatarUrl: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=face",
        warmth: 52,
        streak: 7,
        lastActive: Date.now() - 6 * 60 * 60 * 1000,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        recentVideos: [
          {
            id: generateId("video"),
            title: "Basketball Training Week 1",
            description: "Shooting hoops every evening",
            thumbnailUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
            tasksSnapshot: 38,
            warmthSnapshot: 52,
            generatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
            createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
            updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
          },
          {
            id: generateId("video"),
            title: "Study Session Consistency",
            description: "Exam prep in full swing",
            thumbnailUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
            tasksSnapshot: 35,
            warmthSnapshot: 48,
            generatedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
            createdAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
            updatedAt: Date.now() - 4 * 24 * 60 * 60 * 1000,
          },
        ],
      },
    ],
  };
}

// ==================== Hook ====================

export function useGiftApp() {
  const [state, setState] = useLocalStorage<GiftAppState>(
    STORAGE_KEY,
    createInitialState(),
  );

  // Migration: 确保旧数据有 aiVideos 字段
  useEffect(() => {
    if (!state.aiVideos) {
      setState((prev) => ({
        ...prev,
        aiVideos: [],
      }));
    }
    // Migration: 确保旧数据有 friends 字段
    if (!state.friends) {
      const initialState = createInitialState();
      setState((prev) => ({
        ...prev,
        friends: initialState.friends,
      }));
    }
  }, []);

  const todayKey = useMemo(() => getDayKey(), []);
  const todayTasks = state.tasksByDay[todayKey] || [];

  // Day rollover check
  useEffect(() => {
    if (state.lastActiveDayKey !== todayKey) {
      const yesterdayKey = getYesterdayKey();
      const hadDoneYesterday = (
        state.tasksByDay[yesterdayKey] || []
      ).some((t) => t.status === "done");

      const nextStreak = hadDoneYesterday
        ? state.streak + 1
        : 0;

      setState((prev) => {
        const tasksByDay = { ...prev.tasksByDay };
        if (!tasksByDay[todayKey]) {
          tasksByDay[todayKey] = defaultTasks();
        }

        return {
          ...prev,
          streak: nextStreak,
          lastActiveDayKey: todayKey,
          plushMood: computePlushMood(prev.warmth),
          tasksByDay,
        };
      });
    }
  }, [
    todayKey,
    state.lastActiveDayKey,
    state.streak,
    state.tasksByDay,
    setState,
  ]);

  // ==================== Task Actions ====================

  function addTask(
    title: string, 
    options?: { 
      note?: string; 
      type?: "single" | "recurring";
      recurringGoal?: { 
        totalDays: number; 
        startDate: string;
        reward?: {
          title: string;
          description?: string;
          imageUrl?: string;
        };
      };
      completionHistory?: Array<{ date: string; completed: boolean; note?: string; photoDataUrl?: string }>;
      linkedRecurringTaskId?: string;
    }
  ) {
    const trimmed = title.trim();
    if (!trimmed) return;

    setState((prev) => {
      const newTask: Task = {
        id: generateId("task"),
        title: trimmed,
        note: options?.note,
        status: "pending",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        type: options?.type || "single",
        recurringGoal: options?.recurringGoal,
        completionHistory: options?.completionHistory,
        linkedRecurringTaskId: options?.linkedRecurringTaskId,
      };

      const tasks = [
        newTask,
        ...(prev.tasksByDay[todayKey] || []),
      ];

      return {
        ...prev,
        tasksByDay: { ...prev.tasksByDay, [todayKey]: tasks },
      };
    });
  }

  function updateTask(taskId: string, updates: Partial<Task>) {
    setState((prev) => {
      const tasks = (prev.tasksByDay[todayKey] || []).map(
        (t) =>
          t.id === taskId
            ? { ...t, ...updates, updatedAt: Date.now() }
            : t,
      );

      return {
        ...prev,
        tasksByDay: { ...prev.tasksByDay, [todayKey]: tasks },
      };
    });
  }

  function markTaskDone(taskId: string) {
    setState((prev) => {
      const tasks = (prev.tasksByDay[todayKey] || []).map(
        (t) =>
          t.id === taskId
            ? {
                ...t,
                status: "done" as const,
                updatedAt: Date.now(),
              }
            : t,
      );

      // Add warmth if task wasn't already done
      const prevTask = (prev.tasksByDay[todayKey] || []).find(
        (t) => t.id === taskId,
      );
      const warmthBonus =
        prevTask && prevTask.status !== "done" ? 5 : 0;
      const warmth = clamp(prev.warmth + warmthBonus, 0, 9999);

      // If this task is linked to a recurring task, update the recurring task's history
      const updatedTasksByDay = { ...prev.tasksByDay };
      if (prevTask?.linkedRecurringTaskId && prevTask.status !== "done") {
        // Find the recurring task
        Object.keys(updatedTasksByDay).forEach((dayKey) => {
          updatedTasksByDay[dayKey] = updatedTasksByDay[dayKey].map((task) => {
            if (task.id === prevTask.linkedRecurringTaskId && task.type === "recurring" && task.completionHistory) {
              // Update completion history for today
              const updatedHistory = [...task.completionHistory];
              const todayIndex = updatedHistory.findIndex((h) => h.date === todayKey);
              
              if (todayIndex >= 0) {
                updatedHistory[todayIndex] = {
                  ...updatedHistory[todayIndex],
                  completed: true,
                };
              } else {
                // Add new entry for today
                updatedHistory.push({
                  date: todayKey,
                  completed: true,
                });
              }
              
              return {
                ...task,
                completionHistory: updatedHistory,
                updatedAt: Date.now(),
              };
            }
            return task;
          });
        });
      }

      return {
        ...prev,
        warmth,
        plushMood: computePlushMood(warmth),
        tasksByDay: { ...updatedTasksByDay, [todayKey]: tasks },
      };
    });
  }

  function markTaskRest(taskId: string) {
    updateTask(taskId, { status: "rest" });
  }

  function deleteTask(taskId: string) {
    setState((prev) => {
      const tasks = (prev.tasksByDay[todayKey] || []).filter(
        (t) => t.id !== taskId,
      );

      return {
        ...prev,
        tasksByDay: { ...prev.tasksByDay, [todayKey]: tasks },
      };
    });
  }

  // ==================== Moment Actions ====================

  function addMoment(data: {
    text: string;
    photoDataUrl?: string;
    linkedTaskId?: string;
  }) {
    setState((prev) => {
      const newMoment: Moment = {
        id: generateId("moment"),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ...data,
      };

      return {
        ...prev,
        moments: [newMoment, ...prev.moments],
      };
    });
  }

  function deleteMoment(momentId: string) {
    setState((prev) => ({
      ...prev,
      moments: prev.moments.filter((m) => m.id !== momentId),
    }));
  }

  // ==================== Reset ====================

  function resetAll() {
    setState(createInitialState());
  }

  // ==================== Test Helpers ====================

  function addWarmth(amount: number) {
    setState((prev) => {
      const warmth = clamp(prev.warmth + amount, 0, 9999);
      return {
        ...prev,
        warmth,
        plushMood: computePlushMood(warmth),
      };
    });
  }

  // ==================== Computed Values ====================

  function getAllTasks(): Task[] {
    // Flatten all tasks from all days
    return Object.values(state.tasksByDay).flat();
  }

  // ==================== AI Video Actions ====================

  function generateAIVideo() {
    const allTasks = getAllTasks();
    const completedTasks = allTasks.filter(t => t.status === "done").length;
    
    // 生成 AI 视频标题和描述
    const titles = [
      "Journey of Growth",
      "Moments That Matter",
      "Steps Forward",
      "Your Story Unfolds",
      "Life in Motion",
      "Progress Chronicle",
      "Dance of Days",
    ];
    
    const descriptions = [
      `${completedTasks} tasks completed, ${state.warmth} warmth collected. Every step counts.`,
      `A visual celebration of your ${state.streak}-day streak and ${completedTasks} achievements.`,
      `Capturing ${completedTasks} moments of growth with ${state.warmth} units of warmth.`,
      `${state.streak} days of showing up, ${completedTasks} tasks conquered.`,
    ];
    
    setState((prev) => {
      const newVideo: AIVideo = {
        id: generateId("video"),
        title: titles[Math.floor(Math.random() * titles.length)],
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        thumbnailUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=300&fit=crop`,
        tasksSnapshot: completedTasks,
        warmthSnapshot: prev.warmth,
        generatedAt: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      
      return {
        ...prev,
        aiVideos: [newVideo, ...prev.aiVideos],
      };
    });
  }

  function deleteAIVideo(videoId: string) {
    setState((prev) => ({
      ...prev,
      aiVideos: prev.aiVideos.filter((v) => v.id !== videoId),
    }));
  }

  return {
    // State
    state,
    todayKey,
    todayTasks,

    // Task actions
    addTask,
    updateTask,
    markTaskDone,
    markTaskRest,
    deleteTask,

    // Moment actions
    addMoment,
    deleteMoment,

    // AI Video actions
    generateAIVideo,
    deleteAIVideo,

    // Utility
    resetAll,
    addWarmth,
    
    // Computed
    getAllTasks,
  };
}