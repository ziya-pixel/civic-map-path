import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { type RoadReport, formatDate, severityClass, statusClass } from "@/lib/roadwatch-data";

export function ReportCard({ report, compact = false }: { report: RoadReport; compact?: boolean }) {
  return <article className={`border-2 border-ink bg-paper shadow-[4px_4px_0_0_var(--ink)] ${compact ? "p-3" : "p-4"}`}>
    <div className="flex items-start gap-3">
      <div className="grid size-14 shrink-0 place-items-center rounded-lg bg-cream font-mono text-[10px] uppercase tracking-[.08em] text-ink/45">Photo</div>
      <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-[.08em] ${severityClass[report.severity]}`}>{report.severity}</span><span className={`rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-[.08em] ${statusClass[report.status]}`}>{report.status}</span></div><h3 className="mt-2 truncate text-base font-semibold">{report.damageType}</h3><div className="mt-1 flex items-center gap-1.5 text-sm text-ink/60"><MapPin className="size-3.5" />{report.address}</div></div>
      <Link to="/map" className="grid size-8 shrink-0 place-items-center rounded-md text-ink/55 hover:bg-cream hover:text-ink" aria-label={`Open ${report.id} on map`}><ArrowUpRight className="size-4" /></Link>
    </div>
    {!compact && <><p className="mt-3 text-sm leading-relaxed text-ink/65">{report.description}</p><div className="mt-4 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[.08em] text-ink/45"><CalendarDays className="size-3.5" />Reported {formatDate(report.createdAt)}<span className="mx-1">·</span>{report.id}</div></>}
  </article>;
}
