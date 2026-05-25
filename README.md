# 绝艺推荐解读工具

一个基于 AI 视觉分析的围棋绝艺推荐解读工具，可以识别并分析绝艺推荐的每步棋。

## 功能特点

- 📷 上传绝艺推荐截图
- 🤖 AI 智能识别棋盘上的序号棋子
- 📝 详细解读每步棋的原因和战略意图
- 🎯 全局局势分析和行棋建议

## 支持的 AI 服务

### 方案1：通义千问（推荐，中国用户）⭐
- ✅ 中国可直接访问
- ✅ 免费额度充足
- ✅ 中文理解能力好

### 方案2：Google Gemini（海外用户）
- ✅ 免费使用
- ✅ 多模态能力强

### 方案3：演示模式
- ✅ 无需配置任何 API
- ✅ 即开即用，测试功能

## 快速开始

### 步骤1：获取 API Key（推荐通义千问）

1. 访问 [阿里云百炼控制台](https://dashscope.console.aliyun.com/apiKey)
2. 注册/登录阿里云账号
3. 创建 API Key
4. 复制 API Key

### 步骤2：配置 API Key

编辑 `.env` 文件，将 API Key 填入：

```env
# 使用通义千问（推荐）
QWEN_API_KEY=你的_API_KEY
```

或者使用 Google Gemini（海外用户）：
```env
GEMINI_API_KEY=你的_API_KEY
```

### 步骤3：启动应用

```bash
npm install
npm run dev
```

访问 http://localhost:5173/

## 使用方法

1. 在左侧区域上传绝艺推荐的截图（支持拖拽或点击上传）
2. 点击"开启绝艺推荐解读"按钮
3. 查看右侧的分析结果

## 开发

```bash
# 前端开发
npm run client:dev

# 后端开发
npm run server:dev

# 构建生产版本
npm run build
```

## 注意事项

- 如果使用通义千问，确保您已开通服务
- API Key 请妥善保管，不要提交到公开仓库
- 首次使用可能需要等待几秒钟进行 AI 分析

## 技术栈

- **前端**：React 18 + TypeScript + Tailwind CSS + Vite
- **后端**：Express + TypeScript
- **AI**：通义千问 / Google Gemini

## 许可证

MIT
