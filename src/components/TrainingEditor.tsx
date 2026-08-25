"use client";

import { useMemo, useState } from "react";
import { getDailyPracticeSet, type TrainingTask, type TrainingType } from "../domain/tasks";

type LibraryPreviewItem = {
  title: string;
  meta: string;
  badge: string;
};

type TrainingEditorProps = {
  title: string;
  prompt?: string;
  placeholder: string;
  submitLabel: string;
  practiceType?: TrainingType;
  libraryTitle?: string;
  libraryItems?: LibraryPreviewItem[];
};

function countEnglishWords(text: string) {
  const trimmed = text.trim();

  if (!trimmed) {
    return 0;
  }

  return trimmed.split(/\s+/).length;
}

export default function TrainingEditor({
  title,
  prompt,
  placeholder,
  submitLabel,
  practiceType,
  libraryTitle,
  libraryItems,
}: TrainingEditorProps) {
  const [answer, setAnswer] = useState("");
  const wordCount = useMemo(() => countEnglishWords(answer), [answer]);
  const isSubmitDisabled = answer.trim().length === 0;
  const dailyPractice = useMemo(
    () => (practiceType ? getDailyPracticeSet(new Date()) : null),
    [practiceType],
  );
  const activeTask: TrainingTask | null = dailyPractice
    ? practiceType === "writing"
      ? dailyPractice.writingTask
      : dailyPractice.translationTask
    : null;
  const displayedPrompt = activeTask?.prompt ?? prompt ?? "";
  const dayLabel = dailyPractice ? `第 ${dailyPractice.dayNumber} 天 / ${dailyPractice.cycleLength}` : null;

  return (
    <main className="training-editor" aria-labelledby="training-editor-title" suppressHydrationWarning>
      <section className="training-editor-panel">
        <div className="training-editor-header">
          <div>
            <p className="section-kicker">限时专项</p>
            <h2 id="training-editor-title">{title}</h2>
            {activeTask ? <p className="training-subtitle">{activeTask.title}</p> : null}
          </div>
          <div className="training-meta-stack">
            {dayLabel ? <p className="training-day-pill">{dayLabel}</p> : null}
            <p className="word-count" aria-live="polite">
              {wordCount} words
            </p>
          </div>
        </div>

        <p className="training-prompt">{displayedPrompt}</p>

        <textarea
          aria-label="答案输入区"
          className="answer-textarea"
          onChange={(event) => setAnswer(event.target.value)}
          placeholder={placeholder}
          value={answer}
        />

        <div className="editor-actions">
          <button className="secondary-button" type="button">
            保存草稿
          </button>
          <button className="primary-button" disabled={isSubmitDisabled} type="button">
            {submitLabel}
          </button>
        </div>
      </section>

      {libraryItems && libraryItems.length > 0 ? (
        <section className="task-card" aria-labelledby="task-library-title">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">题库预览</p>
              <h2 id="task-library-title">{libraryTitle ?? "题库预览"}</h2>
            </div>
          </div>

          <div className="task-list">
            {libraryItems.map((item) => (
              <div className="task-link" key={`${item.title}-${item.badge}`}>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.meta}</span>
                </div>
                <span>{item.badge}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
