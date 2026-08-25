"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";

type TrainingEditorProps = {
  title: string;
  prompt: string;
  placeholder: string;
  submitLabel: string;
  children?: ReactNode;
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
  children,
}: TrainingEditorProps) {
  const [answer, setAnswer] = useState("");
  const wordCount = useMemo(() => countEnglishWords(answer), [answer]);
  const isSubmitDisabled = answer.trim().length === 0;

  return (
    <main className="training-editor" aria-labelledby="training-editor-title">
      <section className="training-editor-panel">
        <div className="training-editor-header">
          <div>
            <p className="section-kicker">限时专项</p>
            <h2 id="training-editor-title">{title}</h2>
          </div>
          <p className="word-count" aria-live="polite">
            {wordCount} words
          </p>
        </div>

        <p className="training-prompt">{prompt}</p>

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
      {children}
    </main>
  );
}
