# App Framework 使用指南

這是一個基於 React + TypeScript + Tailwind 的模塊化應用框架。你可以用它快速構建任何類型的移動端或桌面端應用。

## 📁 文件結構

```
/framework/              ← 核心框架（可復用）
  /components/          ← UI 組件庫
    - ui.tsx           ← 基礎 UI 組件
    - layout.tsx       ← 布局組件
  /hooks/              ← 通用 Hooks
    - useLocalStorage.ts
    - useTheme.ts
    - useDebounce.ts
    - useMediaQuery.ts
  /core/               ← 核心邏輯
    - AppProvider.tsx  ← 應用上下文
    - Router.tsx       ← 路由管理
  /types/              ← TypeScript 類型
    - index.ts
  /utils/              ← 工具函數
    - index.ts
  - index.ts           ← 框架入口

/config/               ← 應用配置
  - app.config.tsx     ← 主配置文件

/pages/                ← 應用頁面
  - TodayPage.tsx
  - MomentsPage.tsx
  - ...

/components/           ← 應用特定組件
  - PlushAvatar.tsx
  - SwipeCard.tsx
  - ...

/hooks/                ← 應用特定 Hooks
  - useGiftApp.ts

/types/                ← 應用特定類型
  - gift.ts

/App.tsx              ← 應用入口
```

---

## 🚀 快速開始

### 1. 配置你的應用

編輯 `/config/app.config.tsx`：

```tsx
import { Home, Settings } from "lucide-react";
import { HomePage } from "../pages/HomePage";
import { SettingsPage } from "../pages/SettingsPage";

export const appConfig: AppConfig = {
  name: "My App",
  version: "1.0.0",
  
  // 主題配置
  theme: {
    default: {
      accent: "blue",
      reduceMotion: false,
    },
    colors: ["pink", "orange", "blue", "purple", "green"],
  },
  
  // 路由配置
  routes: [
    {
      path: "/",
      label: "Home",
      icon: Home,
      component: HomePage,
    },
    {
      path: "/settings",
      label: "Settings",
      icon: Settings,
      component: SettingsPage,
    },
  ],
};
```

### 2. 創建頁面

創建 `/pages/HomePage.tsx`：

```tsx
import React from "react";
import { Shell, PageHeader, Card, Button } from "../framework";

export function HomePage() {
  return (
    <Shell>
      <PageHeader
        subtitle="Welcome"
        title="My App"
      />

      <div className="mt-6 space-y-4">
        <Card>
          <h2 className="font-semibold">Hello World</h2>
          <p className="text-black/60 mt-2">Start building your app!</p>
          <Button className="mt-4">Get Started</Button>
        </Card>
      </div>
    </Shell>
  );
}
```

### 3. 運行應用

應用會自動使用你的配置和頁面！

---

## 🎨 使用框架組件

### UI 組件

```tsx
import {
  Card,
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Badge,
  Modal,
  Loading,
  EmptyState,
} from "../framework";

// 使用示例
<Card>
  <Input
    label="Email"
    value={email}
    onChange={setEmail}
    type="email"
  />
  
  <Button variant="primary" fullWidth>
    Submit
  </Button>
  
  <Badge variant="success">Active</Badge>
</Card>
```

### 布局組件

```tsx
import {
  Shell,
  PageHeader,
  Section,
  Stack,
  Grid,
} from "../framework";

<Shell>
  <PageHeader
    subtitle="Dashboard"
    title="Welcome back"
    badges={<Badge>New</Badge>}
  />

  <Section
    title="My Section"
    description="Section description"
  >
    <Grid cols={2} gap={4}>
      <Card>Item 1</Card>
      <Card>Item 2</Card>
    </Grid>
  </Section>
</Shell>
```

### Hooks

```tsx
import {
  useLocalStorage,
  useTheme,
  useDebounce,
  useMediaQuery,
} from "../framework";

function MyComponent() {
  // 持久化狀態
  const [data, setData] = useLocalStorage("key", defaultValue);
  
  // 主題管理
  const { theme, setAccent, toggleDarkMode } = useTheme(defaultTheme);
  
  // 防抖搜索
  const debouncedSearch = useDebounce(searchTerm, 500);
  
  // 響應式檢測
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return <div>...</div>;
}
```

### 工具函數

```tsx
import {
  generateId,
  getDayKey,
  formatDate,
  clamp,
  cn,
  downloadJSON,
} from "../framework";

// 生成唯一 ID
const id = generateId("task");

// 日期工具
const today = getDayKey();
const formatted = formatDate(Date.now(), "long");

// 數字工具
const value = clamp(50, 0, 100);

// 樣式工具
const className = cn("base-class", isActive && "active-class");

// 導出 JSON
downloadJSON(data, "export.json");
```

---

## 🎯 創建自定義 Hook

創建 `/hooks/useMyApp.ts`：

