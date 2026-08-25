import type { ReactNode } from "react";
import Link from "next/link";
import { BarChart3, Home, NotebookPen, PenTool } from "lucide-react";

type AppShellProps = {
  children: ReactNode;
  activePath?: string;
};

const navItems = [
  {
    href: "/",
    label: "首页",
    icon: Home,
    isActive: (activePath?: string) => activePath === "/",
  },
  {
    href: "/train/writing/",
    label: "训练",
    icon: PenTool,
    isActive: (activePath?: string) => Boolean(activePath?.startsWith("/train/")),
  },
  {
    href: "/handwriting/",
    label: "手写",
    icon: NotebookPen,
    isActive: (activePath?: string) => activePath === "/handwriting/",
  },
  {
    href: "/weakness/",
    label: "弱点",
    icon: BarChart3,
    isActive: (activePath?: string) => activePath === "/weakness/",
  },
];

export default function AppShell({ children, activePath }: AppShellProps) {
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
          const isActive = item.isActive(activePath);

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={`bottom-nav-link${isActive ? " is-active" : ""}`}
              href={item.href}
              key={item.href}
            >
              <Icon aria-hidden="true" size={21} strokeWidth={2.2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
