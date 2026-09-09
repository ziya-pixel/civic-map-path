import { MapPin, Navigation, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { type RoadReport, severityClass, statusClass } from "@/lib/roadwatch-data";

const markerPosition: Record<string, string> = {
  "RW-2047": "left-[30%] top-[31%]", "RW-2044": "left-[58%] top-[46%]", "RW-2041": "left-[44%] top-[70%]", "RW-2038": "left-[72%] top-[28%]", "RW-2031": "left-[24%] top-[60%]",
};
const markerColor: Record<string, string> = { Low: "bg-mint", Medium: "bg-amber", High: "bg-coral", Critical: "bg-coral" };

export function RoadwatchMap({ reports, selectable = false, selectedCoordinates, onSelect }: { reports: RoadReport[]; selectable?: boolean; selectedCoordinates?: { latitude: number; longitude: number } | null; onSelect?: (coordinates: { latitude: number; longitude: number }) => void }) {
  const [selected, setSelected] = useState<RoadReport | null>(null);
  const visibleReports = useMemo(() => reports.slice(0, 10), [reports]);
  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!selectable || !onSelect) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.012;
    const y = (0.5 - (event.clientY - rect.top) / rect.height) * 0.01;
    onSelect({ latitude: 12.9716 + y, longitude: 77.5946 + x });
  };
  return <div className="leaflet-map-mock map-surface relative rounded-xl border-2 border-ink shadow-[5px_5px_0_0_var(--ink)]" onClick={handleMapClick} role={selectable ? "application" : undefined} aria-label={selectable ? "Click map to select a report location" : "Community road damage map"}>
    <div className="absolute left-3 top-3 z-10 flex flex-wrap items-center gap-2 rounded-md border-2 border-ink/70 bg-paper/95 px-2 py-1.5 font-mono text-[10px] uppercase tracking-[.08em] text-ink"><span className="flex items-center gap-1"><span className="size-2 rounded-full bg-coral" />Critical/high</span><span className="flex items-center gap-1"><span className="size-2 rounded-full bg-amber" />Medium</span><span className="flex items-center gap-1"><span className="size-2 rounded-full bg-mint" />Low/resolved</span></div>
    {visibleReports.map((report) => <button type="button" key={report.id} className={`absolute z-[2] ${markerPosition[report.id] ?? "left-1/2 top-1/2"}`} onClick={(event) => { event.stopPropagation(); setSelected(report); }} aria-label={`Open ${report.damageType} report ${report.id}`}><span className={`marker-pulse absolute -inset-2 rounded-full opacity-40 ${markerColor[report.severity]}`} /><span className={`relative block size-4 rounded-full border-2 border-paper shadow-[2px_2px_0_0_var(--ink)] ${markerColor[report.severity]}`} /></button>)}
    {selectedCoordinates && <span className="absolute left-1/2 top-1/2 z-[3] -translate-x-1/2 -translate-y-1/2"><span className="absolute -inset-3 rounded-full border-2 border-brand/50" /><MapPin className="relative size-8 fill-brand text-paper drop-shadow-[2px_2px_0_var(--ink)]" /></span>}
    {selectable && <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-md border-2 border-ink/70 bg-paper/95 px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[.08em] text-ink"><Navigation className="size-3.5 text-brand" />Click map to adjust pin</div>}
    {selected && <div className="absolute bottom-4 right-4 z-10 w-[min(300px,calc(100%-2rem))] rounded-xl border-2 border-ink bg-paper p-3 shadow-[5px_5px_0_0_var(--ink)]"><div className="flex items-start justify-between gap-3"><div><p className="font-mono text-[10px] uppercase tracking-[.12em] text-brand-deep">{selected.id} · {selected.address}</p><h3 className="mt-1 font-semibold">{selected.damageType}</h3></div><Button variant="ghost" size="icon" className="size-7 text-ink" onClick={() => setSelected(null)} aria-label="Close report"><X /></Button></div><p className="mt-2 text-sm text-ink/70">{selected.description}</p><div className="mt-3 flex flex-wrap items-center gap-2"><span className={`rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-[.08em] ${severityClass[selected.severity]}`}>{selected.severity}</span><span className={`rounded-full px-2 py-1 font-mono text-[10px] uppercase tracking-[.08em] ${statusClass[selected.status]}`}>{selected.status}</span></div></div>}
  </div>;
}
