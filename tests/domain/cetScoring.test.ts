import { describe, expect, it } from "vitest";

import { calculateCetScore, getAbilityBand } from "../../src/domain/cetScoring";

describe("calculateCetScore", () => {
  it("calculates combined raw, simulated reported, and training scores", () => {
    expect(calculateCetScore({ writingRaw: 9, translationRaw: 8 })).toEqual({
      writingRaw: 9,
      translationRaw: 8,
      combinedRaw: 17,
      simulatedReportedScore: 120,
      trainingScore: 57,
      disclaimer: "模拟分按四六级写译权重估算，不等同于官方报道分。",
    });
  });

  it("rounds finite inputs and clamps raw scores to official-like 0-15 bands", () => {
    expect(calculateCetScore({ writingRaw: 18, translationRaw: -2 })).toEqual({
      writingRaw: 15,
      translationRaw: 0,
      combinedRaw: 15,
      simulatedReportedScore: 106,
      trainingScore: 50,
      disclaimer: "模拟分按四六级写译权重估算，不等同于官方报道分。",
    });
  });

  it("rounds fractional raw inputs before calculating scores", () => {
    expect(calculateCetScore({ writingRaw: 7.4, translationRaw: 7.5 })).toMatchObject({
      writingRaw: 7,
      translationRaw: 8,
      combinedRaw: 15,
      simulatedReportedScore: 106,
      trainingScore: 50,
    });
  });

  it("treats non-finite raw scores as zero", () => {
    expect(calculateCetScore({ writingRaw: Number.POSITIVE_INFINITY, translationRaw: Number.NaN })).toMatchObject({
      writingRaw: 0,
      translationRaw: 0,
      combinedRaw: 0,
      simulatedReportedScore: 0,
      trainingScore: 0,
    });
  });
});

describe("getAbilityBand", () => {
  it("maps training scores to ability bands", () => {
    expect(getAbilityBand(45)).toBe("基础薄弱");
    expect(getAbilityBand(60)).toBe("基本达标");
    expect(getAbilityBand(76)).toBe("稳定提升");
    expect(getAbilityBand(88)).toBe("高分冲刺");
  });

  it("uses the specified threshold boundaries", () => {
    expect(getAbilityBand(54)).toBe("基础薄弱");
    expect(getAbilityBand(55)).toBe("基本达标");
    expect(getAbilityBand(69)).toBe("基本达标");
    expect(getAbilityBand(70)).toBe("稳定提升");
    expect(getAbilityBand(84)).toBe("稳定提升");
    expect(getAbilityBand(85)).toBe("高分冲刺");
  });
});
