import { describe, expect, it } from "vitest";

import { generateMockReport } from "../../src/domain/reports";
import { seedTasks } from "../../src/domain/tasks";

describe("seedTasks", () => {
  it("provides a concrete CET translation prompt with a 15 minute time limit", () => {
    const task = seedTasks.find((item) => item.id === "cet6-translation-traditional-festivals");

    expect(task).toMatchObject({
      type: "translation",
      timeLimitMinutes: 15,
    });
    expect(task?.prompt).toContain("中国传统节日");
  });
});

describe("generateMockReport", () => {
  it("returns a writing report with grammar issues and weakness tags", () => {
    const report = generateMockReport({
      id: "sub-1",
      examLevel: "CET-6",
      type: "writing",
      text: "AI tools is useful. Students can learn knowledge by it.",
    });

    expect(report.score.simulatedReportedScore).toBeGreaterThan(0);
    expect(report.issues[0]).toMatchObject({
      type: "主谓一致",
      severity: "high",
    });
    expect(report.issues[1]).toMatchObject({
      type: "中式表达",
      original: "learn knowledge by it",
    });
    expect(report.weaknessTags).toContain("中式表达");
  });

  it("does not fabricate writing issue spans that are not in the submitted text", () => {
    const text = "AI tools are useful. Students can acquire knowledge with them.";
    const report = generateMockReport({
      id: "sub-3",
      examLevel: "CET-4",
      type: "writing",
      text,
    });

    expect(report.issues).toHaveLength(1);
    expect(report.issues[0].type).toBe("综合建议");
    expect(text).toContain(report.issues[0].original);
    expect(report.issues.some((issue) => issue.type === "主谓一致")).toBe(false);
    expect(report.issues.some((issue) => issue.type === "中式表达")).toBe(false);
  });

  it("returns a translation report with dimensions and culture recommendation", () => {
    const report = generateMockReport({
      id: "sub-2",
      examLevel: "CET-4",
      type: "translation",
      text: "Chinese traditional festivals carry history culture.",
    });

    expect(report.score.trainingScore).toBeGreaterThanOrEqual(0);
    expect(report.dimensions).toHaveLength(5);
    expect(report.issues[0]).toMatchObject({
      type: "名词搭配",
      original: "history culture",
    });
    expect(report.nextRecommendation).toContain("文化类");
  });

  it("does not fabricate translation issue spans that are not in the submitted text", () => {
    const text = "Traditional Chinese festivals carry historical and cultural meaning.";
    const report = generateMockReport({
      id: "sub-4",
      examLevel: "CET-6",
      type: "translation",
      text,
    });

    expect(report.issues).toHaveLength(1);
    expect(report.issues[0].type).toBe("综合建议");
    expect(text).toContain(report.issues[0].original);
    expect(report.issues.some((issue) => issue.type === "名词搭配")).toBe(false);
  });
});
