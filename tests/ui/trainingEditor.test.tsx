import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import TranslationTrainingPage from "../../src/app/train/translation/page";
import WritingTrainingPage from "../../src/app/train/writing/page";
import TrainingEditor from "../../src/components/TrainingEditor";
import { seedTasks } from "../../src/domain/tasks";

describe("TrainingEditor", () => {
  it("counts English words and enables submit after text input", async () => {
    const user = userEvent.setup();

    render(
      <TrainingEditor
        title="写作训练"
        prompt="Write about responsible AI use."
        placeholder="输入你的作文..."
        submitLabel="提交批改"
      />,
    );

    const textarea = screen.getByLabelText("答案输入区");
    const submitButton = screen.getByRole("button", { name: "提交批改" });

    expect(screen.getByText("写作训练")).toBeInTheDocument();
    expect(screen.getByText("Write about responsible AI use.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "保存草稿" })).toBeInTheDocument();
    expect(screen.getByText("0 words")).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    await user.type(textarea, "AI tools are useful for learning.");

    expect(screen.getByText("6 words")).toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });

  it("renders the writing training page with the seeded writing prompt", () => {
    const html = renderToStaticMarkup(<WritingTrainingPage />);
    const writingPrompt = seedTasks.find((task) => task.type === "writing")?.prompt ?? "";

    expect(html).toContain("写作训练");
    expect(html).toContain(writingPrompt);
    expect(html).toContain("输入你的作文...");
    expect(html).toContain("提交批改");
  });

  it("renders the translation training page with the seeded translation prompt", () => {
    const html = renderToStaticMarkup(<TranslationTrainingPage />);
    const translationPrompt =
      seedTasks.find((task) => task.type === "translation")?.prompt ?? "";

    expect(html).toContain("翻译训练");
    expect(html).toContain(translationPrompt);
    expect(html).toContain("输入你的英文翻译...");
    expect(html).toContain("提交批改");
  });
});
