import { describe, expect, it } from "vitest";

import { summarizeWeaknesses } from "../../src/domain/weakness";

describe("summarizeWeaknesses", () => {
  it("counts repeated weakness tags and recommends the top priority", () => {
    const summary = summarizeWeaknesses([["中式表达", "句式单一"], ["中式表达", "漏译"], ["主谓一致"]]);

    expect(summary.items[0]).toEqual({ tag: "中式表达", count: 2, level: "high" });
    expect(summary.recommendation).toBe("优先训练：中式表达。建议做 5 句改写，再完成 1 次限时训练。");
  });
});
