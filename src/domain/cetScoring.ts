export type CetScoreInput = {
  writingRaw: number;
  translationRaw: number;
};

export type CetScore = {
  writingRaw: number;
  translationRaw: number;
  combinedRaw: number;
  simulatedReportedScore: number;
  trainingScore: number;
  disclaimer: string;
};

export type AbilityBand = "基础薄弱" | "基本达标" | "稳定提升" | "高分冲刺";

const MAX_RAW_SCORE = 15;
const MAX_COMBINED_RAW_SCORE = 30;
const MAX_SIMULATED_REPORTED_SCORE = 212;
const DISCLAIMER = "模拟分按四六级写译权重估算，不等同于官方报道分。";

export function calculateCetScore(input: CetScoreInput): CetScore {
  const writingRaw = normalizeRawScore(input.writingRaw);
  const translationRaw = normalizeRawScore(input.translationRaw);
  const combinedRaw = writingRaw + translationRaw;

  return {
    writingRaw,
    translationRaw,
    combinedRaw,
    simulatedReportedScore: Math.round((combinedRaw / MAX_COMBINED_RAW_SCORE) * MAX_SIMULATED_REPORTED_SCORE),
    trainingScore: Math.round((combinedRaw / MAX_COMBINED_RAW_SCORE) * 100),
    disclaimer: DISCLAIMER,
  };
}

export function getAbilityBand(trainingScore: number): AbilityBand {
  if (trainingScore >= 85) {
    return "高分冲刺";
  }

  if (trainingScore >= 70) {
    return "稳定提升";
  }

  if (trainingScore >= 55) {
    return "基本达标";
  }

  return "基础薄弱";
}

function normalizeRawScore(rawScore: number): number {
  if (!Number.isFinite(rawScore)) {
    return 0;
  }

  return Math.min(MAX_RAW_SCORE, Math.max(0, Math.round(rawScore)));
}
