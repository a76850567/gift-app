# 🌈 Dopamine Design System

基於你的 moodboard 創建的**復古多巴胺風格設計系統**。

---

## 🎨 **核心設計元素**

### 1. **配色方案**

```css
/* 主色調 - 鮮艷多巴胺色 */
--hot-pink: #FF1B8D        /* 熱粉 */
--coral: #FF6B4A           /* 珊瑚橙 */
--tangerine: #FF9B3D       /* 橘子橙 */
--sunshine: #FFD93D        /* 陽光黃 */
--lime: #B8E62E            /* 檸檬綠 */
--mint: #4ECDC4            /* 薄荷綠 */
--sky: #45B7D1             /* 天空藍 */
--lavender: #9B6DFF        /* 薰衣草紫 */
--bubblegum: #FF85C0       /* 泡泡糖粉 */

/* 燃燒的心臟色 */
--fire-red: #FF3D3D        /* 火焰紅 */
--fire-orange: #FF8C42     /* 火焰橙 */
--fire-yellow: #FFC857     /* 火焰黃 */
```

### 2. **彩虹漸變**

```css
/* 主彩虹漸變 */
background: linear-gradient(
  90deg,
  #FF1B8D 0%,   /* 粉紅 */
  #FF6B4A 14%,  /* 珊瑚 */
  #FF9B3D 28%,  /* 橘子 */
  #FFD93D 42%,  /* 黃色 */
  #B8E62E 57%,  /* 綠色 */
  #4ECDC4 71%,  /* 青色 */
  #45B7D1 85%,  /* 藍色 */
  #9B6DFF 100%  /* 紫色 */
);
```

### 3. **陰影系統**

```css
/* 復古陰影（硬邊） */
--shadow-retro: 6px 6px 0px rgba(0, 0, 0, 0.25);

/* 按鈕陰影 */
--shadow-button: 4px 4px 0px rgba(0, 0, 0, 0.25);

/* 發光效果 */
--shadow-glow: 0 0 30px currentColor;
```

### 4. **圓角系統**

```css
--radius: 1.5rem;         /* 24px - 基礎圓角 */
--radius-full: 9999px;    /* 完全圓形 */
```

---

## 🎯 **組件風格指南**

### **按鈕 (Button)**

#### Primary - 熱粉漸變
```tsx
<Button variant="primary">
  Click Me!
</Button>
```
- 漸變：粉紅 → 珊瑚橙
- 邊框：4px 深粉色
- 陰影：4px 硬陰影
- 文字：全大寫、粗體

#### Secondary - 陽光漸變
```tsx
<Button variant="secondary">
  Click Me!
</Button>
```
- 漸變：橘子橙 → 陽光黃
- 邊框：4px 深橙色
- 文字：黑色、全大寫

#### Rainbow - 彩虹漸變
```tsx
<Button variant="rainbow">
  Sparkle!
</Button>
```
- 完整彩虹漸變
- 白色邊框
- 發光效果（可選）

#### Ghost - 簡約風格
```tsx
<Button variant="ghost">
  Cancel
</Button>
```
- 白色背景
- 黑色邊框
- 無漸變

### **卡片 (Card)**

#### Default - 標準卡片
```tsx
<Card>
  Content here
</Card>
```
- 白色背景 (95% 透明度)
- 4px 黑色邊框
- 6px 硬陰影
- 3rem 圓角

#### Rainbow - 彩虹卡片
```tsx
<Card variant="rainbow">
  Special content
</Card>
```
- 彩虹漸變背景
- 透明邊框
- 白色文字

#### Glow - 發光卡片
```tsx
<Card variant="glow">
  Important content
</Card>
```
- 標準樣式 + 粉色發光效果

### **徽章 (Badge)**

```tsx
{/* 成功 - 綠色漸變 */}
<Badge variant="success">DONE</Badge>

{/* 警告 - 橙黃漸變 */}
<Badge variant="warning">REST</Badge>

{/* 危險 - 紅橙漸變 */}
<Badge variant="danger">ERROR</Badge>

{/* 彩虹 */}
<Badge variant="rainbow" sparkle>
  SPECIAL
</Badge>
```

特點：
- 全大寫文字
- 2px 邊框
- 圓形膠囊形狀
- 小硬陰影

### **輸入框 (Input)**

```tsx
<Input
  label="YOUR NAME"
  placeholder="Type here..."
/>
```

特點：
- 3px 邊框
- 聚焦時粉紅邊框 + 發光
- 圓角 2rem
- 標籤全大寫

---

## ✨ **裝飾元素**

### 1. **閃光星星**
```css
.sparkle {
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8) rotate(0deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.2) rotate(180deg);
  }
}
```

### 2. **浮動動畫**
```css
.float {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```

### 3. **發光脈衝**
```css
.glow {
  animation: glow-pulse 2s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 20px currentColor;
  }
  50% {
    box-shadow: 0 0 40px currentColor, 0 0 60px currentColor;
  }
}
```

