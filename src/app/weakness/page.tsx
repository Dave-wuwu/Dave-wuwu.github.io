import AppShell from "../../components/AppShell";
import WeaknessList from "../../components/WeaknessList";
import { summarizeWeaknesses } from "../../domain/weakness";

const weaknessSummary = summarizeWeaknesses([
  ["中式表达", "句式单一", "主谓一致"],
  ["中式表达", "漏译"],
  ["文化词处理", "句式单一"],
]);

export default function WeaknessPage() {
  return (
    <AppShell activePath="/weakness/">
      <main className="weakness-page">
        <section className="weakness-hero" aria-labelledby="weakness-title">
          <div>
            <p className="section-kicker">复盘路径</p>
            <h2 id="weakness-title">下一步训练</h2>
            <p>{weaknessSummary.recommendation}</p>
          </div>
        </section>

        <WeaknessList summary={weaknessSummary} />

        <section className="training-next-panel" aria-label="下一步训练安排">
          <p>先做 5 句中式表达改写，再完成 1 篇 30 分钟限时作文。</p>
        </section>
      </main>
    </AppShell>
  );
}
