import { describe, expect, it } from "vitest";
import { getDailyPracticeSet, getTasksByType, seedTasks } from "../../src/domain/tasks";

describe("seed task library", () => {
  it("provides a small balanced pool for writing and translation", () => {
    const writingTasks = seedTasks.filter((task) => task.type === "writing");
    const translationTasks = seedTasks.filter((task) => task.type === "translation");

    expect(writingTasks).toHaveLength(6);
    expect(translationTasks).toHaveLength(6);
    expect(new Set(seedTasks.map((task) => task.examLevel))).toEqual(new Set(["CET-4", "CET-6"]));
  });

  it("groups tasks by type for the practice pages", () => {
    expect(getTasksByType("writing").map((task) => task.title)).toContain("Campus Clubs");
    expect(getTasksByType("translation").map((task) => task.title)).toContain("Smart Cities");
  });

  it("rotates the daily plan and wraps after 30 days", () => {
    const day1 = getDailyPracticeSet(new Date("2026-08-25T08:00:00Z"));
    const day2 = getDailyPracticeSet(new Date("2026-08-26T08:00:00Z"));
    const day31 = getDailyPracticeSet(new Date("2026-09-24T08:00:00Z"));

    expect(day1.dayNumber).toBe(1);
    expect(day1.writingTask.title).toBe("AI Tools in Study");
    expect(day1.translationTask.title).toBe("Traditional Festivals");
    expect(day2.writingTask.title).not.toBe(day1.writingTask.title);
    expect(day2.translationTask.title).not.toBe(day1.translationTask.title);
    expect(day31.writingTask.title).toBe(day1.writingTask.title);
    expect(day31.translationTask.title).toBe(day1.translationTask.title);
  });
});
