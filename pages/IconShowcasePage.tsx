/**
 * Icon Showcase Page
 * Display all Keith Haring style icons
 */

import React, { useState } from "react";
import { Shell, PageHeader, Card } from "../framework";
import { 
  DancingPersonIcon,
  RainbowHeartIcon,
  TodayIcon,
  MomentsIcon,
  SpaceIcon,
  MeIcon
} from "../components/icons";
import { DancingPlushCrew } from "../components/DancingPlushCrew";
import type { PlushMood } from "../types/gift";

export function IconShowcasePage() {
  const [animated, setAnimated] = useState(true);

  return (
    <Shell>
      <PageHeader
        subtitle="Design System"
        title="Icon Showcase"
      />

      <div className="mt-6 space-y-6">
        {/* Toggle Animation */}
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-black uppercase">Animation</div>
              <div className="text-black/60 text-sm">Toggle icon animations</div>
            </div>
            <button
              onClick={() => setAnimated(!animated)}
              className={`px-6 py-3 rounded-2xl border-[3px] font-bold uppercase text-sm transition-all ${
                animated
                  ? "gradient-rainbow-animated text-white border-white shadow-button"
                  : "bg-white border-black/20 text-black/70"
              }`}
            >
              {animated ? "ON" : "OFF"}
            </button>
          </div>
        </Card>

        {/* Dancing Person - Different Poses */}
        <Card>
          <div className="mb-4">
            <div className="font-black uppercase text-xl mb-2">Dancing Plush Crew</div>
            <div className="text-black/60 text-sm">Keith Haring Style - Mood-based Dancing Figures</div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {[
              { mood: "sleepy" as PlushMood, label: "Sleepy - 1 Figure", warmth: 0 },
              { mood: "calm" as PlushMood, label: "Calm - 2 Figures", warmth: 30 },
              { mood: "happy" as PlushMood, label: "Happy - 3 Figures", warmth: 80 },
              { mood: "spark" as PlushMood, label: "Spark - 5 Figures!", warmth: 120 },
            ].map(({ mood, label, warmth }) => (
              <div key={mood}>
                <DancingPlushCrew mood={mood} reduceMotion={!animated} warmth={warmth} />
                <div className="font-bold text-center mt-3 uppercase text-sm">{label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Dancing Person - Different Poses */}
        <Card>
          <div className="mb-4">
            <div className="font-black uppercase text-xl mb-2">Dancing Person Icons</div>
            <div className="text-black/60 text-sm">Keith Haring Style - Different Poses</div>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {[
              { pose: "jump", label: "Jump", color: "#FF1B8D" },
              { pose: "wave", label: "Wave", color: "#FF9B3D" },
              { pose: "dance", label: "Dance", color: "#4ECDC4" },
              { pose: "reach", label: "Reach", color: "#9B6DFF" },
              { pose: "celebrate", label: "Celebrate", color: "#B8E62E" },
            ].map(({ pose, label, color }) => (
              <div key={pose} className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-white to-gray-50 rounded-2xl border-[3px] border-black/10">
                <div className="p-4 bg-yellow-100 rounded-full border-[3px] border-black">
                  <DancingPersonIcon 
                    size={48} 
                    animated={animated} 
                    pose={pose as any}
                    color={color}
                  />
                </div>
                <div className="font-bold text-center text-sm uppercase">{label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tab Icons */}
        <Card>
          <div className="mb-4">
            <div className="font-black uppercase text-xl mb-2">Tab Bar Icons</div>
            <div className="text-black/60 text-sm">Custom icons for navigation</div>
          </div>
          
          <div className="grid grid-cols-5 gap-4">
            {[
              { Icon: TodayIcon, label: "Today", color: "from-[#FF1B8D] to-[#FF6B4A]" },
              { Icon: MomentsIcon, label: "Moments", color: "from-[#FF9B3D] to-[#FFD93D]" },
              { Icon: SpaceIcon, label: "Space", color: "from-[#4ECDC4] to-[#45B7D1]" },
              { Icon: MeIcon, label: "Me", color: "from-[#9B6DFF] to-[#FF85C0]" },
            ].map(({ Icon, label, color }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                {/* Inactive State */}
                <div className="p-3 bg-white rounded-2xl border-[3px] border-black/20 shadow-button">
                  <Icon size={32} isActive={false} />
                </div>
                <div className="text-xs text-black/60 text-center">Idle</div>
                
                {/* Active State */}
                <div className={`p-3 bg-gradient-to-br ${color} rounded-2xl border-[3px] border-white shadow-button`}>
                  <Icon size={32} isActive={animated} />
                </div>
                <div className="text-xs font-bold text-center uppercase">{label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Rainbow Heart */}
        <Card>
          <div className="mb-4">
            <div className="font-black uppercase text-xl mb-2">Rainbow Heart Icons</div>
            <div className="text-black/60 text-sm">Sparkle & Radiance Style</div>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            {[
              { variant: "default", label: "Default" },
              { variant: "burst", label: "Burst" },
              { variant: "sparkle", label: "Sparkle" },
            ].map(({ variant, label }) => (
              <div key={variant} className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border-[3px] border-black/10">
                <RainbowHeartIcon 
                  size={64} 
                  animated={animated} 
                  variant={variant as any}
                />
                <div className="font-bold text-center uppercase">{label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Size Variations */}
        <Card>
          <div className="mb-4">
            <div className="font-black uppercase text-xl mb-2">Size Variations</div>
            <div className="text-black/60 text-sm">Different icon sizes</div>
          </div>
          
          <div className="flex items-end justify-around gap-4 p-6 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-2xl border-[3px] border-black">
            {[16, 24, 32, 48, 64, 96].map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <DancingPersonIcon 
                  size={size} 
                  animated={animated} 
                  pose="jump"
                  color="#000"
                />
                <div className="text-xs font-bold">{size}px</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Live TabBar Preview */}
        <Card>
          <div className="mb-4">
            <div className="font-black uppercase text-xl mb-2">Live TabBar Preview</div>
            <div className="text-black/60 text-sm">See how icons look in navigation</div>
          </div>
          
          <div className="rounded-[2rem] border-[4px] border-black/20 bg-white/90 backdrop-blur shadow-card p-3 flex justify-between">
            {[
              { Icon: TodayIcon, label: "Today", active: true },
              { Icon: MomentsIcon, label: "Moment", active: false },
              { Icon: SpaceIcon, label: "Space", active: false },
              { Icon: MeIcon, label: "Me", active: false },
            ].map(({ Icon, label, active }) => (
              <div
                key={label}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-2xl transition-all font-bold uppercase text-xs tracking-wider ${
                  active
                    ? "gradient-rainbow-animated text-white border-[3px] border-white shadow-button"
                    : "text-black/70 hover:bg-white/50 border-[3px] border-transparent"
                }`}
              >
                <Icon size={24} isActive={active && animated} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Color Palette */}
        <Card>
          <div className="mb-4">
            <div className="font-black uppercase text-xl mb-2">Dopamine Color Palette</div>
            <div className="text-black/60 text-sm">Keith Haring inspired colors</div>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {[
              { color: "#FFEB3B", name: "Yellow" },
              { color: "#FF1B8D", name: "Hot Pink" },
              { color: "#FF6B4A", name: "Coral" },
              { color: "#FF9B3D", name: "Orange" },
              { color: "#B8E62E", name: "Lime" },
              { color: "#4ECDC4", name: "Mint" },
              { color: "#45B7D1", name: "Sky" },
              { color: "#9B6DFF", name: "Lavender" },
            ].map(({ color, name }) => (
              <div key={color} className="flex flex-col gap-2">
                <div 
                  className="w-full h-20 rounded-2xl border-[3px] border-black shadow-button"
                  style={{ backgroundColor: color }}
                />
                <div className="text-sm font-bold text-center">{name}</div>
                <div className="text-xs text-black/60 text-center font-mono">{color}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Shell>
  );
}