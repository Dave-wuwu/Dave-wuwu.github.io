"use client";

import { useState } from "react";
import AppShell from "../../components/AppShell";

const mockOcrText =
  "AI tools are useful for college students, but they should not replace independent thinking.";

export default function HandwritingPage() {
  const [reviewText, setReviewText] = useState("");
  const isSubmitDisabled = reviewText.trim().length === 0;

  return (
    <AppShell>
      <main className="handwriting-page" aria-labelledby="handwriting-title">
        <section className="handwriting-panel">
          <div className="handwriting-header">
            <div>
              <p className="section-kicker">纸笔复盘</p>
              <h2 id="handwriting-title">手写上传</h2>
              <p className="handwriting-helper">
                拍照上传纸笔答案，先校对 OCR 文本，再提交批改。
              </p>
            </div>
          </div>

          <div className="upload-panel">
            <label className="upload-label">
              <span>手写照片</span>
              <input aria-label="上传手写照片" accept="image/*" type="file" />
            </label>
            <button
              className="secondary-button"
              onClick={() => setReviewText(mockOcrText)}
              type="button"
            >
              模拟 OCR 识别
            </button>
          </div>

          <div className="ocr-review-field">
            <label htmlFor="ocr-review">校对识别文本</label>
            <textarea
              className="answer-textarea"
              id="ocr-review"
              onChange={(event) => setReviewText(event.target.value)}
              placeholder="OCR 识别结果会出现在这里..."
              value={reviewText}
            />
          </div>

          <div className="editor-actions">
            <button className="primary-button" disabled={isSubmitDisabled} type="button">
              提交批改
            </button>
          </div>
        </section>
      </main>
    </AppShell>
  );
}
