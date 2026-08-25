"use client";

import Link from "next/link";
import { useMemo } from "react";
import { getDailyPracticeSet } from "../domain/tasks";

export default function TodayTaskList() {
  const dailyPlan = useMemo(() => getDailyPracticeSet(new Date()), []);

  const tasks = [
    {
      href: "/train/writing/",
      title: dailyPlan.writingTask.title,
      meta: `${dailyPlan.writingTask.examLevel} · ${dailyPlan.writingTask.timeLimitMinutes} 分钟 · 第 ${dailyPlan.dayNumber} 天`,
      action: "开始写作",
    },
    {
      href: "/train/translation/",
      title: dailyPlan.translationTask.title,
      meta: `${dailyPlan.translationTask.examLevel} · ${dailyPlan.translationTask.timeLimitMinutes} 分钟 · 第 ${dailyPlan.dayNumber} 天`,
      action: "开始翻译",
    },
    {
      href: "/handwriting/",
      title: "手写拍照复盘",
      meta: "5 分钟 · 卷面与字迹",
      action: "上传练习",
    },
  ];

  return (
    <section className="task-card" aria-labelledby="tasks-title" suppressHydrationWarning>
      <div className="section-heading-row">
        <div>
          <p className="section-kicker">训练安排</p>
          <h2 id="tasks-title">今日任务 · 第 {dailyPlan.dayNumber} 天 / {dailyPlan.cycleLength}</h2>
        </div>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <Link className="task-link" href={task.href} key={task.href}>
            <div>
              <strong>{task.title}</strong>
              <span>{task.meta}</span>
            </div>
            <span>{task.action}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
