import AppShell from "../components/AppShell";
import ScoreCard from "../components/ScoreCard";
import WeaknessList from "../components/WeaknessList";
import { calculateCetScore } from "../domain/cetScoring";
import { summarizeWeaknesses } from "../domain/weakness";

const score = calculateCetScore({ writingRaw: 9, translationRaw: 8 });
const weaknessSummary = summarizeWeaknesses([
  ["句式单一", "逻辑衔接", "词汇准确"],
  ["句式单一", "中式表达"],
  ["逻辑衔接", "细节展开"],
]);

const tasks = [
  {
    href: "/train/writing",
    title: "写作限时训练",
    meta: "30 分钟 · 议论文框架",
    action: "开始写作",
  },
  {
    href: "/train/translation",
    title: "翻译句群训练",
    meta: "15 分钟 · 汉译英表达",
    action: "开始翻译",
  },
  {
    href: "/handwriting",
    title: "手写拍照复盘",
    meta: "5 分钟 · 卷面与字迹",
    action: "上传练习",
  },
];

export default function HomePage() {
  return (
    <AppShell>
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

        <section className="task-card" aria-labelledby="tasks-title">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">训练安排</p>
              <h2 id="tasks-title">今日任务</h2>
            </div>
          </div>

          <div className="task-list">
            {tasks.map((task) => (
              <a className="task-link" href={task.href} key={task.href}>
                <div>
                  <strong>{task.title}</strong>
                  <span>{task.meta}</span>
                </div>
                <span>{task.action}</span>
              </a>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
