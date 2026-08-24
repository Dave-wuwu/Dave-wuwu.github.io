import AppShell from "../../../components/AppShell";
import ScoreCard from "../../../components/ScoreCard";
import { generateMockReport } from "../../../domain/reports";

type ReportPageProps = {
  params: {
    id: string;
  };
};

const severityLabels = {
  low: "low",
  medium: "medium",
  high: "high",
};

export function generateStaticParams() {
  return [{ id: "mock-1" }];
}

export default function ReportPage({ params }: ReportPageProps) {
  const report = generateMockReport({
    id: params.id,
    examLevel: "CET-6",
    type: "writing",
    text: "AI tools is useful. Students can learn knowledge by it.",
  });

  return (
    <AppShell>
      <main className="report-page">
        <section className="report-hero" aria-labelledby="report-title">
          <div>
            <p className="section-kicker">作文批改</p>
            <h2 id="report-title">批改报告</h2>
            <p>{report.summary}</p>
          </div>
          <span className="report-meta">{report.examLevel} 写作</span>
        </section>

        <div className="report-grid">
          <ScoreCard score={report.score} />

          <section className="report-panel" aria-labelledby="issues-title">
            <div className="section-heading-row">
              <div>
                <p className="section-kicker">问题定位</p>
                <h2 id="issues-title">逐句建议</h2>
              </div>
            </div>

            <ul className="issue-list">
              {report.issues.map((issue) => (
                <li className="issue-item" key={`${issue.type}-${issue.original}`}>
                  <div className="issue-heading">
                    <strong>{issue.type}</strong>
                    <span className={`severity-badge severity-${issue.severity}`}>
                      {severityLabels[issue.severity]}
                    </span>
                  </div>
                  <dl className="issue-detail">
                    <div>
                      <dt>原句</dt>
                      <dd>{issue.original}</dd>
                    </div>
                    <div>
                      <dt>建议</dt>
                      <dd>{issue.suggestion}</dd>
                    </div>
                    <div>
                      <dt>说明</dt>
                      <dd>{issue.explanation}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="report-panel" aria-labelledby="rewrite-title">
          <div className="section-heading-row">
            <div>
              <p className="section-kicker">表达升级</p>
              <h2 id="rewrite-title">高分改写</h2>
            </div>
          </div>
          <p className="rewrite-text">{report.highScoreRewrite}</p>
        </section>
      </main>
    </AppShell>
  );
}
