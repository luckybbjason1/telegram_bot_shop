# 缺啥补啥 - Telegram USDT 智能商城 (Mini App)

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38b2ac)

**缺啥补啥** 是一个基于 Telegram Mini App (Web App) 平台的高端数字商品交易商城。前端采用 React + Vite 构建，专为移动端体验优化，支持 USDT (TRC-20) 支付流程和管理员后台管理。

---

## ✨ 核心功能

### 🛍️ 用户端
- **双语支持**：自动检测用户语言，支持 **中文 (CN)** 和 **韩文 (KR)** 切换。
- **流畅体验**：基于 React 18 的现代化 UI，拥有骨架屏加载、平滑动画和暗黑模式。
- **购物车系统**：添加商品、调整数量、实时计算总价。
- **智能排序**：支持按价格（高/低）和名称（A-Z）排序商品。
- **USDT 收银台**：
  - 自动生成收款二维码。
  - 一键复制收款地址。
  - **TxID 智能识别**：支持一键粘贴交易哈希，并进行格式验证。
- **社交分享**：商品详情页支持一键分享到 Telegram 聊天。

### 🛡️ 管理员端
- **权限识别**：自动识别管理员 Telegram ID，显示专属操作入口。
- **商品管理**：
  - **上架**：上传图片（支持预览）、设置名称、价格、库存和描述。
  - **下架**：在商品卡片上一键删除商品。
- **库存管理**：设置初始库存，售出后自动扣减（前端演示逻辑），缺货自动显示标签。

---

## 🛠️ 技术栈

- **构建工具**: Vite 5
- **核心框架**: React 18
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图标库**: Lucide React
- **平台交互**: Telegram WebApp SDK

---

## 🚀 快速部署指南

只需 3 步，即可将商城上线并连接到您的 Python Bot。

### 第一步：获取代码并上传 GitHub
1. 初始化 Git 并提交代码：
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. 在 GitHub 创建一个新的 **Public** 或 **Private** 仓库。
3. 推送代码：
   ```bash
   git remote add origin https://github.com/您的用户名/您的仓库名.git
   git branch -M main
   git push -u origin main
   ```

### 第二步：部署到 Vercel (免费)
1. 访问 [Vercel.com](https://vercel.com) 并使用 GitHub 登录。
2. 点击 **Add New Project**。
3. 导入刚才创建的 GitHub 仓库。
4. **Framework Preset** 选择 `Vite`。
5. 点击 **Deploy**。
6. 部署完成后，您将获得一个 HTTPS 链接（例如：`https://que-sha-bu-sha.vercel.app`）。

### 第三步：连接 Python Telegram Bot
在您的 Python Bot 代码中，修改 InlineKeyboard 的按钮配置：

```python
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo

# ... 您的其他代码 ...

keyboard = InlineKeyboardMarkup([
    [InlineKeyboardButton(
        text="🛒 进入商城 (缺啥补啥)", 
        web_app=WebAppInfo(url="https://您的Vercel链接.app") # 替换为第二步获取的链接
    )]
])

await update.message.reply_text("欢迎光临！点击下方按钮进入商城：", reply_markup=keyboard)
```

---

## ⚙️ 配置说明

### 修改管理员 ID 和收款地址
打开项目中的 `types.ts` 文件进行修改：

```typescript
// types.ts

// 替换为您自己的 Telegram User ID (可通过 @userinfobot 获取)
export const ADMIN_ID = 7935557847;

// 替换为您的 USDT-TRC20 收款地址
export const ADMIN_WALLET_ADDRESS = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
```

---

## 📖 使用手册

### 管理员如何上架商品？
1. 使用配置好的管理员账号（ID: 7935557847）打开商城。
2. 页面右下角会出现一个绿色的 **+ (加号)** 悬浮按钮。
3. 点击按钮，填写商品信息（图片、名称、价格、库存）。
4. 点击“上架商品”即可实时显示在主页。

### 用户支付流程是怎样的？
1. 用户将商品加入购物车 -> 点击去支付。
2. 系统弹出收银台，显示总金额和二维码。
3. 用户在自己的钱包 App 转账 USDT。
4. 用户复制转账成功的 **交易哈希 (TxID)**。
5. 回到商城，点击输入框旁的“粘贴”按钮，填入 TxID。
6. 点击“我已支付”，数据将发送给 Bot 后台进行验证。

---

## 💻 本地开发

如果您想在本地修改代码：

1. **安装依赖**：
   ```bash
   npm install
   ```

2. **启动开发服务器**：
   ```bash
   npm run dev
   ```

3. **构建生产版本**：
   ```bash
   npm run build
   ```

---

## 📁 目录结构

```
src/
├── components/       # UI 组件 (商品卡片, 弹窗, 导航栏等)
├── store/           # 状态管理 (购物车逻辑, 商品数据)
├── types.ts         # TypeScript 类型定义 & 全局配置
├── translations.ts  # 多语言字典 (CN/KR)
├── App.tsx          # 主入口文件
└── index.tsx        # React 挂载点
```

---

*Made with ❤️ for Telegram Community*
