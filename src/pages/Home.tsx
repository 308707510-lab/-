import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import AnalysisResults from '../components/AnalysisResults';
import { AnalyzeResponse } from '../../shared/types';
import { Sparkles, Loader2, Info, ExternalLink } from 'lucide-react';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);
    setUsingMockData(false);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: selectedImage }),
      });

      const data = await response.json();

      if (data.success) {
        setAnalysisResult(data);
        setUsingMockData(data.usingMockData || false);
      } else {
        setError(data.error || '分析失败');
      }
    } catch (err) {
      setError('网络错误，请稍后重试');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-wood-dark font-playfair mb-3">
            绝艺推荐解读
          </h1>
          <p className="text-stone text-lg max-w-2xl mx-auto">
            上传绝艺推荐截图，AI 智能分析每步棋的意图与策略
          </p>
          
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 text-blue-800 max-w-2xl mx-auto text-left">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-600" />
              <div>
                <p className="font-semibold mb-1">💡 使用真实AI功能说明</p>
                <p className="text-sm text-blue-700">
                  当前使用演示数据。如需真正识别绝艺推荐，请配置 API Key：
                </p>
                <ol className="list-decimal list-inside mt-2 text-sm text-blue-700">
                  <li>访问 <a href="https://dashscope.console.aliyun.com/apiKey" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex items-center gap-1 inline-flex">阿里云百炼 <ExternalLink className="w-3 h-3" /></a></li>
                  <li>注册/登录并创建 API Key</li>
                  <li>在项目根目录 <code className="bg-blue-100 px-1 rounded">.env</code> 文件中配置 <code className="bg-blue-100 px-1 rounded">QWEN_API_KEY</code></li>
                  <li>重启服务即可使用真实AI识别</li>
                </ol>
              </div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-stone/10">
              <ImageUploader
                selectedImage={selectedImage}
                onImageSelect={setSelectedImage}
                onClear={() => {
                  setSelectedImage(null);
                  setAnalysisResult(null);
                  setError(null);
                  setUsingMockData(false);
                }}
              />
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleAnalyze}
                disabled={!selectedImage || isAnalyzing}
                className={`
                  px-8 py-4 rounded-xl text-lg font-semibold flex items-center gap-3 transition-all duration-300
                  ${
                    !selectedImage || isAnalyzing
                      ? 'bg-stone/30 text-stone cursor-not-allowed'
                      : 'bg-gold-accent text-wood-dark hover:scale-105 hover:shadow-lg active:scale-95'
                  }
                `}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    分析中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    开启绝艺推荐解读
                  </>
                )}
              </button>
            </div>

            {usingMockData && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-800">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">当前使用演示数据</p>
                    <p className="text-sm mt-1">
                      由于网络环境问题，无法连接 Google AI。当前显示的是示例分析结果。
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
                {error}
              </div>
            )}
          </div>

          <div className="lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto lg:pr-2 scrollbar-hide">
            {analysisResult && analysisResult.success && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-stone/10">
                <AnalysisResults
                  steps={analysisResult.steps}
                  overallAnalysis={analysisResult.overallAnalysis}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
