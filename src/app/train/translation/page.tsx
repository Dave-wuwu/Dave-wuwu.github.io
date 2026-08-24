import AppShell from "../../../components/AppShell";
import TrainingEditor from "../../../components/TrainingEditor";
import { seedTasks } from "../../../domain/tasks";

const translationTask = seedTasks.find((task) => task.type === "translation");

export default function TranslationTrainingPage() {
  return (
    <AppShell>
      <TrainingEditor
        title="翻译训练"
        prompt={translationTask?.prompt ?? ""}
        placeholder="输入你的英文翻译..."
        submitLabel="提交批改"
      />
    </AppShell>
  );
}
