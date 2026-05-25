export interface StepAnalysis {
  step: number;
  position: string;
  reason: string;
  expectation: string;
}

export interface AnalyzeRequest {
  image: string;
}

export interface AnalyzeResponse {
  success: boolean;
  steps: StepAnalysis[];
  overallAnalysis: string;
  error?: string;
  usingMockData?: boolean;
}
