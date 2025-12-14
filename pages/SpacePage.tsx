/**
 * Space Page - Redesigned (替代 ROOM)
 * 关系可视化空间 / 存在证明层
 * "努力被看见后的样子"
 */

import React, { useMemo, useState } from "react";
import { Shell, PageHeader, Badge } from "../framework";
import { useGiftApp } from "../hooks/useGiftApp";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Video, Trash2, Play, X, ChevronRight, Users } from "lucide-react";
import { DancingAroundFire } from "../components/DancingAroundFire";
import { CardDecorations } from "../components/CardDecorations";
import type { AIVideo, Friend } from "../types/gift";

export function SpacePage() {
  const { state, getAllTasks, generateAIVideo, deleteAIVideo } = useGiftApp();
  const [playingVideo, setPlayingVideo] = useState<{ video: AIVideo; owner?: Friend } | null>(null);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [showAllFriends, setShowAllFriends] = useState(false);
  
  // 计算小人数量（每个完成的任务 = 1 个小人）
  const creatures = useMemo(() => {
    const allTasks = getAllTasks();
    const completedTasks = allTasks.filter(t => t.status === "done");
    return completedTasks.length;
  }, [getAllTasks]);
  
  // 计算空间繁盛度
  const prosperity = useMemo(() => {
    const maxWarmth = 100;
    const ratio = Math.min(state.warmth / maxWarmth, 1);
    return {
      level: ratio > 0.8 ? "thriving" : ratio > 0.5 ? "growing" : ratio > 0.2 ? "emerging" : "nascent",
      brightness: 0.3 + ratio * 0.7,
      saturation: 0.5 + ratio * 0.5,
    };
  }, [state.warmth]);
  
  // 示例励志视频 URL（使用免费的 Pexels 视频）
  const getVideoUrl = (videoId: string) => {
    // 这里使用一些免费的励志视频作为示例
    const videoUrls: Record<string, string> = {
      '1': 'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4', // 日落美景
      '2': 'https://videos.pexels.com/video-files/7578555/7578555-uhd_2560_1440_30fps.mp4', // 太空星云
      '3': 'https://videos.pexels.com/video-files/3209295/3209295-uhd_2560_1440_25fps.mp4', // 海浪
      'default': 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4' // 云层
    };
    return videoUrls[videoId] || videoUrls.default;
  };

  // Video Card Component（复用于横向滑动和弹窗）
  const VideoCard = ({ video, owner, size = "normal" }: { video: AIVideo; owner?: Friend; size?: "normal" | "small" }) => {
    const isSmall = size === "small";
    
    return (
      <motion.div
        onClick={() => setPlayingVideo({ video, owner })}
        className={`rounded-xl border-[3px] border-black/20 bg-white/90 backdrop-blur shadow-card overflow-hidden relative cursor-pointer flex-shrink-0 ${isSmall ? 'w-[140px]' : 'w-[200px]'}`}
        whileTap={{ scale: 0.95 }}
      >
        {/* 彩色花纹装饰 */}
        <CardDecorations pattern="diamonds" density="low" />
        
        {/* 缩略图 - 实际视频预览 */}
        <div className={`relative overflow-hidden ${isSmall ? 'h-[100px]' : 'h-[140px]'}`}>
          <video 
            src={getVideoUrl(video.id)}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            muted
            playsInline
          />
          {/* 播放按钮覆盖层 */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`${isSmall ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-white/90 border-[3px] border-black flex items-center justify-center shadow-button`}
            >
              <Play size={isSmall ? 14 : 18} className="text-black ml-0.5" />
            </motion.div>
          </div>
          <div className="absolute top-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
            {video.tasksSnapshot}
          </div>
        </div>

        {/* 视频信息 */}
        <div className={`${isSmall ? 'p-1.5' : 'p-2'} relative z-10`}>
          {owner && (
            <div className="flex items-center gap-1 mb-1">
              <img 
                src={owner.avatarUrl} 
                alt={owner.name}
                className="w-4 h-4 rounded-full border-[2px] border-black/20"
              />
              <span className="text-[8px] font-bold text-black/60">{owner.name}</span>
            </div>
          )}
          <div className={`font-bold ${isSmall ? 'text-[9px]' : 'text-[10px]'} mb-0.5 line-clamp-1`}>{video.title}</div>
          <div className="flex items-center justify-between text-[8px] text-black/40">
            <span>{new Date(video.generatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            {!owner && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteAIVideo(video.id);
                }}
                className="p-0.5 rounded hover:bg-black/5 text-[var(--fire-red)]"
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 size={10} />
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // Friend Card Component
  const FriendCard = ({ friend, size = "normal" }: { friend: Friend; size?: "normal" | "small" }) => {
    const isSmall = size === "small";
    
    return (
      <motion.div
        className={`rounded-xl border-[3px] border-black/20 bg-white/90 backdrop-blur shadow-card overflow-hidden relative flex-shrink-0 ${isSmall ? 'w-[140px]' : 'w-[200px]'}`}
        whileTap={{ scale: 0.95 }}
      >
        {/* 彩色花纹装饰 */}
        <CardDecorations pattern="hearts" density="low" />
        
        {/* 好友头像和信息 */}
        <div className={`${isSmall ? 'p-2' : 'p-3'} relative z-10`}>
          {/* 头像 */}
          <div className="flex items-center gap-2 mb-2">
            <div className="relative">
              <img 
                src={friend.avatarUrl} 
                alt={friend.name}
                className={`${isSmall ? 'w-10 h-10' : 'w-12 h-12'} rounded-full border-[3px] border-black object-cover`}
              />
              {/* Online indicator */}
              {friend.lastActive > Date.now() - 60 * 60 * 1000 && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[var(--neon-green)] border-[2px] border-white"></div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`font-black ${isSmall ? 'text-[10px]' : 'text-xs'} truncate`}>{friend.name}</div>
              <div className="text-[8px] text-black/50 font-bold">
                {friend.lastActive > Date.now() - 60 * 60 * 1000 
                  ? 'Active now' 
                  : friend.lastActive > Date.now() - 24 * 60 * 60 * 1000
                  ? 'Today'
                  : `${Math.floor((Date.now() - friend.lastActive) / (24 * 60 * 60 * 1000))}d ago`
                }
              </div>
            </div>
          </div>
          
          {/* 统计信息 */}
          <div className="flex gap-2">
            <div className="flex-1 rounded-lg border-[2px] border-[var(--hot-pink)] bg-[var(--hot-pink)]/10 p-1.5 text-center">
              <div className="text-[8px] text-black/60 font-bold uppercase">Streak</div>
              <div className="text-sm font-black text-[var(--hot-pink)]">{friend.streak}</div>
            </div>
            <div className="flex-1 rounded-lg border-[2px] border-[var(--fire-orange)] bg-[var(--fire-orange)]/10 p-1.5 text-center">
              <div className="text-[8px] text-black/60 font-bold uppercase">Warmth</div>
              <div className="text-sm font-black text-[var(--fire-orange)]">{friend.warmth}</div>
            </div>
          </div>
        </div>
        
        {/* 最近视频（小缩略图） */}
        {friend.recentVideos.length > 0 && !isSmall && (
          <div className="border-t-[3px] border-black/10 p-2 relative z-10">
            <div className="text-[8px] font-bold text-black/60 uppercase mb-1">Recent Activity</div>
            <div className="flex gap-1 overflow-x-auto scrollbar-hide">
              {friend.recentVideos.slice(0, 2).map((video) => (
                <motion.div
                  key={video.id}
                  onClick={() => setPlayingVideo({ video, owner: friend })}
                  className="w-12 h-12 rounded-md overflow-hidden border-[2px] border-black/20 flex-shrink-0 cursor-pointer relative"
                  whileTap={{ scale: 0.9 }}
                >
                  <video 
                    src={getVideoUrl(video.id)}
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <Play size={10} className="text-white" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  };
  
  return (
    <Shell>
      <PageHeader title="Space" />

      {/* 紧凑的 Space Status 状态栏 */}
      <div className="rounded-xl border-[3px] border-black/20 bg-white/90 backdrop-blur shadow-card px-4 py-2 flex items-center justify-between relative overflow-hidden">
        <CardDecorations pattern="mixed" density="low" />
        <div className="relative z-10 flex items-center gap-2">
          <Sparkles size={16} className="text-[var(--hot-pink)]" />
          <span className="text-xs font-bold uppercase text-black/60">Space Status</span>
        </div>
        <Badge variant="success" size="sm">
          Active
        </Badge>
      </div>

      {/* 火焰和舞者 */}
      <div className="mt-6 rounded-[2rem] border-[4px] border-black/20 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] shadow-card overflow-hidden relative"
        style={{ aspectRatio: "1/1" }}
      >
        {/* 星空背景 */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.2 + Math.random() * 0.6,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* 燃烧的心脏 */}
        <div className="absolute inset-0">
          <DancingAroundFire warmth={state.warmth} lives={creatures} />
        </div>

        {/* 空状态提示 */}
        {creatures === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center text-white/60 z-10">
              <div className="font-bold text-lg mb-2">Empty space</div>
              <div className="text-sm">Complete tasks to bring life here</div>
            </div>
          </div>
        )}

        {/* 底部信息 */}
        <div className="absolute bottom-4 left-0 right-0 text-center text-white/80 text-xs font-bold z-20">
          {creatures} {creatures === 1 ? "life form" : "life forms"} inhabiting
        </div>
      </div>

      {/* 统计信息 - 紧凑横条 */}
      <div className="mt-4 flex gap-3">
        {/* Days Streak - 压缩版 */}
        <div className="flex-1 rounded-xl border-[3px] border-black/20 bg-white/90 backdrop-blur shadow-card px-3 py-2 flex items-center justify-between relative overflow-hidden">
          <CardDecorations pattern="hearts" density="low" />
          <div className="relative z-10 text-xs text-black/60 uppercase font-bold">Streak</div>
          <div className="relative z-10 text-2xl font-black text-[var(--hot-pink)]">{state.streak}</div>
        </div>
        
        {/* Total Warmth - 压缩版 */}
        <div className="flex-1 rounded-xl border-[3px] border-black/20 bg-white/90 backdrop-blur shadow-card px-3 py-2 flex items-center justify-between relative overflow-hidden">
          <CardDecorations pattern="stars" density="low" />
          <div className="relative z-10 text-xs text-black/60 uppercase font-bold">Warmth</div>
          <div className="relative z-10 text-2xl font-black text-[var(--fire-orange)]">{state.warmth}</div>
        </div>
      </div>

      {/* AI 视频回顾 - 横向滑动 */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-lg font-black">AI Video Memories</div>
            <div className="text-xs text-black/60">Your journey visualized</div>
          </div>
          <motion.button
            onClick={() => setShowAllVideos(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white border-[3px] border-[var(--hot-pink)] shadow-button font-bold uppercase text-[10px]"
            style={{ 
              background: 'linear-gradient(135deg, #FF1B8D 0%, #FF6B4A 25%, #FFD93D 50%, #4ECDC4 75%, #9B6DFF 100%)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Video size={14} />
            View All
            <ChevronRight size={14} />
          </motion.button>
        </div>

        {/* 横向滑动视频列表 */}
        {(!state.aiVideos || state.aiVideos.length === 0) ? (
          <div className="rounded-[1.5rem] border-[3px] border-black/20 bg-white/90 backdrop-blur shadow-card p-6 text-center relative overflow-hidden">
            <CardDecorations pattern="butterflies" density="low" />
            <div className="relative z-10">
              <Video size={32} className="mx-auto text-black/30 mb-2" />
              <div className="text-sm text-black/60">No AI videos yet</div>
              <motion.button
                onClick={generateAIVideo}
                className="inline-flex items-center gap-1 mt-2 px-3 py-1.5 rounded-lg bg-gradient-to-br from-[var(--hot-pink)] to-[var(--coral)] text-white border-[2px] border-[var(--hot-pink)] shadow-button font-bold uppercase text-[10px]"
                whileTap={{ scale: 0.95 }}
              >
                <Video size={12} />
                Generate First Video
              </motion.button>
            </div>
          </div>
        ) : (
          <div 
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          >
            {state.aiVideos.slice(0, 10).map((video) => (
              <VideoCard key={video.id} video={video} size="small" />
            ))}
          </div>
        )}
      </div>

      {/* 好友动态 - 横向滑动 */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-lg font-black">Friends Activity</div>
            <div className="text-xs text-black/60">See what they're achieving</div>
          </div>
          <motion.button
            onClick={() => setShowAllFriends(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-white border-[3px] border-[var(--lavender)] shadow-button font-bold uppercase text-[10px]"
            style={{ 
              background: 'linear-gradient(135deg, #9B6DFF 0%, #45B7D1 25%, #4ECDC4 50%, #B8E62E 75%, #FFD93D 100%)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Users size={14} />
            View All
            <ChevronRight size={14} />
          </motion.button>
        </div>

        {/* 横向滑动好友列表 */}
        {(!state.friends || state.friends.length === 0) ? (
          <div className="rounded-[1.5rem] border-[3px] border-black/20 bg-white/90 backdrop-blur shadow-card p-6 text-center relative overflow-hidden">
            <CardDecorations pattern="stars" density="low" />
            <div className="relative z-10">
              <Users size={32} className="mx-auto text-black/30 mb-2" />
              <div className="text-sm text-black/60">No friends yet</div>
              <div className="text-xs text-black/40 mt-1">Connect with friends to see their progress!</div>
            </div>
          </div>
        ) : (
          <div 
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          >
            {state.friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} size="small" />
            ))}
          </div>
        )}
      </div>

      {/* 全屏视频播放器 */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setPlayingVideo(null)}
          >
            {/* 关闭按钮 */}
            <motion.button
              onClick={() => setPlayingVideo(null)}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 border-[3px] border-white/30 backdrop-blur-sm flex items-center justify-center text-white shadow-button"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={24} />
            </motion.button>

            {/* 视频播放器 */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video rounded-[2rem] overflow-hidden border-[4px] border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                key={playingVideo.video.id}
                src={getVideoUrl(playingVideo.video.id)}
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
              />
              
              {/* 视频信息叠加层 */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="text-white">
                  {playingVideo.owner && (
                    <div className="flex items-center gap-2 mb-2">
                      <img 
                        src={playingVideo.owner.avatarUrl} 
                        alt={playingVideo.owner.name}
                        className="w-8 h-8 rounded-full border-[2px] border-white/30"
                      />
                      <span className="text-sm text-white/80">{playingVideo.owner.name}</span>
                    </div>
                  )}
                  <div className="font-black text-xl mb-1">
                    {playingVideo.video.title}
                  </div>
                  <div className="text-sm text-white/70">
                    {playingVideo.video.tasksSnapshot} tasks completed
                  </div>
                  <div className="text-xs text-white/50 mt-1">
                    {new Date(playingVideo.video.generatedAt).toLocaleDateString('en-US', { 
                      year: 'numeric',
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View All Videos 弹窗 */}
      <AnimatePresence>
        {showAllVideos && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAllVideos(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative w-full max-w-3xl max-h-[90vh] rounded-[2rem] border-[4px] border-black bg-white shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 装饰 */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <CardDecorations pattern="stars" density="high" />
              </div>

              {/* Header */}
              <div className="relative z-10 border-b-[4px] border-black/10 bg-gradient-to-br from-[var(--hot-pink)]/10 to-[var(--coral)]/10 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Video size={20} className="text-[var(--hot-pink)]" />
                      <h2 className="text-xl font-black">All AI Videos</h2>
                    </div>
                    <div className="text-xs text-black/60 mt-1">{state.aiVideos?.length || 0} memories captured</div>
                  </div>
                  <motion.button
                    onClick={generateAIVideo}
                    className="px-4 py-2 rounded-xl bg-gradient-to-br from-[var(--hot-pink)] to-[var(--coral)] text-white border-[3px] border-[var(--hot-pink)] shadow-button font-bold uppercase text-xs"
                    whileTap={{ scale: 0.95 }}
                  >
                    + Generate
                  </motion.button>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 100px)' }}>
                <div className="grid grid-cols-3 gap-3">
                  {state.aiVideos?.map((video) => (
                    <VideoCard key={video.id} video={video} size="normal" />
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                onClick={() => setShowAllVideos(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/10 border-[3px] border-black/20 backdrop-blur-sm flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View All Friends 弹窗 */}
      <AnimatePresence>
        {showAllFriends && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAllFriends(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative w-full max-w-3xl max-h-[90vh] rounded-[2rem] border-[4px] border-black bg-white shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 装饰 */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <CardDecorations pattern="hearts" density="high" />
              </div>

              {/* Header */}
              <div className="relative z-10 border-b-[4px] border-black/10 bg-gradient-to-br from-[var(--sky-blue)]/10 to-[var(--electric-blue)]/10 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <Users size={20} className="text-[var(--sky-blue)]" />
                      <h2 className="text-xl font-black">All Friends</h2>
                    </div>
                    <div className="text-xs text-black/60 mt-1">{state.friends?.length || 0} friends on the journey</div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 100px)' }}>
                <div className="grid grid-cols-2 gap-3">
                  {state.friends?.map((friend) => (
                    <FriendCard key={friend.id} friend={friend} size="normal" />
                  ))}
                </div>
                
                {/* 每个好友的视频列表 */}
                {state.friends?.map((friend) => (
                  friend.recentVideos.length > 0 && (
                    <div key={`videos-${friend.id}`} className="mt-6">
                      <div className="flex items-center gap-2 mb-3">
                        <img 
                          src={friend.avatarUrl} 
                          alt={friend.name}
                          className="w-6 h-6 rounded-full border-[2px] border-black/20"
                        />
                        <h3 className="text-sm font-black">{friend.name}'s Videos</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        {friend.recentVideos.map((video) => (
                          <VideoCard key={video.id} video={video} owner={friend} size="normal" />
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>

              {/* Close Button */}
              <motion.button
                onClick={() => setShowAllFriends(false)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/10 border-[3px] border-black/20 backdrop-blur-sm flex items-center justify-center"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Shell>
  );
}
