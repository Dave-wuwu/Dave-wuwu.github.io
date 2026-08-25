import type { ReactNode } from "react";
import Link from "next/link";
import { BarChart3, Home, NotebookPen, PenTool } from "lucide-react";

type AppShellProps = {
  children: ReactNode;
};

const navItems = [
  { href: "/", label: "首页", icon: Home },
  { href: "/train/writing/", label: "训练", icon: PenTool },
  { href: "/handwriting/", label: "手写", icon: NotebookPen },
  { href: "/weakness/", label: "弱点", icon: BarChart3 },
];

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-kicker">写作与翻译专项强化</p>
          <h1>CET 写译训练营</h1>
        </div>
        <div className="target-pill" aria-label="用户目标">
          CET-6 目标 520
        </div>
      </header>

      <div className="app-content">{children}</div>

      <nav className="bottom-nav" aria-label="主导航">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link className="bottom-nav-link" href={item.href} key={item.href}>
              <Icon aria-hidden="true" size={21} strokeWidth={2.2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
