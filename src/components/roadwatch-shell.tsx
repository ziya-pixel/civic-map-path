import { Link, useLocation } from "@tanstack/react-router";
import { Activity, ClipboardList, LayoutDashboard, Map, Menu, ShieldCheck, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/map", label: "Live map", icon: Map },
  { to: "/my-reports", label: "My reports", icon: ClipboardList },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export function RoadwatchShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-cream font-sans text-ink antialiased">
      <header className="sticky top-0 z-30 border-b-2 border-ink/90 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <span className="grid size-9 place-items-center rounded-md bg-brand font-mono text-sm font-semibold text-paper shadow-[3px_3px_0_0_var(--ink)]">R</span>
            <span className="text-sm font-semibold tracking-tight">RoadWatch</span>
            <span className="hidden rounded-full border border-ink/25 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/60 sm:inline">Field tool</span>
          </Link>
          <nav className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/70 md:flex">
            {links.map(({ to, label, icon: Icon }) => (
              <Link key={to} to={to} className={isActive(to) ? "text-brand-deep" : "hover:text-ink"}>
                <span className="flex items-center gap-1.5"><Icon className="size-3.5" />{label}</span>
              </Link>
            ))}
            <Link to="/admin" className={isActive("/admin") ? "text-brand-deep" : "hover:text-ink"}>
              <span className="flex items-center gap-1.5"><ShieldCheck className="size-3.5" />Authority</span>
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden text-ink hover:bg-ink/5 sm:inline-flex"><Link to="/login">Log in</Link></Button>
            <Button asChild size="sm" className="bg-brand text-paper ring-2 ring-brand-deep shadow-[3px_3px_0_0_var(--brand-deep)] hover:-translate-y-0.5 hover:bg-brand"><Link to="/report"><Activity className="size-3.5" />Report</Link></Button>
            <Button variant="ghost" size="icon" className="text-ink md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation">
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {open && <nav className="border-t border-ink/10 bg-paper px-4 py-3 md:hidden"><div className="mx-auto grid max-w-7xl gap-1">{[...links, { to: "/admin", label: "Authority", icon: ShieldCheck }].map(({ to, label, icon: Icon }) => <Link key={to} to={to} onClick={() => setOpen(false)} className="flex items-center gap-2 px-3 py-2 font-mono text-xs uppercase tracking-[0.1em] text-ink/70 hover:bg-cream"><Icon className="size-4" />{label}</Link>)}</div></nav>}
      </header>
      {children}
      <footer className="border-t-2 border-ink/90 bg-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>RoadWatch · community field system</span><span>Photo · pin · repair</span>
        </div>
      </footer>
    </div>
  );
}

export function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="flex flex-col gap-5 border-b-2 border-ink/10 pb-8 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-deep">{eyebrow}</p><h1 className="mt-3 text-4xl font-semibold leading-none tracking-tight text-balance sm:text-5xl">{title}</h1><p className="mt-3 max-w-xl text-base text-ink/65">{description}</p></div>{action}</div>;
}
