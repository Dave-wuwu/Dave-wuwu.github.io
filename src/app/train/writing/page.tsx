import AppShell from "../../../components/AppShell";
import TrainingEditor from "../../../components/TrainingEditor";
import { getTasksByType } from "../../../domain/tasks";

const writingTasks = getTasksByType("writing");
const writingTask = writingTasks[0];

export default function WritingTrainingPage() {
  return (
    <AppShell>
      <TrainingEditor
        title="写作训练"
        prompt={writingTask?.prompt ?? ""}
        placeholder="输入你的作文..."
        submitLabel="提交批改"
      >
        <section className="task-card" aria-labelledby="writing-library-title">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">题库预览</p>
              <h2 id="writing-library-title">写作题库 · {writingTasks.length} 题</h2>
            </div>
          </div>

          <div className="task-list">
            {writingTasks.map((task, index) => (
              <div className="task-link" key={task.id}>
                <div>
                  <strong>
                    {index + 1}. {task.title}
                  </strong>
                  <span>
                    {task.examLevel} · {task.timeLimitMinutes} 分钟 · {task.theme}
                  </span>
                </div>
                <span>{index === 0 ? "当前题" : "备用题"}</span>
              </div>
            ))}
          </div>
        </section>
      </TrainingEditor>
    </AppShell>
  );
}
