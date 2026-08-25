import AppShell from "../../../components/AppShell";
import TrainingEditor from "../../../components/TrainingEditor";
import { getTasksByType } from "../../../domain/tasks";

const translationTasks = getTasksByType("translation");
const translationTask = translationTasks[0];

export default function TranslationTrainingPage() {
  return (
    <AppShell>
      <TrainingEditor
        title="翻译训练"
        prompt={translationTask?.prompt ?? ""}
        placeholder="输入你的英文翻译..."
        submitLabel="提交批改"
      >
        <section className="task-card" aria-labelledby="translation-library-title">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">题库预览</p>
              <h2 id="translation-library-title">翻译题库 · {translationTasks.length} 题</h2>
            </div>
          </div>

          <div className="task-list">
            {translationTasks.map((task, index) => (
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
