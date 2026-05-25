import { useState } from 'react';
import ImageUploader from '../components/ImageUploader';
import AnalysisResults from '../components/AnalysisResults';
import { AnalyzeResponse, StepAnalysis } from '../../shared/types';
import { Sparkles, Loader2 } from 'lucide-react';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

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
