# 绝艺推荐解读工具

一个基于 AI 视觉分析的围棋绝艺推荐解读工具，可以识别并分析绝艺推荐的每一步棋。

## 功能特点

- 📷 上传绝艺推荐截图
- 🤖 AI 智能识别棋盘上的序号棋子
- 📝 详细解读每步棋的原因和战略意图
- 🎯 全局局势分析和行棋建议

## 技术栈

- **前端**: React 18 + TypeScript + Tailwind CSS + Vite
- **后端**: Express + TypeScript
- **AI**: Google Gemini Vision (免费版本)

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 Google Gemini API Key

访问 [Google AI Studio](https://makersuite.google.com/app/apikey) 获取免费的 API Key。

将获取的 Key 填入 `.env` 文件：

```
GEMINI_API_KEY=你的API_KEY
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:5173/

## 使用方法

1. 在左侧区域上传绝艺推荐的截图（支持拖拽或点击上传）
2. 点击"开启绝艺推荐解读"按钮
3. 查看右侧的分析结果

## 注意事项

- Google Gemini 免费版本有使用额度限制，请参考 [官方政策](https://ai.google.dev/pricing)
- 上传的截图建议清晰可见，以便 AI 准确识别棋子序号
- 首次使用可能需要等待几秒钟进行 AI 分析

## 开发

```bash
# 前端开发
npm run client:dev

# 后端开发
npm run server:dev

# 构建生产版本
npm run build
```

## 许可证

MIT
