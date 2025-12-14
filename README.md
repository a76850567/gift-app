# 🌈 Gift App - Dopamine Retro Task Manager

一个充满活力的多巴胺复古风格任务管理应用，包含虚拟宠物 Plush、好友社交、AI 视频回忆等功能。

## 🎨 特点

- 🎴 **滑动卡片任务系统**：左滑完成，右滑休息
- 🔥 **Streak 连胜追踪**：保持每日打卡
- 🐻 **Plush 虚拟宠物**：随着 warmth 改变心情
- 📸 **Moments 时刻记录**：记录生活美好瞬间
- 🎬 **AI Video Memories**：自动生成成就视频
- 👥 **Friends Activity**：查看好友动态
- 🎯 **长期目标追踪**：30天挑战系统

## 🚀 三种使用方法

### 方法 1: 在线部署（推荐）⭐

#### Vercel 部署（最简单）
1. 访问 [vercel.com](https://vercel.com)
2. 注册/登录账号
3. 点击 "Add New Project"
4. 上传整个项目文件夹
5. 等待自动部署完成
6. 获得永久访问链接！

#### Netlify 部署
1. 访问 [netlify.com](https://netlify.com)
2. 注册/登录账号
3. 拖拽项目文件夹到网页
4. 自动部署完成

**优点**：
- ✅ 完全免费
- ✅ 3-5 分钟完成
- ✅ 获得永久链接
- ✅ 支持手机访问
- ✅ 不需要安装任何软件

---

### 方法 2: 本地运行

#### 前置要求
- 安装 [Node.js](https://nodejs.org/)（选择 LTS 版本）

#### 运行步骤

**Windows 用户**：
1. 双击运行 `START_APP.bat`
2. 浏览器会自动打开应用

**Mac/Linux 用户**：
1. 在终端中运行：
```bash
chmod +x START_APP.sh
./START_APP.sh
```

**手动运行**：
```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 在浏览器打开 http://localhost:3000
```

---

### 方法 3: 构建静态网站

生成可以直接用浏览器打开的 HTML 文件：

```bash
# 1. 安装依赖
npm install

# 2. 构建生产版本
npm run build

# 3. 预览构建结果
npm run preview
```

构建完成后，`dist` 文件夹包含所有静态文件，可以：
- 部署到任何静态网站托管服务
- 放到 U 盘里演示
- 上传到自己的服务器

---

## 📱 技术栈

- **前端框架**: React 18 + TypeScript
- **路由**: React Router
- **样式**: Tailwind CSS v4.0
- **动画**: Motion (Framer Motion)
- **图标**: Lucide React
- **状态管理**: React Hooks + LocalStorage

---

## 📂 项目结构

```
/
├── App.tsx                 # 主入口
├── main.tsx               # React 渲染入口
├── index.html             # HTML 模板
├── package.json           # 项目配置
├── framework/             # 可复用框架层
├── components/            # React 组件
├── pages/                 # 页面组件
├── hooks/                 # 自定义 Hooks
├── types/                 # TypeScript 类型
├── styles/                # 全局样式
└── config/                # 配置文件
```

---

## 🎯 核心页面

- **TODAY** - 今日任务卡片滑动
- **MOMENT** - 生活时刻记录
- **SPACE** - AI 视频 + 好友动态
- **ME** - 个人数据与设置

---

## 🌟 演示建议

### 如果明天要发表展示：

#### 🥇 最佳方案：Vercel 部署
- 今晚花 5 分钟部署到 Vercel
- 明天直接分享链接或展示网页
- 可以用手机/平板/电脑访问
- 看起来最专业

#### 🥈 备选方案：本地运行
- 提前在演示电脑上运行 `npm install` 和 `npm run dev`
- 演示时打开 `http://localhost:3000`
- 注意：需要演示电脑有 Node.js

#### 🥉 保险方案：录制视频
- 提前录制应用演示视频
- 如果现场出问题可以播放视频

---

## ❓ 常见问题

### Q: 能做成 .exe 文件吗？
A: 这是一个 Web 应用，不是原生 Windows 程序。但你可以：
- 部署到网站（推荐）
- 本地运行
- 使用 Electron 打包成桌面应用（需要额外配置）

### Q: 数据会丢失吗？
A: 数据存储在浏览器的 LocalStorage 中，只要不清除浏览器缓存就不会丢失。

### Q: 可以离线使用吗？
A: 可以！一旦加载过应用，即使断网也能继续使用（数据在本地）。

### Q: 支持手机吗？
A: 完全支持！应用采用响应式设计，在手机上体验更佳。

---

## 📧 联系方式

如有问题，欢迎联系！

---

## 📄 许可证

MIT License - 可自由使用和修改

---

**祝你明天的发表顺利！🎉**
