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
    id: "cet4-writing-campus-clubs",
    examLevel: "CET-4",
    type: "writing",
    title: "Campus Clubs",
    prompt: "Write an essay about how campus clubs help college students develop practical skills and friendship.",
    timeLimitMinutes: 30,
    targetWordRange: [120, 180],
    theme: "campus life",
  },
  {
    id: "cet4-writing-green-lifestyle",
    examLevel: "CET-4",
    type: "writing",
    title: "Green Lifestyle",
    prompt: "Write a short essay about what students can do to live a greener and more sustainable life on campus.",
    timeLimitMinutes: 30,
    targetWordRange: [120, 180],
    theme: "environment",
  },
  {
    id: "cet4-writing-time-management",
    examLevel: "CET-4",
    type: "writing",
    title: "Time Management",
    prompt: "Write an essay discussing why time management matters for college students and how they can improve it.",
    timeLimitMinutes: 30,
    targetWordRange: [120, 180],
    theme: "study skills",
  },
  {
    id: "cet6-writing-digital-reading",
    examLevel: "CET-6",
    type: "writing",
    title: "Digital Reading",
    prompt: "Write an essay about whether digital reading is changing the way young people learn and think.",
    timeLimitMinutes: 35,
    targetWordRange: [150, 200],
    theme: "digital reading",
  },
  {
    id: "cet6-writing-volunteering",
    examLevel: "CET-6",
    type: "writing",
    title: "Volunteering",
    prompt: "Write an essay on the value of volunteer service for college students and the wider community.",
    timeLimitMinutes: 35,
    targetWordRange: [150, 200],
    theme: "volunteering",
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
  {
    id: "cet4-translation-campus-life",
    examLevel: "CET-4",
    type: "translation",
    title: "Campus Life",
    prompt:
      "请将下面这段中文翻译成英文：大学校园生活丰富多彩，学生不仅要完成课堂学习，还要参加社团活动、体育锻炼和社会实践，从而不断提升综合能力。",
    timeLimitMinutes: 15,
    theme: "campus life",
  },
  {
    id: "cet4-translation-online-learning",
    examLevel: "CET-4",
    type: "translation",
    title: "Online Learning",
    prompt:
      "请将下面这段中文翻译成英文：在线学习为学生提供了灵活的学习方式，也让优质教育资源更容易被分享和获取，但学习者仍需要良好的自律能力。",
    timeLimitMinutes: 15,
    theme: "online learning",
  },
  {
    id: "cet4-translation-public-library",
    examLevel: "CET-4",
    type: "translation",
    title: "Public Library",
    prompt:
      "请将下面这段中文翻译成英文：公共图书馆不仅是阅读和借书的地方，也是社区居民交流信息、参加活动和提升文化素养的重要场所。",
    timeLimitMinutes: 15,
    theme: "public library",
  },
  {
    id: "cet6-translation-cultural-heritage",
    examLevel: "CET-6",
    type: "translation",
    title: "Cultural Heritage",
    prompt:
      "请将下面这段中文翻译成英文：文化遗产见证了一个国家的发展历程，也承载着民族记忆。保护文化遗产不仅有助于传承历史，也能增强人们对传统的认同感。",
    timeLimitMinutes: 20,
    theme: "cultural heritage",
  },
  {
    id: "cet6-translation-smart-cities",
    examLevel: "CET-6",
    type: "translation",
    title: "Smart Cities",
    prompt:
      "请将下面这段中文翻译成英文：随着科技的发展，智慧城市建设不断推进。越来越多的城市利用数字技术改善交通、医疗和公共服务，让居民生活更加高效便捷。",
    timeLimitMinutes: 20,
    theme: "smart cities",
  },
];

export function getTasksByType(type: TrainingType) {
  return seedTasks.filter((task) => task.type === type);
}