### 4. **彩虹流動**
```css
.gradient-rainbow {
  background: var(--rainbow);
  background-size: 200% 200%;
  animation: rainbow-shift 3s ease infinite;
}
```

---

## 🎪 **版式規則**

### **標題**
```css
h1 {
  font-size: 2.5rem;        /* 40px */
  font-weight: 900;         /* Black */
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 1.2;
}
```

### **按鈕文字**
```css
button {
  font-weight: 700;         /* Bold */
  text-transform: uppercase;
  letter-spacing: 0.05em;   /* 字母間距 */
}
```

### **小標籤**
```css
label {
  font-weight: 600;         /* Semi-bold */
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
}
```

---

## 🌟 **特殊效果**

### **文字漸變**
```tsx
<PageHeader title="My Title" rainbow={true} />
```
使用 `.text-gradient` 類：
```css
.text-gradient {
  background: var(--rainbow);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

### **復古邊框**
```css
.retro-border {
  border: 4px solid;
  border-image: var(--rainbow) 1;
  box-shadow: var(--shadow-retro);
}
```

### **背景星星**
Body 自動添加閃爍的星星背景：
```css
body::before {
  /* 7 個徑向漸變形成星星圖案 */
  background-image: 
    radial-gradient(2px 2px at 20% 30%, white, transparent),
    radial-gradient(2px 2px at 60% 70%, white, transparent),
    /* ... 更多星星 */
  opacity: 0.6;
  animation: sparkle 4s ease-in-out infinite;
}
```

---

## 🎨 **使用場景**

### **1. Hero Section**
```tsx
<PageHeader 
  subtitle="✨ Welcome" 
  title="Dopamine App"
  rainbow={true}
  badges={
    <Badge variant="rainbow" sparkle>
      New!
    </Badge>
  }
/>
```

### **2. 卡片網格**
```tsx
<Grid cols={2} gap={4}>
  <Card variant="glow">
    <h3>Card 1</h3>
  </Card>
  <Card variant="rainbow">
    <h3>Card 2</h3>
  </Card>
</Grid>
```

### **3. 按鈕組**
```tsx
<div className="flex gap-3">
  <Button variant="primary" glow fullWidth>
    Primary Action
  </Button>
  <Button variant="ghost" fullWidth>
    Cancel
  </Button>
</div>
```

### **4. 狀態徽章**
```tsx
<Badge variant="success" sparkle>
  ✓ DONE
</Badge>
```

---

## 🔥 **Plush Avatar 特效**

根據心情等級的視覺變化：

### Sleepy (溫暖值 < 20)
- 灰色漸變
- 2 顆星星
- 無發光

### Calm (20-59)
- 橙黃漸變
- 5 顆星星
- 淡發光

### Happy (60-119)
- 粉橙漸變  
- 8 顆星星
- 中度發光

### Spark (120+) 🔥
- 紅橙黃火焰漸變
- 12 顆星星
- 強烈發光 + 動態背景
- 燃燒效果

---

## 📱 **響應式設計**

所有組件自動適配移動端：

```tsx
{/* 自動響應式網格 */}
<Grid cols={3}>
  {/* Mobile: 1 列, Tablet: 2 列, Desktop: 3 列 */}
</Grid>

{/* 按鈕在小屏幕上全寬 */}
<Button fullWidth>Click Me</Button>
```

---

## 🎯 **顏色使用建議**

| 用途 | 顏色 | 漸變 |
|------|------|------|
| 主要操作 | Hot Pink | Pink → Coral |
| 次要操作 | Tangerine | Orange → Yellow |
| 成功狀態 | Lime | Lime → Mint |
| 警告 | Coral | Coral → Orange |
| 錯誤 | Fire Red | Red → Orange |
| 特殊強調 | Rainbow | Full spectrum |

---

## 🚀 **快速參考**

### CSS 變量
```css
var(--hot-pink)      /* 主色 */
var(--rainbow)       /* 彩虹漸變 */
var(--shadow-retro)  /* 硬陰影 */
var(--radius)        /* 圓角 */
```

### 工具類
```css
.text-gradient       /* 彩虹文字 */
.gradient-rainbow    /* 彩虹背景 */
.sparkle            /* 閃爍動畫 */
.float              /* 浮動動畫 */
.glow               /* 發光動畫 */
```

---

## 💡 **設計原則**

1. **大膽鮮艷** - 不怕用亮色
2. **硬邊陰影** - 復古風格的標誌
3. **圓角一致** - 1.5rem 或完全圓形
4. **粗邊框** - 3-4px 邊框突出元素
5. **全大寫** - 標題和按鈕使用大寫字母
6. **漸變優先** - 使用漸變而非純色
7. **動畫點綴** - 適度使用閃爍和浮動效果
8. **白色為主** - 卡片用白色背景確保可讀性

---

🎉 **享受多巴胺設計！**
