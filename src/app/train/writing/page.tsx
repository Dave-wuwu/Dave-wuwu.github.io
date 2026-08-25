import AppShell from "../../../components/AppShell";
import TrainingEditor from "../../../components/TrainingEditor";
import { getTasksByType } from "../../../domain/tasks";

const writingTasks = getTasksByType("writing");

export default function WritingTrainingPage() {
  return (
    <AppShell activePath="/train/writing/">
      <TrainingEditor
        title="写作训练"
        placeholder="输入你的作文..."
        submitLabel="提交批改"
        practiceType="writing"
        libraryTitle="写作题库"
        libraryItems={writingTasks.map((task, index) => ({
          title: `${index + 1}. ${task.title}`,
          meta: `${task.examLevel} · ${task.timeLimitMinutes} 分钟 · ${task.theme}`,
          badge: index === 0 ? "当前题" : "备用题",
        }))}
      />
    </AppShell>
  );
}
