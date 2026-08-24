export type WeaknessSummaryItem = {
  tag: string;
  count: number;
  level: "low" | "medium" | "high";
};

export type WeaknessSummary = {
  items: WeaknessSummaryItem[];
  recommendation: string;
};

const FALLBACK_TAG = "基础表达";

function levelForCount(count: number): WeaknessSummaryItem["level"] {
  return count >= 2 ? "high" : "medium";
}

export function summarizeWeaknesses(tagGroups: string[][]): WeaknessSummary {
  const counts = new Map<string, number>();

  for (const group of tagGroups) {
    for (const tag of group) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  const items = Array.from(counts.entries())
    .map(([tag, count]) => ({
      tag,
      count,
      level: levelForCount(count),
    }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "zh-CN"));

  const topTag = items[0]?.tag ?? FALLBACK_TAG;

  return {
    items,
    recommendation: `优先训练：${topTag}。建议做 5 句改写，再完成 1 次限时训练。`,
  };
}
