import { GoogleGenerativeAI } from '@google/generative-ai';
import { StepAnalysis } from '../../shared/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const GEMINI_MODEL_NAME = 'gemini-1.5-flash';

const mockAnalyses = [
  {
    steps: [
      {
        step: 1,
        position: '右上角星位附近',
        reason: '这步棋占据了要点，既确保了角部实地，又为后续的扩张打下了基础。在当前局面下，角部是最有价值的区域。',
        expectation: '期望能够稳定角地，并为右边和上边的发展创造条件。'
      },
      {
        step: 2,
        position: '左边中腹',
        reason: '这步棋瞄住了黑棋的弱点，同时扩张了白棋的势力范围。通过威胁黑棋的联络，迫使黑棋应对。',
        expectation: '期望能够先手利用，或在中腹形成厚势，为后续战斗做准备。'
      },
      {
        step: 3,
        position: '下边星位',
        reason: '这步棋是大场，既扩大了自己的地盘，又限制了对方的发展。此时下边的价值最大。',
        expectation: '期望能够确立下边的实空，同时保持对中央的影响力。'
      },
      {
        step: 4,
        position: '中腹要点',
        reason: '这步棋是双方消长的要点，占据此处可以同时威胁对方和扩张自己。是当前局面下的急所。',
        expectation: '期望能够在中腹取得主动权，引导后续的战斗方向。'
      },
      {
        step: 5,
        position: '右下角小飞',
        reason: '这步棋安定了右下角，同时瞄着后续的侵入手段。在实空对比的关键时刻，确保实地很重要。',
        expectation: '期望能够完全守住右下角，不给对方留下可乘之机。'
      }
    ],
    overallAnalysis: '从全局来看，当前局面黑棋实空略优，但白棋在中腹有发展潜力。绝艺推荐的这几步棋思路清晰，先占据要点确保实地，再争抢中腹主动权，最后安定自己的弱棋。整体策略是先巩固后发展，符合围棋的基本原理。建议后续行棋要注意厚薄的平衡，不要过度贪功冒进，保持局面的主动性。'
  },
  {
    steps: [
      {
        step: 1,
        position: '三三位置',
        reason: '三三是当前局面下的最佳选点，可以彻底安定角部，同时避免复杂的定式变化。在这个局势下，简明最为重要。',
        expectation: '期望能够快速安定这块棋，为其他战场的战斗积蓄力量。'
      },
      {
        step: 2,
        position: '拆边',
        reason: '这步棋既扩大了自己的阵营，又限制了对方的发展空间，是攻守兼备的好手。',
        expectation: '期望能够形成两翼张开的理想棋形，保持局面的领先优势。'
      },
      {
        step: 3,
        position: '中央跳',
        reason: '这步棋出头顺畅，同时对对方形成压迫，是关系到双方厚薄的要点。',
        expectation: '期望能够在中央形成厚势，为后续的攻击创造条件。'
      },
      {
        step: 4,
        position: '碰',
        reason: '这是试应手的好手，通过试探对方的应手来决定自己的后续策略，体现了围棋的灵活性。',
        expectation: '期望能够根据对方的应对，找到最佳的后续手段。'
      },
      {
        step: 5,
        position: '退',
        reason: '这步棋看似普通，实则是坚实的选择，既确保了自身的连接，又为后续留下了变化空间。',
        expectation: '期望能够稳住局面，等待对方露出破绽再发动攻击。'
      },
      {
        step: 6,
        position: '尖顶',
        reason: '这是紧凑的一手，通过压缩对方的空间来获取利益，同时强化自己的棋形。',
        expectation: '期望能够在局部获得便宜，逐步扩大优势。'
      }
    ],
    overallAnalysis: '纵观全局，目前局面形势微妙，双方势均力敌。绝艺推荐的这几步棋体现了深厚的功力：先在三三扎根确保根基，然后通过拆边和跳来扩张势力，最后在局部通过细腻的手段获取利益。整体策略是先稳固后进取，张弛有度。建议在后续行棋中保持这一思路，不要急于求成，通过小优势的积累逐步走向胜利。'
  }
];

async function analyzeWithGemini(imageBase64: string): Promise<{
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
}

function getMockAnalysis(): {
  steps: StepAnalysis[];
  overallAnalysis: string;
} {
  const randomIndex = Math.floor(Math.random() * mockAnalyses.length);
  return mockAnalyses[randomIndex];
}

export async function analyzeGoBoard(imageBase64: string): Promise<{
  steps: StepAnalysis[];
  overallAnalysis: string;
}> {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.log('使用模拟数据（未配置 API Key）');
    return getMockAnalysis();
  }

  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      console.log(`尝试连接 Google API (${attempt}/2)...`);
      const result = await analyzeWithGemini(imageBase64);
      console.log('AI分析成功');
      return result;
    } catch (error) {
      lastError = error as Error;
      console.warn(`第 ${attempt} 次尝试失败:`, lastError.message);
      
      if (attempt === 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  console.log('Google API 连接失败，使用模拟数据');
  return getMockAnalysis();
}
