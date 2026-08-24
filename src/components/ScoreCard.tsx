import type { CetScore } from "../domain/cetScoring";
import { getAbilityBand } from "../domain/cetScoring";

type ScoreCardProps = {
  score: CetScore;
};

export default function ScoreCard({ score }: ScoreCardProps) {
  const abilityBand = getAbilityBand(score.trainingScore);

  return (
    <section className="score-card" aria-labelledby="score-card-title">
      <div className="section-heading-row">
        <div>
          <p className="section-kicker">本次估分</p>
          <h2 id="score-card-title">训练评分</h2>
        </div>
        <span className="ability-band">{abilityBand}</span>
      </div>

      <div className="score-main">
        <span className="score-number">{score.trainingScore}</span>
        <span className="score-denominator">/100</span>
      </div>

      <div className="score-grid">
        <div>
          <span className="metric-label">写作原始分</span>
          <strong>{score.writingRaw}/15</strong>
        </div>
        <div>
          <span className="metric-label">翻译原始分</span>
          <strong>{score.translationRaw}/15</strong>
        </div>
        <div>
          <span className="metric-label">写译模拟分</span>
          <strong>{score.simulatedReportedScore}/212</strong>
        </div>
      </div>

      <p className="score-disclaimer">{score.disclaimer}</p>
    </section>
  );
}
