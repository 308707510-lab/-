import { StepAnalysis } from '../../shared/types';
import { Trophy, ChevronDown, ChevronUp, BrainCircuit } from 'lucide-react';
import { useState } from 'react';

interface AnalysisResultsProps {
  steps: StepAnalysis[];
  overallAnalysis: string;
}

export default function AnalysisResults({
  steps,
  overallAnalysis,
}: AnalysisResultsProps) {
  const [expandedSteps, setExpandedSteps] = useState<number[]>(
    steps.map((_, i) => i)
  );

  const toggleStep = (index: number) => {
    setExpandedSteps((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-wood-dark flex items-center gap-2 font-playfair">
          <Trophy className="w-6 h-6 text-gold-accent" />
          绝艺推荐解读
        </h3>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.step}
              className="bg-white rounded-xl border border-stone/20 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleStep(index)}
                className="w-full px-5 py-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-accent flex items-center justify-center text-wood-dark font-bold text-lg">
                    {step.step}
                  </div>
                  <div>
                    <p className="font-medium text-wood-dark">第 {step.step} 步</p>
                    <p className="text-sm text-stone">{step.position}</p>
                  </div>
                </div>
                {expandedSteps.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-stone" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-stone" />
                )}
              </button>

              {expandedSteps.includes(index) && (
                <div className="px-5 pb-4 pt-0 border-t border-stone/10">
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-wood-dark mb-1">
                        为什么这样下
                      </p>
                      <p className="text-stone leading-relaxed">{step.reason}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-wood-dark mb-1">
                        期望达成的效果
                      </p>
                      <p className="text-stone leading-relaxed">{step.expectation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-cream rounded-xl p-6 border border-gold-accent/20">
        <h3 className="text-lg font-semibold text-wood-dark mb-3 flex items-center gap-2 font-playfair">
          <BrainCircuit className="w-5 h-5 text-gold-accent" />
          全局局势分析
        </h3>
        <p className="text-stone leading-relaxed">{overallAnalysis}</p>
      </div>
    </div>
  );
}
