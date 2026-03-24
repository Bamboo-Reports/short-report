"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Building2, Users, TrendingUp, UserCheck, Map } from "lucide-react"
import { IndiaMap } from "@/components/india-map"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts"
import type { GccSnapshotInfo } from "@/types/dashboard"

interface GccViewProps {
  snapshot: GccSnapshotInfo
}

export function GccView({ snapshot }: GccViewProps) {
  return (
    <div className="px-6 sm:px-8 py-6 space-y-6">
      {/* Top Section: Centers + Map placeholder */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Centers Cards - takes 2 cols */}
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
                  incYear={center.incYear}
                  analystNote={center.analystNote}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* India Map */}
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

      {/* Bottom Section: Key Executives + Headcount */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Key Executives - takes 3 cols */}
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
                  <ChevronRight className="w-4 h-4 text-brand-orange flex-shrink-0" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Headcount Growth - takes 2 cols */}
        <Card className="lg:col-span-2 border-border/60 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-brand-blue" />
              </div>
              India Headcount Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Big number */}
            <div className="text-center mb-4">
              <p className="text-5xl font-bold text-foreground tracking-tight tabular-nums">
                {snapshot.currentHeadcount.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Total Employees</p>
            </div>

            {/* Year labels above chart */}
            <div className="flex justify-between px-4 mb-1">
              {snapshot.headcountHistory.map((h) => (
                <div key={h.year} className="text-center">
                  <p className="text-sm font-semibold text-foreground tabular-nums">
                    {h.count.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Line chart */}
            <div className="h-[80px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={snapshot.headcountHistory}
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#017ABF"
                    strokeWidth={3}
                    dot={{
                      fill: "#017ABF",
                      stroke: "#ffffff",
                      strokeWidth: 2,
                      r: 6,
                    }}
                    activeDot={{
                      fill: "#017ABF",
                      stroke: "#ffffff",
                      strokeWidth: 2,
                      r: 8,
                    }}
                  />
                  <XAxis
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    dy={5}
                  />
                  <YAxis hide domain={["dataMin - 100", "dataMax + 50"]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "13px",
                    }}
                    formatter={(value: number) => [value.toLocaleString(), "Headcount"]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function CenterCard({
  city,
  incYear,
  analystNote,
}: {
  city: string
  incYear: string
  analystNote: string
}) {
  return (
    <div className="rounded-xl bg-muted/30 border border-border/40 p-5 flex flex-col items-center text-center">
      {/* City badge */}
      <div className="bg-[#0f172a] text-white text-sm font-semibold px-5 py-2 rounded-lg mb-3">
        {city}
      </div>

      {/* Year badge */}
      <div className="bg-[#0f172a] text-white text-sm font-semibold px-5 py-2 rounded-lg mb-4">
        {incYear}
      </div>

      {/* Analyst note */}
      <p className="text-xs text-muted-foreground leading-relaxed">
        {analystNote}
      </p>
    </div>
  )
}
