/**
 * Gift App Types
 * Application-specific type definitions
 */

import type { BaseEntity } from "../framework";

// ==================== Task Types ====================

export type TaskStatus = "pending" | "done" | "rest";

export type TaskType = "single" | "recurring";

export type RecurringTaskCompletion = {
  date: string; // YYYY-MM-DD
  completed: boolean;
  note?: string;
  photoDataUrl?: string;
};

export type TaskReward = {
  title: string;
  description?: string;
  imageUrl?: string; // From Unsplash or user upload
};

export type Task = BaseEntity & {
  title: string;
  note?: string;
  status: TaskStatus;
  
  // Recurring task fields
  type?: TaskType; // Default: "single"
  recurringGoal?: {
    totalDays: number; // e.g., 30 days
    startDate: string; // YYYY-MM-DD
    reward?: TaskReward; // Reward after completion
    witnessIds?: string[]; // Friend IDs who can see this goal
  };
  completionHistory?: RecurringTaskCompletion[]; // For recurring tasks
  
  // Link to recurring task (for daily tasks)
  linkedRecurringTaskId?: string;
};

// ==================== Moment Types ====================

export type Moment = BaseEntity & {
  text: string;
  photoDataUrl?: string;
  linkedTaskId?: string;
};

// AI Video 类型
export type AIVideo = BaseEntity & {
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string; // 可选，未来实际生成视频时使用
  tasksSnapshot: number; // 生成时的任务数
  warmthSnapshot: number; // 生成时的 warmth 值
  generatedAt: number; // 生成时间戳
};

// ==================== Friend Types ====================

export type Friend = BaseEntity & {
  name: string;
  avatarUrl?: string;
  warmth: number;
  streak: number;
  lastActive: number;
  recentVideos: AIVideo[];
};

// ==================== App State Types ====================

export type PlushMood = "sleepy" | "calm" | "happy" | "spark";

export type GiftAppState = {
  warmth: number;
  streak: number;
  lastActiveDayKey: string;
  plushMood: PlushMood;
  tasksByDay: Record<string, Task[]>;
  moments: Moment[];
  aiVideos: AIVideo[]; // AI 视频历史
  friends?: Friend[]; // 好友列表
};