"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, TrendingUp, UserCheck, MapPin, Calendar, FileText, Globe2 } from "lucide-react"
import { IndiaMap } from "@/components/india-map"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import type { GccSnapshotInfo, AnalystNoteData } from "@/types/dashboard"

interface GccViewProps {
  snapshot: GccSnapshotInfo
  analystNotes?: AnalystNoteData | null
}

export function GccView({ snapshot, analystNotes }: GccViewProps) {
  const uniqueCities = [...new Set(snapshot.centers.map((c) => c.city))]
  const uniqueTypes = [...new Set(snapshot.centers.map((c) => c.centerType))]
  const hasHeadcountHistory = snapshot.headcountHistory.length > 0

  return (
    <div className="px-6 sm:px-8 py-6 space-y-6 animate-fade-in-up">

      {/* ── Hero: Map with floating KPIs ────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden shadow-executive-lg border border-border/40">
        {/* Map */}
        <div className="h-[320px] sm:h-[380px]">
          <IndiaMap centers={snapshot.centers} />
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none" />

        {/* Floating KPI strip */}
        <div className="absolute inset-x-0 bottom-0 px-5 sm:px-8 pb-5">
          <div className="flex flex-wrap justify-end items-end gap-3 sm:gap-4">
            <KpiPill label="Centers" value={String(snapshot.centers.length)} />
            <KpiPill label="Headcount" value={snapshot.currentHeadcount.toLocaleString()} />
            <KpiPill label="Cities" value={uniqueCities.join(", ")} />
            <KpiPill label="Types" value={uniqueTypes.join(" / ")} />
          </div>
        </div>
      </div>

      {/* ── Row 2: Analyst Notes + Headcount Growth ─────────── */}
      <div className={`grid gap-6 ${
        analystNotes && analystNotes.notes.length > 0 && hasHeadcountHistory
          ? "lg:grid-cols-2"
          : "grid-cols-1"
      }`}>
        {/* Analyst Overview */}
        {analystNotes && analystNotes.notes.length > 0 && (
          <Card className="card-accent-orange border-border/60 shadow-executive">
            <CardHeader className="pb-4 border-b border-border/20">
              <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-brand-orange" />
                </div>
                Analyst Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5">
                {analystNotes.notes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0 ${
                        idx % 2 === 0 ? "bg-brand-blue" : "bg-brand-orange"
                      }`}
                    />
                    <p className="text-sm text-foreground/80 leading-relaxed">{note}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Headcount Growth Chart */}
        {hasHeadcountHistory && (
          <Card className="border-border/60 shadow-executive">
            <div className="h-0.5 bg-gradient-to-r from-brand-blue via-brand-blue-light to-transparent" />
            <CardHeader className="pb-4 border-b border-border/20">
              <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-brand-blue" />
                </div>
                India Headcount Growth
                <span className="text-xs font-normal text-muted-foreground ml-auto">
                  {snapshot.headcountHistory[0].year}–{snapshot.headcountHistory[snapshot.headcountHistory.length - 1].year}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: { label: "Headcount", color: "#017ABF" },
                } satisfies ChartConfig}
                className="!aspect-auto h-[200px] w-full min-h-[200px]"
              >
                <AreaChart
                  data={snapshot.headcountHistory}
                  margin={{ top: 24, right: 12, left: 12, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="headcountGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#017ABF" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#017ABF" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="year"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    tickMargin={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                    tickMargin={8}
                    tickFormatter={(value) => value.toLocaleString()}
                    width={55}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => [Number(value).toLocaleString(), "Employees"]}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#017ABF"
                    strokeWidth={2.5}
                    fill="url(#headcountGradient)"
                    dot={{ r: 4, fill: "#017ABF", strokeWidth: 2, stroke: "white" }}
                    activeDot={{ r: 6, fill: "#F17C1D", strokeWidth: 2, stroke: "white" }}
                  >
                    <LabelList
                      dataKey="count"
                      position="top"
                      formatter={(value: number) => value.toLocaleString()}
                      style={{ fontSize: 11, fontWeight: 600, fill: "#017ABF" }}
                      offset={10}
                    />
                  </Area>
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        )}
      </div>

      {/* ── India Centers ───────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-brand-blue" />
          </div>
          <h3 className="text-base font-semibold text-foreground">India Centers</h3>
          <Badge variant="outline" className="text-xs border-border/50 text-muted-foreground font-normal ml-1">
            {snapshot.centers.length} {snapshot.centers.length === 1 ? "center" : "centers"}
          </Badge>
        </div>

        <div className={`grid gap-4 stagger-children ${
          snapshot.centers.length === 1
            ? "grid-cols-1 max-w-lg"
            : snapshot.centers.length === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : snapshot.centers.length === 3
                ? "grid-cols-1 sm:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}>
          {snapshot.centers.map((center, idx) => (
            <CenterCard
              key={idx}
              city={center.city}
              centerType={center.centerType}
              incYear={center.incYear}
              employeeCount={center.employeeCount}
              analystNote={center.analystNote}
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* ── Key Executives India ────────────────────────────── */}
      {snapshot.keyExecutives.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
              <UserCheck className="w-4 h-4 text-brand-orange" />
            </div>
            <h3 className="text-base font-semibold text-foreground">Key Executives India</h3>
          </div>

          <div className={`grid gap-3 stagger-children ${
            snapshot.keyExecutives.length <= 3
              ? "grid-cols-1 sm:grid-cols-3"
              : snapshot.keyExecutives.length <= 4
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}>
            {snapshot.keyExecutives.map((exec, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 bg-card rounded-xl border border-border/50 px-4 py-3.5 shadow-executive hover:shadow-executive-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-brand-blue via-[#015a8f] to-brand-blue-light rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-xs font-semibold text-white">
                    {exec.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{exec.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{exec.designation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────────── */

function KpiPill({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="backdrop-blur-md rounded-lg px-3.5 py-2 border bg-white/[0.12] border-white/[0.15]">
      <p className="text-[10px] font-medium text-white/60 uppercase tracking-wider leading-none mb-1">{label}</p>
      <p className="text-sm font-semibold leading-tight text-white">{value}</p>
    </div>
  )
}

function CenterCard({
  city,
  centerType,
  incYear,
  employeeCount,
  analystNote,
  index,
}: {
  city: string
  centerType: string
  incYear: string
  employeeCount: string
  analystNote: string
  index: number
}) {
  const isEven = index % 2 === 0
  return (
    <div className="rounded-xl bg-card border border-border/50 shadow-executive hover:shadow-executive-md transition-all duration-300 overflow-hidden group">
      {/* Accent strip */}
      <div className={`h-1 ${
        isEven
          ? "bg-gradient-to-r from-brand-blue to-brand-blue-light"
          : "bg-gradient-to-r from-brand-orange to-brand-orange-light"
      }`} />

      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <MapPin className={`w-4 h-4 ${isEven ? "text-brand-blue" : "text-brand-orange"}`} />
            <h4 className="text-sm font-semibold text-foreground">{city}</h4>
          </div>
          <Badge
            className={`text-[11px] font-medium border-0 ${
              centerType === "GBS"
                ? "bg-brand-orange/10 text-brand-orange"
                : "bg-brand-blue/10 text-brand-blue"
            }`}
          >
            {centerType}
          </Badge>
        </div>

        {/* Employee count — large number */}
        <div className="mb-3">
          <p className="text-2xl font-semibold text-foreground tabular-nums tracking-tight">
            {employeeCount}
          </p>
          <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mt-0.5">Employees</p>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3 pb-3 border-b border-border/30">
          <Calendar className="w-3 h-3 flex-shrink-0" />
          <span>Established {incYear}</span>
        </div>

        {/* Analyst note */}
        <p className="text-xs text-foreground/65 leading-relaxed line-clamp-3">{analystNote}</p>
      </div>
    </div>
  )
}
