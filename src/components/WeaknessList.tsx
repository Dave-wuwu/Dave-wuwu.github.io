import type { WeaknessSummary } from "../domain/weakness";

type WeaknessListProps = {
  summary: WeaknessSummary;
};

const levelLabels = {
  low: "轻微",
  medium: "关注",
  high: "优先",
};

export default function WeaknessList({ summary }: WeaknessListProps) {
  return (
    <section className="weakness-card" aria-labelledby="weakness-card-title">
      <div className="section-heading-row">
        <div>
          <p className="section-kicker">薄弱项</p>
          <h2 id="weakness-card-title">弱点标签</h2>
        </div>
      </div>

      <ul className="weakness-list">
        {summary.items.map((item) => (
          <li className="weakness-item" key={item.tag}>
            <div>
              <strong>{item.tag}</strong>
              <span>{item.count} 次</span>
            </div>
            <span className={`level-badge level-${item.level}`}>{levelLabels[item.level]}</span>
          </li>
        ))}
      </ul>

      <p className="recommendation">{summary.recommendation}</p>
    </section>
  );
}
