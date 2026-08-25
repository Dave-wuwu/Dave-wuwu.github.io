import AppShell from "../components/AppShell";
import ScoreCard from "../components/ScoreCard";
import TodayTaskList from "../components/TodayTaskList";
import WeaknessList from "../components/WeaknessList";
import { calculateCetScore } from "../domain/cetScoring";
import { summarizeWeaknesses } from "../domain/weakness";

const score = calculateCetScore({ writingRaw: 9, translationRaw: 8 });
const weaknessSummary = summarizeWeaknesses([
  ["句式单一", "逻辑衔接", "词汇准确"],
  ["句式单一", "中式表达"],
  ["逻辑衔接", "细节展开"],
]);

export default function HomePage() {
  return (
    <AppShell activePath="/">
      <main className="dashboard">
        <section className="dashboard-hero" aria-labelledby="dashboard-title">
          <div>
            <p className="section-kicker">今日状态</p>
            <h2 id="dashboard-title">离目标更近一点</h2>
            <p>
              先完成一组写译短练，再根据弱点标签复盘表达问题。今天的重点是把句式和衔接练稳。
            </p>
          </div>
          <div className="streak-panel" aria-label="连续训练">
            <span>连续</span>
            <strong>4 天</strong>
          </div>
        </section>

        <div className="dashboard-grid">
          <ScoreCard score={score} />
          <WeaknessList summary={weaknessSummary} />
        </div>

        <TodayTaskList />
      </main>
    </AppShell>
  );
}
