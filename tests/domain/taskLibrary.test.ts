import { describe, expect, it } from "vitest";
import { seedTasks } from "../../src/domain/tasks";

describe("seed task library", () => {
  it("provides a small balanced pool for writing and translation", () => {
    const writingTasks = seedTasks.filter((task) => task.type === "writing");
    const translationTasks = seedTasks.filter((task) => task.type === "translation");

    expect(writingTasks).toHaveLength(6);
    expect(translationTasks).toHaveLength(6);
    expect(new Set(seedTasks.map((task) => task.examLevel))).toEqual(new Set(["CET-4", "CET-6"]));
  });
});
