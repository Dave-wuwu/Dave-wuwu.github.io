import { AbilityBand, calculateCetScore, CetScore, getAbilityBand } from "./cetScoring";
import { ExamLevel, TrainingType } from "./tasks";

export type CorrectionIssue = {
  type: string;
  severity: "low" | "medium" | "high";
  original: string;
  suggestion: string;
  explanation: string;
};

export type DimensionScore = {
  name: string;
  score: number;
  maxScore: number;
  comment: string;
};

export type CorrectionReport = {
  id: string;
  examLevel: ExamLevel;
  type: TrainingType;
  score: CetScore;
  abilityBand: AbilityBand;
  dimensions: DimensionScore[];
  summary: string;
  issues: CorrectionIssue[];
  upgradedExpression: string;
  highScoreRewrite: string;
  weaknessTags: string[];
  nextRecommendation: string;
};

type GenerateMockReportInput = {
  id: string;
  examLevel: ExamLevel;
  type: TrainingType;
  text: string;
};

const DIMENSION_NAMES = ["内容切题", "结构连贯", "语言准确", "表达多样", "任务完成"];

export function generateMockReport(input: GenerateMockReportInput): CorrectionReport {
  const rawScore = estimateRawScore(input.text);
  const score = calculateCetScore({
    writingRaw: input.type === "writing" ? rawScore : 0,
    translationRaw: input.type === "translation" ? rawScore : 0,
  });

  const issues = input.type === "writing" ? writingIssues(input.text) : translationIssues(input.text);

  return {
    id: input.id,
    examLevel: input.examLevel,
    type: input.type,
    score,
    abilityBand: getAbilityBand(score.trainingScore),
    dimensions: buildDimensions(rawScore),
    summary:
      input.type === "writing"
        ? "文章能回应题目，但语法准确性和英文搭配仍需加强。"
        : "译文传达了主要信息，但文化类表达和名词搭配可以更自然。",
    issues,
    upgradedExpression:
      input.type === "writing"
        ? "AI tools can support students when they are used as learning aids rather than shortcuts."
        : "Traditional Chinese festivals preserve historical memory and cultural values.",
    highScoreRewrite:
      input.type === "writing"
        ? "AI tools are useful learning assistants. With proper guidance, students can broaden their knowledge and improve efficiency while still thinking independently."
        : "Chinese traditional festivals carry rich historical memories and cultural meaning, bringing families together and passing shared values from one generation to the next.",
    weaknessTags:
      input.type === "writing" ? ["主谓一致", "中式表达", "搭配不自然"] : ["文化类表达", "名词搭配", "信息完整度"],
    nextRecommendation:
      input.type === "writing"
        ? "下一步建议集中练习主谓一致和常见学习类话题表达。"
        : "下一步建议进行文化类翻译主题训练，积累节日、历史与价值观相关表达。",
  };
}

function estimateRawScore(text: string): number {
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const lengthScore = Math.min(6, Math.max(2, Math.round(wordCount / 4)));
  const sentenceScore = /[.!?。！？]/.test(text) ? 2 : 1;
  const accuracyPenalty = /\btools is\b|\bstudents is\b|\blearn knowledge\b|\bby it\b|\bhistory culture\b/i.test(text)
    ? 2
    : 0;

  return Math.max(3, Math.min(12, lengthScore + sentenceScore + 4 - accuracyPenalty));
}

function buildDimensions(rawScore: number): DimensionScore[] {
  return DIMENSION_NAMES.map((name, index) => {
    const score = Math.max(1, Math.min(3, Math.round(rawScore / 5) + (index === 2 ? -1 : 0)));

    return {
      name,
      score,
      maxScore: 3,
      comment: score >= 3 ? "表现较稳，可以继续提升表达质量。" : "基础信息清楚，但需要补强准确性。",
    };
  });
}

function writingIssues(text: string): CorrectionIssue[] {
  const hasAgreementIssue = /\btools is\b/i.test(text);
  const hasChinglishIssue = /\blearn knowledge\b|\bby it\b/i.test(text);
  const issues: CorrectionIssue[] = [];

  if (hasAgreementIssue) {
    issues.push({
      type: "主谓一致",
      severity: "high",
      original: excerptAround(text, /\btools is\b/i),
      suggestion: "AI tools are useful",
      explanation: "复数主语 tools 需要搭配 are。",
    });
  }

  if (hasChinglishIssue) {
    issues.push({
      type: "中式表达",
      severity: "medium",
      original: excerptAround(text, /\blearn knowledge(?:\s+by it)?\b|\bby it\b/i),
      suggestion: "gain knowledge with their help",
      explanation: "英文中通常使用 gain/acquire knowledge，并避免 by it 这类直译结构。",
    });
  }

  if (issues.length === 0) {
    issues.push({
      type: "综合建议",
      severity: "low",
      original: fallbackExcerpt(text),
      suggestion: "Use complete and natural English sentences.",
      explanation: "当前文本未命中内置问题模式，可继续提升表达的准确性和自然度。",
    });
  }

  return issues;
}

function translationIssues(text: string): CorrectionIssue[] {
  if (/\bhistory culture\b/i.test(text)) {
    return [
      {
        type: "名词搭配",
        severity: "high",
        original: excerptAround(text, /\bhistory culture\b/i),
        suggestion: "historical and cultural meaning",
        explanation: "文化类翻译中需要区分形容词修饰和并列概念。",
      },
      {
        type: "信息完整度",
        severity: "medium",
        original: fallbackExcerpt(text),
        suggestion: "Add the implied ideas of inheritance, reunion, or shared values where appropriate.",
        explanation: "传统节日类材料常包含传承、团圆和价值观等隐含信息。",
      },
    ];
  }

  return [
    {
      type: "综合建议",
      severity: "low",
      original: fallbackExcerpt(text),
      suggestion: "Add the implied ideas of inheritance, reunion, or shared values where appropriate.",
      explanation: "当前译文未命中内置搭配问题模式，可继续补充节日、传承和团圆相关信息。",
    },
  ];
}

function excerptAround(text: string, pattern: RegExp): string {
  const match = text.match(pattern);

  if (!match?.[0]) {
    return fallbackExcerpt(text);
  }

  return match[0];
}

function fallbackExcerpt(text: string): string {
  const trimmed = text.trim();

  if (!trimmed) {
    return "";
  }

  return trimmed.length > 120 ? `${trimmed.slice(0, 120)}...` : trimmed;
}
