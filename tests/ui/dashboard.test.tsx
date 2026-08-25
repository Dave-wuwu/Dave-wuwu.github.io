import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import HomePage from "../../src/app/page";
import AppShell from "../../src/components/AppShell";
import ScoreCard from "../../src/components/ScoreCard";
import WeaknessList from "../../src/components/WeaknessList";
import { calculateCetScore } from "../../src/domain/cetScoring";
import { summarizeWeaknesses } from "../../src/domain/weakness";

describe("dashboard UI", () => {
  it("renders the app shell title, target, and navigation links", () => {
    const html = renderToStaticMarkup(
      <AppShell activePath="/train/writing/">
        <main>内容</main>
      </AppShell>,
    );

    expect(html).toContain("CET 写译训练营");
    expect(html).toContain("写作与翻译专项强化");
    expect(html).toContain("CET-6 目标 520");
    expect(html).toContain("首页");
    expect(html).toContain("训练");
    expect(html).toContain("手写");
    expect(html).toContain("弱点");
    expect(html).toContain("bottom-nav-link is-active");
    expect(html).toContain('aria-current="page"');
  });

  it("renders score and weakness summaries from domain data", () => {
    const score = calculateCetScore({ writingRaw: 9, translationRaw: 8 });
    const weaknesses = summarizeWeaknesses([
      ["句式单一", "词汇准确"],
      ["句式单一", "逻辑衔接"],
    ]);

    const html = renderToStaticMarkup(
      <>
        <ScoreCard score={score} />
        <WeaknessList summary={weaknesses} />
      </>,
    );

    expect(html).toContain("训练评分");
    expect(html).toContain("57");
    expect(html).toContain("/100");
    expect(html).toContain("基本达标");
    expect(html).toContain("写译模拟分");
    expect(html).toContain("120");
    expect(html).toContain("/212");
    expect(html).toContain(score.disclaimer);
    expect(html).toContain("句式单一");
    expect(html).toContain("2 次");
    expect(html).toContain("优先训练：句式单一");
  });

  it("renders the home dashboard with today's tasks and training links", () => {
    const html = renderToStaticMarkup(<HomePage />);

    expect(html).toContain("今日任务");
    expect(html).toContain("/train/writing");
    expect(html).toContain("/train/translation");
    expect(html).toContain("/handwriting");
  });
});
