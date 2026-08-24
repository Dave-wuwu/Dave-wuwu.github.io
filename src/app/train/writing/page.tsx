import AppShell from "../../../components/AppShell";
import TrainingEditor from "../../../components/TrainingEditor";
import { seedTasks } from "../../../domain/tasks";

const writingTask = seedTasks.find((task) => task.type === "writing");

export default function WritingTrainingPage() {
  return (
    <AppShell>
      <TrainingEditor
        title="写作训练"
        prompt={writingTask?.prompt ?? ""}
        placeholder="输入你的作文..."
        submitLabel="提交批改"
      />
    </AppShell>
  );
}
