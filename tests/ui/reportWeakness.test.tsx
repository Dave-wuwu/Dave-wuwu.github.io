import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ReportPage from "../../src/app/report/[id]/page";
import WeaknessPage from "../../src/app/weakness/page";

describe("report and weakness pages", () => {
  it("renders the mock writing correction report", () => {
    const html = renderToStaticMarkup(<ReportPage params={{ id: "mock-1" }} />);

    expect(html).toContain("批改报告");
    expect(html).toContain("文章能回应题目");
    expect(html).toContain("主谓一致");
    expect(html).toContain("high");
    expect(html).toContain("AI tools are useful");
    expect(html).toContain("高分改写");
  });

  it("renders the next-step weakness training page", () => {
    const html = renderToStaticMarkup(<WeaknessPage />);

    expect(html).toContain("下一步训练");
    expect(html).toContain("中式表达");
    expect(html).toContain("句式单一");
    expect(html).toContain("漏译");
    expect(html).toContain("主谓一致");
    expect(html).toContain("文化词处理");
    expect(html).toContain("先做 5 句中式表达改写，再完成 1 篇 30 分钟限时作文。");
  });
});
