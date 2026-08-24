import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import HandwritingPage from "../../src/app/handwriting/page";

const mockOcrText =
  "AI tools are useful for college students, but they should not replace independent thinking.";

describe("HandwritingPage", () => {
  it("lets students upload, review mock OCR text, and submit only when text exists", async () => {
    const user = userEvent.setup();

    render(<HandwritingPage />);

    const fileInput = screen.getByLabelText("上传手写照片");
    const textarea = screen.getByLabelText("校对识别文本");
    const submitButton = screen.getByRole("button", { name: "提交批改" });

    expect(screen.getByRole("heading", { name: "手写上传" })).toBeInTheDocument();
    expect(
      screen.getByText("拍照上传纸笔答案，先校对 OCR 文本，再提交批改。"),
    ).toBeInTheDocument();
    expect(fileInput).toHaveAttribute("type", "file");
    expect(fileInput).toHaveAttribute("accept", "image/*");
    expect(textarea).toHaveAttribute("id", "ocr-review");
    expect(textarea).toHaveAttribute("placeholder", "OCR 识别结果会出现在这里...");
    expect(submitButton).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "模拟 OCR 识别" }));

    expect(textarea).toHaveValue(mockOcrText);
    expect(submitButton).toBeEnabled();

    await user.clear(textarea);

    expect(submitButton).toBeDisabled();

    await user.type(textarea, "Reviewed sentence.");

    expect(submitButton).toBeEnabled();
  });
});
