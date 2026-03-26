"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, TrendingUp, UserCheck, Map, MapPin, Calendar, FileText } from "lucide-react"
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
  return (
    <div className="px-6 sm:px-8 py-6 space-y-6">
      {/* Summary Metrics Strip */}
      <div className="grid grid-cols-3 gap-4">
        <MetricCard
          icon={<Building2 className="w-5 h-5" />}
          label="Centers"
          value={String(snapshot.centers.length)}
          accent="blue"
        />
        <MetricCard
          icon={<Users className="w-5 h-5" />}
          label="Total Headcount"
          value={snapshot.currentHeadcount.toLocaleString()}
          accent="orange"
        />
        <MetricCard
          icon={<MapPin className="w-5 h-5" />}
          label="Locations"
          value={[...new Set(snapshot.centers.map((c) => c.city))].join(", ")}
          accent="blue"
        />
      </div>

      {/* Analyst Overview */}
      {analystNotes && analystNotes.notes.length > 0 && (
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-4">
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

      {/* Centers + Map */}
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/60 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-brand-blue" />
              </div>
              India Centers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`grid gap-4 ${
              snapshot.centers.length <= 3
                ? `grid-cols-${snapshot.centers.length}`
                : "grid-cols-2 lg:grid-cols-3"
            }`}>
              {snapshot.centers.map((center, idx) => (
                <CenterCard
                  key={idx}
                  city={center.city}
                  centerType={center.centerType}
                  incYear={center.incYear}
                  employeeCount={center.employeeCount}
                  analystNote={center.analystNote}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
              <div className="w-7 h-7 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                <Map className="w-3.5 h-3.5 text-brand-orange" />
              </div>
              India Map View
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[300px]">
              <IndiaMap centers={snapshot.centers} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Executives + Headcount */}
      <div className="grid lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 border-border/60 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
              <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-brand-orange" />
              </div>
              Key Executives India
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/60">
              {snapshot.keyExecutives.map((exec, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 px-6 py-3.5 hover:bg-muted/20 transition-colors"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-brand-blue to-brand-blue-light rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-semibold text-white">
                      {exec.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{exec.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{exec.designation}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-border/60 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-brand-blue" />
              </div>
              India Headcount Growth
              <span className="text-xs font-normal text-muted-foreground ml-auto">
                {snapshot.headcountHistory.length > 0 && `${snapshot.headcountHistory[0].year}–${snapshot.headcountHistory[snapshot.headcountHistory.length - 1].year}`}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: { label: "Headcount", color: "#017ABF" },
              } satisfies ChartConfig}
              className="!aspect-auto h-[220px] w-full min-h-[220px]"
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
      </div>
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode
  label: string
  value: string
  accent: "blue" | "orange"
}) {
  return (
    <div className="bg-card rounded-xl border border-border/60 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
            accent === "blue" ? "bg-brand-blue/10 text-brand-blue" : "bg-brand-orange/10 text-brand-orange"
          }`}
        >
          {icon}
        </div>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-lg text-foreground tracking-tight">{value}</p>
    </div>
  )
}

function CenterCard({
  city,
  centerType,
  incYear,
  employeeCount,
  analystNote,
}: {
  city: string
  centerType: string
  incYear: string
  employeeCount: string
  analystNote: string
}) {
  return (
    <div className="rounded-xl bg-card border border-border/60 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-blue" />
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

      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>Est. {incYear}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="w-3 h-3" />
          <span>{employeeCount} employees</span>
        </div>
      </div>

      <p className="text-xs text-foreground/70 leading-relaxed">{analystNote}</p>
    </div>
  )
}
