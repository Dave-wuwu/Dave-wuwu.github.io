export type ExamLevel = "CET-4" | "CET-6";

export type TrainingType = "writing" | "translation";

export type TrainingTask = {
  id: string;
  examLevel: ExamLevel;
  type: TrainingType;
  title: string;
  prompt: string;
  timeLimitMinutes: number;
  targetWordRange?: [number, number];
  theme: string;
};

export const seedTasks: TrainingTask[] = [
  {
    id: "cet4-writing-ai-tools",
    examLevel: "CET-4",
    type: "writing",
    title: "AI Tools in Study",
    prompt: "Write a short essay about how college students can use AI tools responsibly in their studies.",
    timeLimitMinutes: 30,
    targetWordRange: [120, 180],
    theme: "AI tools",
  },
  {
    id: "cet6-translation-traditional-festivals",
    examLevel: "CET-6",
    type: "translation",
    title: "Traditional Festivals",
    prompt:
      "请将下面这段中文翻译成英文：中国传统节日不仅承载着丰富的历史文化，也为现代社会提供了重要的情感纽带。每逢节日，家人们常常团聚在一起，表达对美好生活的祝愿。",
    timeLimitMinutes: 15,
    theme: "traditional festivals",
  },
];
