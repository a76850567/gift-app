# 🔥❤️ Dopamine Icons 使用指南

完整的心臟和火焰圖標系統，完美匹配你的復古多巴胺設計風格！

---

## 🎨 **可用圖標**

### 1. **HeartIcon** ❤️

燃燒的心臟圖標，帶有動畫和多種變體。

#### 變體

```tsx
import { HeartIcon } from "../components/icons";

// Default - 粉紅到珊瑚漸變
<HeartIcon size={24} variant="default" animated />

// Fire - 紅橙黃火焰漸變，帶閃爍星星
<HeartIcon size={24} variant="fire" animated />

// Sparkle - 粉紫漸變，帶旋轉星星
<HeartIcon size={24} variant="sparkle" animated />

// Glow - 徑向漸變，帶發光效果
<HeartIcon size={24} variant="glow" animated />
```

#### 屬性

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `size` | `number` | `24` | 圖標大小（像素） |
| `variant` | `"default" \| "fire" \| "sparkle" \| "glow"` | `"default"` | 樣式變體 |
| `animated` | `boolean` | `true` | 是否啟用動畫 |
| `className` | `string` | `""` | 自定義 CSS 類 |

---

### 2. **FlameIcon** 🔥

動態火焰圖標，帶有閃爍和漸變效果。

#### 變體

```tsx
import { FlameIcon } from "../components/icons";

// Default - 黃橙紅火焰漸變
<FlameIcon size={24} variant="default" animated />

// Intense - 白色核心，最強烈的火焰
<FlameIcon size={24} variant="intense" animated />

// Soft - 柔和的陽光橙色調
<FlameIcon size={24} variant="soft" animated />

// Multi - 多層火焰，帶星星裝飾
<FlameIcon size={24} variant="multi" animated />
```

#### 屬性

| 屬性 | 類型 | 默認值 | 說明 |
|------|------|--------|------|
| `size` | `number` | `24` | 圖標大小（像素） |
| `variant` | `"default" \| "intense" \| "soft" \| "multi"` | `"default"` | 樣式變體 |
| `animated` | `boolean` | `true` | 是否啟用動畫 |
| `className` | `string` | `""` | 自定義 CSS 類 |

---

## 🎯 **使用場景**

### **1. 在徽章中使用**

```tsx
import { Badge } from "../framework";
import { HeartIcon, FlameIcon } from "../components/icons";

<Badge variant="warning">
  <FlameIcon size={14} variant="intense" animated />
  Warmth {warmth}
</Badge>

<Badge variant="info">
  <HeartIcon size={14} variant="sparkle" animated />
  Streak {streak}
</Badge>
```

### **2. 在按鈕中使用**

```tsx
import { Button } from "../framework";
import { HeartIcon } from "../components/icons";

<Button variant="primary">
  <HeartIcon size={18} variant="fire" animated />
  Mark Done
</Button>
```

### **3. 在卡片中作為裝飾**

```tsx
import { Card } from "../framework";
import { FlameIcon } from "../components/icons";

<Card>
  <div className="flex items-center gap-3">
    <div className="p-3 rounded-2xl bg-gradient-to-br from-[var(--fire-red)] to-[var(--fire-orange)] border-[3px] border-[var(--fire-red)] shadow-button">
      <FlameIcon size={32} variant="intense" animated />
    </div>
    <div>
      <h3>You're on fire! 🔥</h3>
      <p>Keep up the streak!</p>
    </div>
  </div>
</Card>
```

### **4. 使用 DopamineButton**

```tsx
import { DopamineButton } from "../components/DopamineButton";

// Heart button
<DopamineButton variant="heart" size="lg" fullWidth>
  Show Love
</DopamineButton>

// Fire button
<DopamineButton variant="fire" size="lg" fullWidth>
  Light the Fire
</DopamineButton>

// Burning heart button
<DopamineButton variant="heart-fire" size="lg" fullWidth>
  Burning Heart
</DopamineButton>
```

---

## 🎨 **推薦配色組合**

### **❤️ HeartIcon 配色**

| 變體 | 背景色 | 邊框色 | 使用場景 |
|------|--------|--------|----------|
| `default` | `from-[var(--hot-pink)] to-[var(--coral)]` | `border-[var(--hot-pink)]` | 基礎喜愛、點讚 |
| `fire` | `from-[var(--fire-red)] to-[var(--fire-yellow)]` | `border-[var(--fire-red)]` | 高溫暖值、成就 |
| `sparkle` | `from-[var(--hot-pink)] to-[var(--lavender)]` | `border-[var(--bubblegum)]` | 特殊時刻、慶祝 |
| `glow` | 深色背景 | `border-[var(--fire-yellow)]` | 強調、聚光 |

### **🔥 FlameIcon 配色**

| 變體 | 背景色 | 邊框色 | 使用場景 |
|------|--------|--------|----------|
| `default` | `from-[var(--fire-orange)] to-[var(--fire-red)]` | `border-[var(--fire-orange)]` | 標準火焰效果 |
| `intense` | 深色背景 | `border-white` | 最高等級、極限 |
| `soft` | `from-[var(--sunshine)] to-[var(--tangerine)]` | `border-[var(--tangerine)]` | 溫和提示 |
| `multi` | `gradient-fire-animated` | `border-[var(--fire-red)]` | 多層次、複雜 |

