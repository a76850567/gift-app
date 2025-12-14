/**
 * Me Page - Redesigned (包含 SETTINGS)
 * 个人页 / 系统关系层
 * "我的当前状态概览"
 */

import React from "react";
import { Shell, PageHeader, Card, Button, Checkbox, Badge } from "../framework";
import { useTheme } from "../framework/hooks";
import { useGiftApp } from "../hooks/useGiftApp";
import type { ThemeColor } from "../framework";
import { FlameIcon } from "../components/icons/FlameIcon";
import { HeartIcon } from "../components/icons/HeartIcon";
import { motion } from "motion/react";
import { Sparkles, Calendar, CheckCircle2, Settings as SettingsIcon } from "lucide-react";

const COLOR_OPTIONS: Array<{ value: ThemeColor; label: string }> = [
  { value: "pink", label: "Pink" },
  { value: "orange", label: "Orange" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "green", label: "Green" },
];

export function MePage() {
  const { state, resetAll, getAllTasks } = useGiftApp();
  const { theme, setAccent, setReduceMotion } = useTheme({
    accent: "pink",
    reduceMotion: false,
  });
  
  const [showSettings, setShowSettings] = React.useState(false);
  
  // 统计数据
  const stats = React.useMemo(() => {
    const allTasks = getAllTasks();
    const completedTasks = allTasks.filter(t => t.status === "done");
    return {
      totalTasks: allTasks.length,
      completedTasks: completedTasks.length,
      warmth: state.warmth,
      streak: state.streak,
      moments: state.moments.length,
      activeDays: Object.keys(state.tasksByDay).length,
    };
  }, [getAllTasks, state]);
  
  return (
    <Shell>
      <PageHeader
        subtitle="Profile"
        title="This is you."
      />

      {/* 个人状态卡片 */}
      <div className="mt-4 rounded-[2rem] border-[4px] border-black/20 bg-gradient-to-br from-[var(--hot-pink)]/20 via-[var(--fire-orange)]/20 to-[var(--sky-blue)]/20 backdrop-blur shadow-card p-6">
        <div className="text-center mb-6">
          {/* 头像占位 */}
          <motion.div
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[var(--hot-pink)] to-[var(--fire-orange)] border-[4px] border-white shadow-button flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles size={40} className="text-white" strokeWidth={3} />
          </motion.div>
          
          <div className="font-black text-xl mt-4">Gift App User</div>
          <div className="text-sm text-black/60 mt-1">Member since {new Date(state.tasksByDay[Object.keys(state.tasksByDay)[0]]?.[0]?.createdAt || Date.now()).toLocaleDateString()}</div>
        </div>

        {/* 核心指标 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/60 border-[3px] border-white p-3 text-center">
            <FlameIcon size={20} variant="intense" animated className="mx-auto mb-1" />
            <div className="font-black text-2xl">{stats.warmth}</div>
            <div className="text-xs text-black/60 uppercase font-bold">Warmth</div>
          </div>
          
          <div className="rounded-xl bg-white/60 border-[3px] border-white p-3 text-center">
            <Calendar size={20} className="mx-auto mb-1 text-[var(--fire-orange)]" strokeWidth={3} />
            <div className="font-black text-2xl">{stats.streak}</div>
            <div className="text-xs text-black/60 uppercase font-bold">Day Streak</div>
          </div>
        </div>
      </div>

      {/* 使用轨迹摘要 */}
      <div className="mt-4 space-y-3">
        <div className="font-black uppercase text-sm text-black/60 px-2">Activity Summary</div>
        
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-[1.5rem] border-[3px] border-black/20 bg-white/90 backdrop-blur shadow-card p-3 text-center">
            <div className="text-xl font-black text-[var(--neon-green)]">{stats.completedTasks}</div>
            <div className="text-xs text-black/60 uppercase font-bold mt-1">Tasks Done</div>
          </div>
          
          <div className="rounded-[1.5rem] border-[3px] border-black/20 bg-white/90 backdrop-blur shadow-card p-3 text-center">
            <div className="text-xl font-black text-[var(--sky-blue)]">{stats.moments}</div>
            <div className="text-xs text-black/60 uppercase font-bold mt-1">Moments</div>
          </div>
          
          <div className="rounded-[1.5rem] border-[3px] border-black/20 bg-white/90 backdrop-blur shadow-card p-3 text-center">
            <div className="text-xl font-black text-[var(--hot-pink)]">{stats.activeDays}</div>
            <div className="text-xs text-black/60 uppercase font-bold mt-1">Active Days</div>
          </div>
        </div>
      </div>

      {/* Settings 切换按钮 */}
      <div className="mt-6">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full rounded-[1.5rem] border-[3px] border-black/20 bg-white/90 backdrop-blur shadow-card p-4 flex items-center justify-between hover:bg-white transition-colors"
        >
          <div className="flex items-center gap-3">
            <SettingsIcon size={20} strokeWidth={3} />
            <span className="font-bold">Settings</span>
          </div>
          <motion.div
            animate={{ rotate: showSettings ? 180 : 0 }}
            className="text-black/40"
          >
            ▼
          </motion.div>
        </button>
      </div>

      {/* Settings 展开区域 */}
      {showSettings && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-4 space-y-4"
        >
          {/* Theme */}
          <Card>
            <div className="font-semibold">Theme color</div>
            <div className="text-black/60 text-sm mt-1">Choose your accent color</div>
            <div className="mt-4 flex gap-2 flex-wrap">
              {COLOR_OPTIONS.map((color) => (
                <Button
                  key={color.value}
                  variant={theme.accent === color.value ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => setAccent(color.value)}
                >
                  {color.label}
                </Button>
              ))}
            </div>
          </Card>

          {/* Accessibility */}
          <Card>
            <div className="font-semibold">Accessibility</div>
            <div className="text-black/60 text-sm mt-1">Customize your experience</div>
            <div className="mt-4">
              <Checkbox
                checked={theme.reduceMotion}
                onChange={setReduceMotion}
                label="Reduce animations"
              />
            </div>
          </Card>

          {/* Danger zone */}
          <Card>
            <div className="font-semibold text-[var(--fire-red)]">Danger zone</div>
            <div className="text-black/60 text-sm mt-1">
              Reset all data (this cannot be undone)
            </div>
            <div className="mt-4">
              <Button
                variant="danger"
                onClick={() => {
                  if (window.confirm("🔄 Are you sure? This will delete:\n\n• All tasks\n• All moments\n• Warmth & streak\n\nThis cannot be undone!")) {
                    resetAll();
                  }
                }}
              >
                Reset all data
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </Shell>
  );
}
