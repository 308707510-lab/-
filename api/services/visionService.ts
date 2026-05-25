import { GoogleGenerativeAI } from '@google/generative-ai';
import { StepAnalysis } from '../../shared/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const GEMINI_MODEL_NAME = 'gemini-1.5-flash';

export async function analyzeGoBoard(imageBase64: string): Promise<{
  steps: StepAnalysis[];
  overallAnalysis: string;
}> {
  const model = genAI.getGenerativeModel({ model: GEMINI_MODEL_NAME });

  const prompt = `你是一个专业的围棋解说师。请分析这张绝艺AI推荐的围棋截图。

请完成以下任务：
1. 识别图中所有带有序号的棋子（通常是1-10步的推荐）
2. 对每一步棋进行详细分析，包括：
   - 这步棋的位置（使用围棋术语，如"右上角星位"、"天元"等）
   - 为什么这样下（棋理分析）
   - 期望达成的效果（战略意图）
3. 对整个棋局的局势进行总体分析

请按以下JSON格式返回结果：
{
  "steps": [
    {
      "step": 1,
      "position": "位置描述",
      "reason": "为什么这样下",
      "expectation": "期望达成的效果"
    }
  ],
  "overallAnalysis": "全局局势分析和建议"
}

重要：
- steps数组应该按照序号从小到大排列
- position应该使用围棋术语，准确描述棋子的位置
- reason要深入分析棋理，结合具体局面
- overallAnalysis要对后续行棋方向提供建议
- 只返回JSON，不要有其他文字`;

  try {
    const imageData = imageBase64.replace(/^data:image\/\w+;base64,/, '');
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: 'image/png',
          data: imageData,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('无法解析AI返回的结果');
    }

    const analysis = JSON.parse(jsonMatch[0]);

    return {
      steps: analysis.steps || [],
      overallAnalysis: analysis.overallAnalysis || '暂无全局分析',
    };
  } catch (error) {
    console.error('Gemini分析失败:', error);
    throw error;
  }
}