---

## ✨ **動畫效果**

所有圖標都支持動畫，通過 `animated` 屬性控制：

### HeartIcon 動畫
- **縮放脈衝**：心臟每 1.5 秒縮放一次（1 → 1.1 → 1）
- **閃爍星星**（fire 變體）：內部星星閃爍和縮放
- **旋轉星星**（sparkle 變體）：外部星星 360° 旋轉

### FlameIcon 動畫
- **閃爍效果**：火焰高度和亮度變化模擬燃燒
- **上下搖擺**：火焰主體上下移動
- **白色核心脈衝**（intense 變體）：核心亮度變化
- **火花閃爍**（multi 變體）：星星裝飾閃爍

### 禁用動畫

```tsx
<HeartIcon size={24} variant="fire" animated={false} />
<FlameIcon size={24} variant="intense" animated={false} />
```

---

## 📏 **尺寸指南**

推薦使用的尺寸：

| 用途 | 推薦尺寸 | 示例 |
|------|----------|------|
| 徽章圖標 | `12-16px` | `<HeartIcon size={14} />` |
| 按鈕圖標 | `18-24px` | `<FlameIcon size={20} />` |
| 卡片裝飾 | `32-48px` | `<HeartIcon size={40} />` |
| 大標題 | `64-96px` | `<FlameIcon size={80} />` |

---

## 🎪 **完整示例**

### 進度卡片

```tsx
<Card>
  <div className="flex items-center justify-between gap-3">
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-2xl bg-gradient-to-br from-[var(--hot-pink)] to-[var(--coral)] border-[3px] border-[var(--hot-pink)] shadow-button">
        <HeartIcon size={24} variant="default" animated />
      </div>
      <div>
        <div className="font-black text-lg uppercase">Today's Progress</div>
        <div className="text-black/60 text-sm">Keep the momentum!</div>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <Badge variant="success">
        <HeartIcon size={12} variant="fire" animated />
        5 done
      </Badge>
      <Badge variant="warning">
        <FlameIcon size={12} variant="soft" animated />
        2 rest
      </Badge>
    </div>
  </div>
</Card>
```

### 成就橫幅

```tsx
<Card variant="fire">
  <div className="text-center py-8">
    <div className="flex justify-center mb-4">
      <div className="p-6 rounded-full bg-white/20 border-[4px] border-white shadow-button">
        <FlameIcon size={64} variant="intense" animated />
      </div>
    </div>
    <h2 className="text-3xl font-black uppercase text-white mb-2">
      You're On Fire! 🔥
    </h2>
    <p className="text-white/90">
      7-day streak achieved!
    </p>
    <DopamineButton variant="heart-fire" className="mt-6">
      <HeartIcon size={20} variant="fire" animated />
      Celebrate
    </DopamineButton>
  </div>
</Card>
```

### 統計儀表板

```tsx
<Grid cols={3} gap={4}>
  <Card className="text-center">
    <HeartIcon size={40} variant="default" animated />
    <div className="mt-3 text-2xl font-black">{hearts}</div>
    <div className="text-sm text-black/60 uppercase">Hearts</div>
  </Card>

  <Card className="text-center">
    <FlameIcon size={40} variant="intense" animated />
    <div className="mt-3 text-2xl font-black">{warmth}</div>
    <div className="text-sm text-black/60 uppercase">Warmth</div>
  </Card>

  <Card className="text-center">
    <HeartIcon size={40} variant="sparkle" animated />
    <div className="mt-3 text-2xl font-black">{streak}</div>
    <div className="text-sm text-black/60 uppercase">Streak</div>
  </Card>
</Grid>
```

---

## 💡 **設計原則**

1. **一致性**：在相同類型的數據上使用相同的圖標變體
2. **對比度**：火焰圖標使用溫暖色系，心臟圖標使用粉紅色系
3. **層次感**：大小和顏色強度反映重要性
4. **動畫節制**：不是所有圖標都需要動畫，重要的才需要
5. **語義化**：
   - 用 **HeartIcon** 表示喜愛、進度、健康
   - 用 **FlameIcon** 表示能量、熱情、連勝

---

## 🎨 **自定義樣式**

可以通過 `className` 添加自定義樣式：

```tsx
// 添加旋轉動畫
<HeartIcon 
  size={32} 
  variant="fire" 
  className="hover:rotate-12 transition-transform" 
/>

// 添加陰影
<FlameIcon 
  size={48} 
  variant="intense" 
  className="drop-shadow-2xl" 
/>

// 添加邊距
<HeartIcon 
  size={24} 
  variant="sparkle" 
  className="mr-2" 
/>
```

---

## 🚀 **性能優化**

- SVG 圖標非常輕量（< 2KB）
- 動畫使用 CSS + Motion，GPU 加速
- 可以禁用動畫以減少性能開銷
- 漸變使用 SVG `<linearGradient>`，高性能

---

## 📦 **導出**

```tsx
// 單獨導入
import { HeartIcon } from "../components/icons/HeartIcon";
import { FlameIcon } from "../components/icons/FlameIcon";

// 或從索引導入
import { HeartIcon, FlameIcon } from "../components/icons";

// DopamineButton
import { DopamineButton } from "../components/DopamineButton";
```

---

🎉 **享受你的多巴胺圖標！** 讓你的 UI 充滿活力和色彩！