```tsx
import { useState } from "react";
import { useLocalStorage, generateId } from "../framework";

export function useMyApp() {
  const [state, setState] = useLocalStorage("my_app", {
    items: [],
  });

  function addItem(title: string) {
    setState((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: generateId(),
          title,
          createdAt: Date.now(),
        },
      ],
    }));
  }

  return {
    state,
    addItem,
  };
}
```

在頁面中使用：

```tsx
import { useMyApp } from "../hooks/useMyApp";

export function MyPage() {
  const { state, addItem } = useMyApp();
  
  return (
    <div>
      {state.items.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```

---

## 🎨 自定義主題

框架使用 CSS 變量來管理主題：

```css
/* 框架會自動設置這些變量 */
--accent-color: #FF5FA2;
--animation-duration: 300ms;
```

在組件中使用：

```tsx
<div style={{ color: "var(--accent-color)" }}>
  Accent text
</div>
```

---

## 📱 響應式設計

所有組件都支持響應式：

```tsx
// 使用 Grid 組件
<Grid cols={3}>  {/* 自動響應：mobile 1列，tablet 2列，desktop 3列 */}
  <Card>1</Card>
  <Card>2</Card>
  <Card>3</Card>
</Grid>

// 使用 Tailwind 響應式類
<div className="flex flex-col md:flex-row gap-4">
  ...
</div>

// 使用 useMediaQuery Hook
const isMobile = useMediaQuery("(max-width: 768px)");
```

---

## 🔧 擴展框架

### 添加新的 UI 組件

在 `/framework/components/ui.tsx` 中：

```tsx
export function MyNewComponent({ ... }) {
  return <div>...</div>;
}
```

在 `/framework/index.ts` 中導出：

```tsx
export { MyNewComponent } from "./components/ui";
```

### 添加新的 Hook

1. 創建 `/framework/hooks/useMyHook.ts`
2. 在 `/framework/hooks/index.ts` 中導出
3. 在 `/framework/index.ts` 中導出

### 添加新的工具函數

在 `/framework/utils/index.ts` 中添加並導出

---

## 💡 最佳實踐

### 1. 保持框架層純淨
- `/framework/` 目錄應該只包含通用、可復用的代碼
- 不要在框架層放置應用特定的邏輯

### 2. 使用類型安全
- 為你的數據定義 TypeScript 類型
- 放在 `/types/` 目錄中

### 3. 組件化思維
- 將複雜的 UI 拆分成小組件
- 放在 `/components/` 目錄中

### 4. 集中管理狀態
- 創建自定義 Hook 來管理應用狀態
- 放在 `/hooks/` 目錄中

### 5. 配置驅動
- 盡可能通過 `/config/app.config.tsx` 配置應用
- 避免硬編碼

---

## 🎯 常見場景

### 創建表單頁面

```tsx
import React, { useState } from "react";
import { Shell, PageHeader, Card, Input, Textarea, Button } from "../framework";

export function FormPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log({ title, description });
  };

  return (
    <Shell>
      <PageHeader title="New Item" />
      
      <Card className="mt-6">
        <Input
          label="Title"
          value={title}
          onChange={setTitle}
          required
        />
        
        <Textarea
          label="Description"
          value={description}
          onChange={setDescription}
          className="mt-4"
        />
        
        <Button
          onClick={handleSubmit}
          fullWidth
          className="mt-4"
        >
          Submit
        </Button>
      </Card>
    </Shell>
  );
}
```

### 創建列表頁面

```tsx
import React from "react";
import { Shell, PageHeader, Card, Badge, EmptyState } from "../framework";
import { Inbox } from "lucide-react";

export function ListPage() {
  const items = []; // 從 hook 獲取

  return (
    <Shell>
      <PageHeader title="My List" />
      
      {items.length > 0 ? (
        <div className="mt-6 space-y-3">
          {items.map(item => (
            <Card key={item.id}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-black/60">{item.description}</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Inbox size={48} />}
          title="No items yet"
          description="Start by adding your first item"
          action={{
            label: "Add Item",
            onClick: () => console.log("Add"),
          }}
        />
      )}
    </Shell>
  );
}
```

---

## 🚀 下一步

1. **探索現有組件**：查看 `/framework/components/` 了解所有可用組件
2. **閱讀 Hooks 文檔**：查看 `/framework/hooks/` 了解所有可用 hooks
3. **查看示例應用**：當前的 Gift App 是一個完整的示例
4. **開始構建**：基於框架創建你自己的應用

---

## 📚 參考

- **React Router**: 路由管理
- **Motion (Framer Motion)**: 動畫
- **Lucide React**: 圖標庫
- **Tailwind CSS**: 樣式系統

---

## 🎉 享受構建過程！

這個框架旨在讓你快速啟動並專注於應用邏輯，而不是重複造輪子。如果有任何問題或需要擴展，隨時修改框架代碼！
