import { Router, Request, Response } from 'express';
import { AnalyzeResponse } from '../../shared/types';
import { analyzeGoBoard } from '../services/visionService';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const { image } = req.body;

    if (!image) {
      const response: AnalyzeResponse = {
        success: false,
        steps: [],
        overallAnalysis: '',
        error: '未上传图片'
      };
      return res.json(response);
    }

    if (!process.env.GEMINI_API_KEY) {
      const response: AnalyzeResponse = {
        success: false,
        steps: [],
        overallAnalysis: '',
        error: '未配置 AI API Key。请在 .env 文件中设置 GEMINI_API_KEY'
      };
      return res.status(500).json(response);
    }

    const analysis = await analyzeGoBoard(image);

    const response: AnalyzeResponse = {
      success: true,
      steps: analysis.steps,
      overallAnalysis: analysis.overallAnalysis
    };

    res.json(response);
  } catch (error) {
    console.error('分析出错:', error);
    const response: AnalyzeResponse = {
      success: false,
      steps: [],
      overallAnalysis: '',
      error: error instanceof Error ? error.message : '服务器内部错误'
    };
    res.status(500).json(response);
  }
});

export default router;
