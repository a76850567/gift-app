/**
 * EditGoalModal - 独立的长期目标编辑弹窗（使用 Portal）
 */

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, X, Gift } from "lucide-react";
import { CardDecorations } from "./CardDecorations";
import type { Task } from "../types/gift";
import { useGiftApp } from "../hooks/useGiftApp";

interface EditGoalModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export function EditGoalModal({ task, isOpen, onClose }: EditGoalModalProps) {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedNote, setEditedNote] = useState(task.note || "");
  const [editedRewardTitle, setEditedRewardTitle] = useState(task.recurringGoal?.reward?.title || "");
  const [editedRewardDesc, setEditedRewardDesc] = useState(task.recurringGoal?.reward?.description || "");
  const { updateTask } = useGiftApp();

  // 当 task 变化时更新表单
  useEffect(() => {
    setEditedTitle(task.title);
    setEditedNote(task.note || "");
    setEditedRewardTitle(task.recurringGoal?.reward?.title || "");
    setEditedRewardDesc(task.recurringGoal?.reward?.description || "");
  }, [task]);

  // 保存编辑
  const handleSave = () => {
    console.log('🔵 EditGoalModal: handleSave called');
    console.log('🔵 EditGoalModal: isOpen =', isOpen);
    updateTask(task.id, {
      title: editedTitle,
      note: editedNote,
      recurringGoal: {
        ...task.recurringGoal!,
        reward: task.recurringGoal?.reward ? {
          ...task.recurringGoal.reward,
          title: editedRewardTitle,
          description: editedRewardDesc,
        } : undefined,
      },
    });
    console.log('🔵 EditGoalModal: calling onClose');
    onClose();
    console.log('🔵 EditGoalModal: onClose finished');
  };

  // 取消编辑
  const handleCancel = () => {
    console.log('🔴 EditGoalModal: handleCancel called');
    console.log('🔴 EditGoalModal: isOpen =', isOpen);
    setEditedTitle(task.title);
    setEditedNote(task.note || "");
    setEditedRewardTitle(task.recurringGoal?.reward?.title || "");
    setEditedRewardDesc(task.recurringGoal?.reward?.description || "");
    console.log('🔴 EditGoalModal: calling onClose');
    onClose();
    console.log('🔴 EditGoalModal: onClose finished');
  };

  console.log('🟡 EditGoalModal render: isOpen =', isOpen);

  // 使用 Portal 渲染到 body
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, cursor: 'default' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* 背景遮罩 - 设置 z-0 确保在最底层 */}
          <motion.div
            className="absolute inset-0 z-0 bg-black/70 backdrop-blur-sm"
            style={{ cursor: 'default' }}
            onClick={handleCancel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 编辑表单 - 设置 z-10 确保在背景遮罩上面 */}
          <motion.div
            className="relative z-10 w-full max-w-lg rounded-[2rem] border-[4px] border-black bg-white shadow-2xl overflow-hidden"
            style={{ maxHeight: '90vh', cursor: 'default' }}
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 彩色装饰 - 暂时注释掉测试 */}
            {/* <div className="absolute inset-0 z-0 pointer-events-none">
              <CardDecorations pattern="stars" density="high" />
            </div> */}

            {/* 可滚动内容区 - 提高 z-index */}
            <div className="relative z-20 overflow-y-auto bg-white" style={{ maxHeight: '90vh' }}>
              {/* 标题栏 - 固定顶部 */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b-[3px] border-black/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--hot-pink)] to-[var(--fire-orange)] flex items-center justify-center">
                    <Edit2 size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg">Edit Goal</h3>
                    <p className="text-xs text-black/50 font-bold">Modify your long-term goal</p>
                  </div>
                </div>
                <motion.button
                  onClick={handleCancel}
                  className="p-2 rounded-xl bg-black/5 hover:bg-black/10 border-[2px] border-black/10"
                  style={{ cursor: 'pointer' }}
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* 表单内容 */}
              <div className="px-6 py-6 space-y-5">
                {/* Goal Title */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-black text-black/70 uppercase mb-2">
                    <span className="w-6 h-6 rounded-lg bg-[var(--hot-pink)]/20 border-[2px] border-[var(--hot-pink)] text-[var(--hot-pink)] flex items-center justify-center text-xs">
                      1
                    </span>
                    Goal Title
                  </label>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-[3px] border-black/20 bg-white font-bold focus:border-[var(--hot-pink)] focus:outline-none transition-colors"
                    placeholder="Enter goal title..."
                    autoFocus
                  />
                </div>

                {/* Goal Note */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-black text-black/70 uppercase mb-2">
                    <span className="w-6 h-6 rounded-lg bg-[var(--sky-blue)]/20 border-[2px] border-[var(--sky-blue)] text-[var(--sky-blue)] flex items-center justify-center text-xs">
                      2
                    </span>
                    Note (Optional)
                  </label>
                  <textarea
                    value={editedNote}
                    onChange={(e) => setEditedNote(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-[3px] border-black/20 bg-white font-bold focus:border-[var(--sky-blue)] focus:outline-none resize-none transition-colors"
                    placeholder="Add a note to remember why this goal matters..."
                    rows={3}
                  />
                </div>

                {/* Reward Section */}
                {task.recurringGoal?.reward && (
                  <div className="rounded-2xl border-[4px] border-[var(--fire-orange)] bg-gradient-to-br from-[var(--fire-orange)]/10 via-[var(--hot-pink)]/5 to-[var(--fire-orange)]/10 p-5 space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[var(--fire-orange)]/20 border-[2px] border-[var(--fire-orange)] flex items-center justify-center">
                        <Gift size={16} className="text-[var(--fire-orange)]" />
                      </div>
                      <div>
                        <div className="text-sm font-black text-[var(--fire-orange)] uppercase">
                          🎁 Reward Details
                        </div>
                        <div className="text-xs text-black/60 font-bold">
                          What you'll get after completing this goal
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black/60 uppercase mb-2">
                        Reward Title
                      </label>
                      <input
                        type="text"
                        value={editedRewardTitle}
                        onChange={(e) => setEditedRewardTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-[3px] border-black/20 bg-white font-bold focus:border-[var(--fire-orange)] focus:outline-none transition-colors"
                        placeholder="What's the reward?"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-black/60 uppercase mb-2">
                        Reward Description
                      </label>
                      <textarea
                        value={editedRewardDesc}
                        onChange={(e) => setEditedRewardDesc(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-[3px] border-black/20 bg-white font-bold focus:border-[var(--fire-orange)] focus:outline-none resize-none transition-colors"
                        placeholder="Describe what makes this reward special..."
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* 提示信息 */}
                <div className="rounded-xl bg-[var(--sky-blue)]/10 border-[2px] border-[var(--sky-blue)]/30 p-4">
                  <div className="flex items-start gap-2">
                    <span className="text-lg">💡</span>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-[var(--sky-blue)] uppercase mb-1">
                        Pro Tip
                      </div>
                      <div className="text-xs text-black/70 font-bold leading-relaxed">
                        Make your goal specific and your reward something you truly want. This will keep you motivated throughout the journey!
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 底部按钮 - 固定底部 */}
              <div className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t-[3px] border-black/10 px-6 py-4 flex gap-3">
                <motion.button
                  onPointerDown={(e) => {
                    console.log('⚡ CANCEL POINTER DOWN');
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => {
                    console.log('⚡ CANCEL MOUSE DOWN');
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    console.log('❌ CANCEL BUTTON CLICKED');
                    e.preventDefault();
                    e.stopPropagation();
                    handleCancel();
                  }}
                  className="flex-1 px-6 py-4 rounded-xl bg-white border-[3px] border-black/20 font-black uppercase text-sm hover:bg-black/5 transition-colors"
                  style={{ cursor: 'pointer', pointerEvents: 'auto', position: 'relative', zIndex: 9999 }}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onPointerDown={(e) => {
                    console.log('⚡ SAVE POINTER DOWN');
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onMouseDown={(e) => {
                    console.log('⚡ SAVE MOUSE DOWN');
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    console.log('✅ SAVE BUTTON CLICKED');
                    e.preventDefault();
                    e.stopPropagation();
                    handleSave();
                  }}
                  className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-br from-[var(--hot-pink)] to-[var(--fire-orange)] text-white border-[3px] border-[var(--hot-pink)] shadow-button font-black uppercase text-sm"
                  style={{ cursor: 'pointer', pointerEvents: 'auto', position: 'relative', zIndex: 9999 }}
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.02 }}
                >
                  💾 Save Changes
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}