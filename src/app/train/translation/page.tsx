import AppShell from "../../../components/AppShell";
import TrainingEditor from "../../../components/TrainingEditor";
import { getTasksByType } from "../../../domain/tasks";

const translationTasks = getTasksByType("translation");

export default function TranslationTrainingPage() {
  return (
    <AppShell>
      <TrainingEditor
        title="翻译训练"
        placeholder="输入你的英文翻译..."
        submitLabel="提交批改"
        practiceType="translation"
        libraryTitle="翻译题库"
        libraryItems={translationTasks.map((task, index) => ({
          title: `${index + 1}. ${task.title}`,
          meta: `${task.examLevel} · ${task.timeLimitMinutes} 分钟 · ${task.theme}`,
          badge: index === 0 ? "当前题" : "备用题",
        }))}
      />
    </AppShell>
  );
}
