/**
 * Create Goal Modal
 * Modal for creating new long-term recurring goals
 */

import React, { useState } from "react";
import { X, Users, Calendar, Gift, Target, Image as ImageIcon } from "lucide-react";
import { CardDecorations } from "./CardDecorations";

type CreateGoalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateGoal: (goal: {
    title: string;
    emoji: string;
    duration: number;
    rewardTitle: string;
    rewardDescription: string;
    rewardImageUrl: string;
    witnessIds: string[];
    note?: string;
  }) => void;
  friends: Array<{ id: string; name: string; avatarUrl: string }>;
};

const EMOJI_OPTIONS = ["🏃", "📚", "🧘", "💌", "💻", "💪", "🎨", "🎸", "🌱", "🍳", "📸", "✍️"];

const DURATION_OPTIONS = [
  { days: 7, label: "7 Days" },
  { days: 14, label: "2 Weeks" },
  { days: 21, label: "21 Days" },
  { days: 30, label: "30 Days" },
  { days: 60, label: "60 Days" },
  { days: 90, label: "90 Days" },
];

export function CreateGoalModal({ isOpen, onClose, onCreateGoal, friends }: CreateGoalModalProps) {
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("🎯");
  const [duration, setDuration] = useState(30);
  const [rewardTitle, setRewardTitle] = useState("");
  const [rewardDescription, setRewardDescription] = useState("");
  const [rewardImageUrl, setRewardImageUrl] = useState("");
  const [witnessIds, setWitnessIds] = useState<string[]>([]);
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !rewardTitle.trim()) {
      alert("Please fill in title and reward!");
      return;
    }

    onCreateGoal({
      title: `${emoji} ${title.trim()}`,
      emoji,
      duration,
      rewardTitle: rewardTitle.trim(),
      rewardDescription: rewardDescription.trim(),
      rewardImageUrl: rewardImageUrl.trim() || "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop",
      witnessIds,
      note: note.trim(),
    });

    // Reset form
    setTitle("");
    setEmoji("🎯");
    setDuration(30);
    setRewardTitle("");
    setRewardDescription("");
    setRewardImageUrl("");
    setWitnessIds([]);
    setNote("");
    
    onClose();
  };

  const toggleWitness = (friendId: string) => {
    setWitnessIds((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-t-[2rem] md:rounded-[2rem] border-[4px] border-black shadow-retro">
        <CardDecorations pattern="stars" />
        
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 p-6 border-b-[3px] border-black/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Create New Goal</h2>
              <p className="text-sm text-black/60 mt-1">Build a habit, earn a reward!</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Emoji Selector */}
          <div>
            <label className="block text-sm font-bold mb-2">
              <Target size={16} className="inline mr-1" />
              Choose Emoji
            </label>
            <div className="flex flex-wrap gap-2">
              {EMOJI_OPTIONS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setEmoji(em)}
                  className={`text-3xl p-3 rounded-xl border-[3px] transition-all ${
                    emoji === em
                      ? "border-[#FF1B8D] bg-[#FF1B8D]/10 scale-110"
                      : "border-black/20 hover:border-black/40"
                  }`}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-bold mb-2">
              Goal Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Run 5km every day"
              className="w-full px-4 py-3 rounded-xl border-[3px] border-black/20 focus:border-[#FF1B8D] focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-bold mb-2">
              <Calendar size={16} className="inline mr-1" />
              Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {DURATION_OPTIONS.map((option) => (
                <button
                  key={option.days}
                  type="button"
                  onClick={() => setDuration(option.days)}
                  className={`p-3 rounded-xl border-[3px] font-bold transition-all ${
                    duration === option.days
                      ? "gradient-rainbow-animated text-white border-white shadow-button"
                      : "border-black/20 hover:border-black/40"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-bold mb-2">
              Note (Optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Why is this goal important to you?"
              className="w-full px-4 py-3 rounded-xl border-[3px] border-black/20 focus:border-[#FF1B8D] focus:outline-none transition-colors resize-none"
              rows={3}
            />
          </div>

          {/* Reward Section */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#FFD93D]/20 to-[#FF9B3D]/20 border-[3px] border-[#FF9B3D]/30 space-y-4">
            <div className="flex items-center gap-2">
              <Gift size={20} className="text-[#FF9B3D]" />
              <h3 className="font-bold">Your Reward</h3>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Reward Title *
              </label>
              <input
                type="text"
                value={rewardTitle}
                onChange={(e) => setRewardTitle(e.target.value)}
                placeholder="e.g., New Running Shoes"
                className="w-full px-4 py-3 rounded-xl border-[3px] border-black/20 focus:border-[#FF9B3D] focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                Reward Description
              </label>
              <input
                type="text"
                value={rewardDescription}
                onChange={(e) => setRewardDescription(e.target.value)}
                placeholder="e.g., Treat yourself to professional gear!"
                className="w-full px-4 py-3 rounded-xl border-[3px] border-black/20 focus:border-[#FF9B3D] focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">
                <ImageIcon size={16} className="inline mr-1" />
                Reward Image URL (Optional)
              </label>
              <input
                type="url"
                value={rewardImageUrl}
                onChange={(e) => setRewardImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-3 rounded-xl border-[3px] border-black/20 focus:border-[#FF9B3D] focus:outline-none transition-colors"
              />
              {rewardImageUrl && (
                <div className="mt-2">
                  <img
                    src={rewardImageUrl}
                    alt="Reward preview"
                    className="w-full h-40 object-cover rounded-xl border-[3px] border-black/20"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=300&fit=crop";
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Witnesses Section */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#45B7D1]/20 to-[#9B6DFF]/20 border-[3px] border-[#45B7D1]/30 space-y-4">
            <div className="flex items-center gap-2">
              <Users size={20} className="text-[#45B7D1]" />
              <h3 className="font-bold">Accountability Partners</h3>
              <span className="text-sm text-black/60">(Optional)</span>
            </div>
            <p className="text-sm text-black/70">
              Select friends who can see your progress and cheer you on!
            </p>

            <div className="grid grid-cols-2 gap-2">
              {friends.map((friend) => (
                <button
                  key={friend.id}
                  type="button"
                  onClick={() => toggleWitness(friend.id)}
                  className={`flex items-center gap-2 p-3 rounded-xl border-[3px] transition-all ${
                    witnessIds.includes(friend.id)
                      ? "border-[#45B7D1] bg-[#45B7D1]/10"
                      : "border-black/20 hover:border-black/40"
                  }`}
                >
                  <img
                    src={friend.avatarUrl}
                    alt={friend.name}
                    className="w-8 h-8 rounded-full border-[2px] border-black/20"
                  />
                  <span className="text-sm font-bold truncate">{friend.name}</span>
                  {witnessIds.includes(friend.id) && (
                    <span className="ml-auto text-[#45B7D1]">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-xl gradient-rainbow-animated text-white font-bold border-[4px] border-white shadow-button hover:scale-[1.02] active:scale-[0.98] transition-transform uppercase tracking-wider"
          >
            🎯 Create Goal
          </button>
        </form>
      </div>
    </div>
  );
}
