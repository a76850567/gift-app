/**
 * Dancing Around Fire - Orbital Light Trails
 * 小人沿着发光轨道跳舞 - 原子轨道风格
 */

import React, { useMemo } from "react";
import { motion } from "motion/react";

type DancingAroundFireProps = {
  warmth: number; // 0-200+
  lives: number; // Number of completed tasks = number of dancers
};

export function DancingAroundFire({ warmth, lives }: DancingAroundFireProps) {
  // 定义 3 条轨道（3D 透视椭圆）
  const orbits = [
    { radiusX: 100, radiusY: 50, rotation: 0, speed: 10 },
    { radiusX: 130, radiusY: 65, rotation: 60, speed: 14 },
    { radiusX: 160, radiusY: 80, rotation: 120, speed: 18 },
  ];
  
  // 将小人分配到不同轨道上
  const dancers = Array.from({ length: lives }, (_, i) => {
    const orbitIndex = i % 3; // 分配到3条轨道
    const orbit = orbits[orbitIndex];
    const startAngle = (360 / Math.ceil(lives / 3)) * Math.floor(i / 3);
    
    // 每个小人使用不同颜色
    const dancerColors = [
      "#FF1B8D", "#FF6B4A", "#FFD93D", "#B8E62E",
      "#4ECDC4", "#6C5CE7", "#FF4757", "#FFA502",
    ];
    const color = dancerColors[i % dancerColors.length];
    
    return {
      id: i,
      orbitIndex,
      orbit,
      startAngle,
      color,
      pose: i % 3,
      delay: i * 0.15,
    };
  });
  
  // 根据小人数量计算火焰等级
  const flameLevel = useMemo(() => {
    if (lives >= 20) return 4; // 超级绚丽
    if (lives >= 11) return 3; // 彩虹火焰
    if (lives >= 6) return 2;  // 强化火焰
    return 1; // 基础火焰
  }, [lives]);
  
  // 火焰大小根据 warmth 和 lives
  const flameSize = 60 + Math.min(warmth / 2, 60) + lives * 2; // 60-140px
  
  // 根据等级获取火焰配置
  const getFlameConfig = () => {
    switch (flameLevel) {
      case 4: // 超级绚丽 (20+ lives)
        return {
          emoji: "🔥",
          colors: ["#FF1B8D", "#FF6B4A", "#FFD93D", "#B8E62E", "#4ECDC4", "#6C5CE7"],
          glowIntensity: 60,
          particles: 40,
          halos: 4,
          animationSpeed: 1.5,
        };
      case 3: // 彩虹火焰 (11-19 lives)
        return {
          emoji: "🔥",
          colors: ["#FF1B8D", "#FF6B4A", "#FFD93D", "#4ECDC4"],
          glowIntensity: 45,
          particles: 25,
          halos: 3,
          animationSpeed: 1.8,
        };
      case 2: // 强化火焰 (6-10 lives)
        return {
          emoji: "🔥",
          colors: ["#FF4757", "#FF6B4A", "#FFD93D"],
          glowIntensity: 30,
          particles: 15,
          halos: 2,
          animationSpeed: 2,
        };
      default: // 基础火焰 (0-5 lives)
        return {
          emoji: "🔥",
          colors: ["#FF6B4A", "#FFA502"],
          glowIntensity: 20,
          particles: 8,
          halos: 1,
          animationSpeed: 2.5,
        };
    }
  };
  
  const flameConfig = getFlameConfig();
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 多层彩虹光晕 */}
      {Array.from({ length: flameConfig.halos }).map((_, i) => (
        <motion.div
          key={`halo-${i}`}
          className="absolute rounded-full"
          style={{
            width: flameSize * (2.5 + i * 0.8),
            height: flameSize * (2.5 + i * 0.8),
            background: `radial-gradient(circle, ${flameConfig.colors[i % flameConfig.colors.length]}40, ${flameConfig.colors[(i + 1) % flameConfig.colors.length]}20, transparent 70%)`,
            filter: `blur(${20 + i * 15}px)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
      
      {/* 彩色粒子爆炸效果 */}
      {Array.from({ length: flameConfig.particles }).map((_, i) => {
        const angle = (360 / flameConfig.particles) * i;
        const distance = 40 + Math.random() * 40;
        const color = flameConfig.colors[i % flameConfig.colors.length];
        const size = 3 + Math.random() * 4;
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: color,
              boxShadow: `0 0 ${size * 4}px ${color}, 0 0 ${size * 8}px ${color}80`,
              left: "50%",
              top: "50%",
            }}
            animate={{
              x: [0, Math.cos((angle * Math.PI) / 180) * distance],
              y: [0, Math.sin((angle * Math.PI) / 180) * distance],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 1.5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut",
            }}
          />
        );
      })}
      
      {/* 中心火焰 - 多层叠加 */}
      <div className="absolute z-20 flex items-center justify-center">
        {/* 主火焰 */}
        <motion.div
          className="absolute"
          style={{
            fontSize: flameSize,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: flameConfig.animationSpeed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🔥
        </motion.div>
        
        {/* 高级火焰：添加发光层 */}
        {flameLevel >= 3 && (
          <>
            <motion.div
              className="absolute"
              style={{
                fontSize: flameSize * 0.8,
                filter: `hue-rotate(60deg) brightness(1.5) blur(2px)`,
                opacity: 0.6,
              }}
              animate={{
                scale: [1.1, 1, 1.1],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: flameConfig.animationSpeed * 0.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            >
              🔥
            </motion.div>
            <motion.div
              className="absolute"
              style={{
                fontSize: flameSize * 0.6,
                filter: `hue-rotate(120deg) brightness(1.8) blur(3px)`,
                opacity: 0.5,
              }}
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: flameConfig.animationSpeed * 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            >
              🔥
            </motion.div>
          </>
        )}
        
        {/* 超级火焰：第四层 */}
        {flameLevel >= 4 && (
          <motion.div
            className="absolute"
            style={{
              fontSize: flameSize * 0.4,
              filter: `hue-rotate(240deg) brightness(2) blur(4px)`,
              opacity: 0.4,
            }}
            animate={{
              scale: [1.15, 1, 1.15],
              rotate: [0, -10, 10, 0],
            }}
            transition={{
              duration: flameConfig.animationSpeed * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          >
            🔥
          </motion.div>
        )}
      </div>
      
      {/* 火焰核心发光 */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: flameSize * 1.5,
          height: flameSize * 1.5,
          background: `radial-gradient(circle, ${flameConfig.colors[0]}60, ${flameConfig.colors[1] || flameConfig.colors[0]}40, transparent)`,
          filter: `blur(${flameConfig.glowIntensity}px)`,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* 3条发光轨道 */}
      {orbits.map((orbit, index) => (
        <LightTrailOrbit
          key={index}
          radiusX={orbit.radiusX}
          radiusY={orbit.radiusY}
          rotation={orbit.rotation}
          index={index}
        />
      ))}
      
      {/* 沿轨道跳舞的小人 */}
      {dancers.map((dancer) => (
        <DancerOnOrbit
          key={dancer.id}
          orbit={dancer.orbit}
          startAngle={dancer.startAngle}
          color={dancer.color}
          pose={dancer.pose}
          delay={dancer.delay}
        />
      ))}
      
      {/* 空状态 */}
      {lives === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white/80 mt-40">
            <div className="font-bold text-sm">Complete tasks</div>
            <div className="text-xs text-white/60">to summon dancers</div>
          </div>
        </div>
      )}
    </div>
  );
}

// 发光轨道组件
function LightTrailOrbit({
  radiusX,
  radiusY,
  rotation,
  index,
}: {
  radiusX: number;
  radiusY: number;
  rotation: number;
  index: number;
}) {
  return (
    <div
      className="absolute z-10"
      style={{
        left: "50%",
        top: "50%",
        width: radiusX * 2,
        height: radiusY * 2,
        marginLeft: -radiusX,
        marginTop: -radiusY,
      }}
    >
      <motion.svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${radiusX * 2} ${radiusY * 2}`}
        style={{
          overflow: "visible",
        }}
        animate={{
          rotate: [rotation, rotation + 360],
        }}
        transition={{
          duration: 40 + index * 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* 白色发光轨道 */}
        <motion.ellipse
          cx={radiusX}
          cy={radiusY}
          rx={radiusX}
          ry={radiusY}
          fill="none"
          stroke="white"
          strokeWidth="3"
          style={{
            filter: "blur(1px) drop-shadow(0 0 10px white) drop-shadow(0 0 20px rgba(255,255,255,0.6))",
          }}
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* 彩虹色光晕（内侧） */}
        <motion.ellipse
          cx={radiusX}
          cy={radiusY}
          rx={radiusX - 2}
          ry={radiusY - 2}
          fill="none"
          stroke="url(#rainbow-gradient)"
          strokeWidth="2"
          opacity="0.3"
          style={{
            filter: "blur(3px)",
          }}
        />
        
        {/* 定义彩虹渐变 */}
        <defs>
          <linearGradient id="rainbow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF1B8D" />
            <stop offset="25%" stopColor="#FF6B4A" />
            <stop offset="50%" stopColor="#FFD93D" />
            <stop offset="75%" stopColor="#4ECDC4" />
            <stop offset="100%" stopColor="#6C5CE7" />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  );
}

// 沿轨道运动的小人
function DancerOnOrbit({
  orbit,
  startAngle,
  color,
  pose,
  delay,
}: {
  orbit: { radiusX: number; radiusY: number; speed: number };
  startAngle: number;
  color: string;
  pose: number;
  delay: number;
}) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  
  // 定义更细的火柴人姿势（strokeWidth 从 3 改为 1.5）
  const poses = [
    { 
      body: "M12 8 L12 14 M7 7 L12 8 M12 8 L17 7 M12 14 L8 19 M12 14 L16 19", 
      head: { cx: 12, cy: 5 },
      name: "Dancing A"
    },
    { 
      body: "M12 8 L12 14 M8 11 L12 8 L16 11 M12 14 L8 18 M12 14 L16 18", 
      head: { cx: 12, cy: 5 },
      name: "Dancing B"
    },
    { 
      body: "M12 8 L12 14 M8 10 L12 8 L16 10 M12 14 L10 19 M12 14 L14 19", 
      head: { cx: 12, cy: 5 },
      name: "Dancing C"
    },
  ];
  
  const currentPose = poses[pose];
  
  // 点击播放动画
  const handleClick = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };
  
  return (
    <motion.div
      className="absolute z-30 cursor-pointer"
      style={{
        left: "50%",
        top: "50%",
      }}
      animate={{
        x: Array.from({ length: 60 }, (_, i) => {
          const angle = startAngle + (i * 360) / 60;
          return Math.cos((angle * Math.PI) / 180) * orbit.radiusX;
        }),
        y: Array.from({ length: 60 }, (_, i) => {
          const angle = startAngle + (i * 360) / 60;
          const y = Math.sin((angle * Math.PI) / 180) * orbit.radiusY;
          // 添加跳跃效果
          const jump = Math.sin((i * Math.PI) / 30) * 10;
          return y - jump;
        }),
        scale: Array.from({ length: 60 }, (_, i) => {
          const angle = startAngle + (i * 360) / 60;
          const depth = (Math.sin((angle * Math.PI) / 180) + 1) / 2;
          return 0.7 + depth * 0.6;
        }),
      }}
      transition={{
        duration: orbit.speed,
        repeat: Infinity,
        ease: "linear",
        delay: delay,
      }}
      onClick={handleClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" className="drop-shadow-lg">
        {/* 小人身体 - 更细的线条 */}
        <motion.path
          d={currentPose.body}
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          animate={
            isPlaying
              ? {
                  d: [
                    currentPose.body,
                    poses[(pose + 1) % 3].body,
                    poses[(pose + 2) % 3].body,
                    currentPose.body,
                  ],
                }
              : {
                  d: [currentPose.body, poses[(pose + 1) % 3].body, currentPose.body],
                }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.5,
                  times: [0, 0.33, 0.66, 1],
                  repeat: 3,
                }
              : {
                  duration: 1.2,
                  repeat: Infinity,
                  delay: delay,
                }
          }
        />
        {/* 小人头部 */}
        <motion.circle
          cx={currentPose.head.cx}
          cy={currentPose.head.cy}
          r="2.5"
          fill={color}
          stroke="white"
          strokeWidth="1"
          animate={
            isPlaying
              ? {
                  scale: [1, 1.3, 1, 1.3, 1],
                  r: [2.5, 3, 2.5, 3, 2.5],
                }
              : {}
          }
          transition={
            isPlaying
              ? {
                  duration: 0.5,
                  repeat: 3,
                }
              : {}
          }
        />
        {/* 能量波纹 */}
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.4"
          animate={
            isPlaying
              ? {
                  r: [6, 18],
                  opacity: [0.8, 0],
                  strokeWidth: [2, 0.5],
                }
              : {
                  r: [8, 15],
                  opacity: [0.6, 0],
                }
          }
          transition={
            isPlaying
              ? {
                  duration: 0.6,
                  repeat: 4,
                }
              : {
                  duration: 1.5,
                  repeat: Infinity,
                  delay: delay,
                }
          }
        />
      </svg>
      
      {/* 点击提示 */}
      {isPlaying && (
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-black/60 text-white px-2 py-1 rounded-full whitespace-nowrap"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
        >
          {currentPose.name}!
        </motion.div>
      )}
    </motion.div>
  );
}