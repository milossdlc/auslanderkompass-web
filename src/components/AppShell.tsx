import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
  sidebar?: ReactNode;
  topbar?: ReactNode;
};

export function AppShell({ children, sidebar, topbar }: AppShellProps) {
  return (
    <div className="app-shell">
      {sidebar && <aside className="app-shell-sidebar">{sidebar}</aside>}
      <div className="app-shell-main">
        {topbar && <header className="app-shell-topbar">{topbar}</header>}
        <main className="app-shell-content">
          {children}
          {/* The same navigation is shown as a bottom bar on mobile. */}
          {sidebar}
        </main>
      </div>
    </div>
  );
}
