"use client";

import { useState } from "react";
import { ResultCard } from "@/components/results/ResultCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Button";
import { matches, wrestlers, events, championships } from "@/data";
import type { MatchType } from "@/types";

export default function MatchesPage() {
  const [year, setYear] = useState("all");
  const [eventId, setEventId] = useState("all");
  const [q, setQ] = useState("");
  const [champ, setChamp] = useState("all");
  const [type, setType] = useState("all");
  const years = Array.from(new Set(matches.map((m) => new Date(m.date).getFullYear()))).sort((a,b)=>b-a);
  const types: MatchType[] = ["singles","tag-team","steel-cage","ladder","battle-royal","tournament","submission","no-disqualification"];
  const filtered = matches.filter((m) => {
    if (year !== "all" && new Date(m.date).getFullYear() !== Number(year)) return false;
    if (eventId !== "all" && m.eventId !== eventId) return false;
    if (champ !== "all" && m.championship !== champ) return false;
    if (type !== "all" && m.type !== type) return false;
    if (q && !m.competitors.some((c) => c.wrestler.toLowerCase().includes(q.toLowerCase()) || c.wrestlerId === q)) return false;
    return true;
  }).sort((a,b)=>new Date(b.date).getTime()-new Date(a.date).getTime());

  return (
    <>
      <PageHeader overline="Match Database" title={<>Matches &<br />Records</>} subtitle="Search match records by event, competitor, championship, and stipulation." dark />
      <section className="bg-[var(--im-surface)] py-12 md:py-16">
        <div className="container-wide">
          <div className="mb-6 grid gap-3 border border-[var(--im-border)] bg-[var(--im-page)] p-4 sm:grid-cols-2 xl:grid-cols-5">
            <Select label="Year" value={year} onChange={setYear} options={[["all","All Years"], ...years.map((y)=>[String(y),String(y)] as [string,string])]} />
            <Select label="Event" value={eventId} onChange={setEventId} options={[["all","All Events"], ...events.map((e)=>[e.id,e.name] as [string,string])]} />
            <div><label className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--im-muted)]">Competitor</label><input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search wrestler" className="mt-1 min-h-10 w-full border border-[var(--im-border)] bg-[var(--im-page)] px-3 font-body text-sm text-[var(--im-ink)] focus:border-[#C1272D] focus:outline-none focus:ring-1 focus:ring-[#C1272D]/30" /></div>
            <Select label="Championship" value={champ} onChange={setChamp} options={[["all","All Titles"], ...championships.map((c)=>[c.id,c.shortName] as [string,string])]} />
            <Select label="Type" value={type} onChange={setType} options={[["all","All Types"], ...types.map((t)=>[t,t.replace(/-/g," ")] as [string,string])]} />
          </div>
          <div className="mb-6 flex items-center justify-between gap-3 border-b border-[var(--im-border)] pb-4">
            <Badge variant="muted" size="sm">{filtered.length} matches</Badge>
            <button type="button" onClick={()=>{setYear("all");setEventId("all");setQ("");setChamp("all");setType("all");}} className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#C1272D] hover:text-[var(--im-ink)]">Clear Filters</button>
          </div>
          <div className="space-y-4">{filtered.map((m)=><ResultCard key={m.id} match={m} wrestlers={wrestlers} expanded={Boolean(m.result?.winner)} />)}</div>
          {!filtered.length && <p className="border border-[var(--im-border)] bg-[var(--im-page)] p-6 font-body text-sm text-[var(--im-muted)]">No matches found.</p>}
        </div>
      </section>
    </>
  );
}
function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v:string)=>void; options: [string,string][] }) {
  return <div><label className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--im-muted)]">{label}</label><select value={value} onChange={(e)=>onChange(e.target.value)} className="mt-1 min-h-10 w-full border border-[var(--im-border)] bg-[var(--im-page)] px-3 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--im-ink)] focus:border-[#C1272D] focus:outline-none focus:ring-1 focus:ring-[#C1272D]/30">{options.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></div>;
}
