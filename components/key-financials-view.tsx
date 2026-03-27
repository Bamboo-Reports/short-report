"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp } from "lucide-react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import type { FinancialYearData } from "@/types/dashboard"

const revenueChartConfig = {
  revenue: {
    label: "Revenue",
    color: "#017ABF",
  },
} satisfies ChartConfig

const incomeChartConfig = {
  netIncome: {
    label: "Net Income",
    color: "#017ABF",
  },
  operatingIncome: {
    label: "Operating Income",
    color: "#F17C1D",
  },
} satisfies ChartConfig

interface KeyFinancialsViewProps {
  financials?: FinancialYearData[] | null
}

export function KeyFinancialsView({ financials }: KeyFinancialsViewProps) {
  const revenueData = (financials || []).map((f) => ({ year: f.year, revenue: f.revenue }))
  const incomeData = (financials || []).map((f) => ({ year: f.year, netIncome: f.netIncome, operatingIncome: f.operatingIncome }))

  const yearCount = revenueData.length

  return (
    <div className="p-6 sm:p-8 space-y-6 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="border-border/60 shadow-executive hover:shadow-executive-md transition-all duration-300">
          <div className="h-0.5 bg-gradient-to-r from-brand-blue to-brand-blue-light rounded-t-lg" />
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-brand-blue" />
              </div>
              Revenue
              <span className="text-xs font-normal text-muted-foreground ml-auto">
                Last {yearCount} Years &middot; USD Mn
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueChartConfig} className="!aspect-auto h-[280px] w-full min-h-[280px]">
              <BarChart
                data={revenueData}
                margin={{ top: 24, right: 12, left: 12, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#017ABF" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#017ABF" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  tickMargin={8}
                  tickFormatter={(value) => `FY ${value}`}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  tickMargin={8}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(1)}B`}
                  width={60}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [`$${Number(value).toLocaleString()} Mn`, "Revenue"]}
                      labelFormatter={(label) => `FY ${label}`}
                    />
                  }
                />
                <Bar
                  dataKey="revenue"
                  fill="url(#revenueGradient)"
                  radius={[6, 6, 0, 0]}
                  barSize={56}
                >
                  <LabelList
                    dataKey="revenue"
                    position="top"
                    formatter={(value: number) => value.toLocaleString()}
                    style={{ fontSize: 12, fontWeight: 600, fill: "#017ABF" }}
                    offset={8}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Income Chart */}
        <Card className="border-border/60 shadow-executive hover:shadow-executive-md transition-all duration-300">
          <div className="h-0.5 bg-gradient-to-r from-brand-orange to-brand-orange-light rounded-t-lg" />
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
              <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-brand-orange" />
              </div>
              Income
              <span className="text-xs font-normal text-muted-foreground ml-auto">
                Net &amp; Operating &middot; Last {yearCount} Years &middot; USD Mn
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={incomeChartConfig} className="!aspect-auto h-[280px] w-full min-h-[280px]">
              <BarChart
                data={incomeData}
                margin={{ top: 24, right: 12, left: 12, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="netIncomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#017ABF" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#017ABF" stopOpacity={0.6} />
                  </linearGradient>
                  <linearGradient id="opIncomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F17C1D" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#F17C1D" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  tickMargin={8}
                  tickFormatter={(value) => `FY ${value}`}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  tickMargin={8}
                  tickFormatter={(value) => `$${value}`}
                  width={60}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      formatter={(value, name) => [
                        `$${Number(value).toLocaleString()} Mn`,
                        name === "netIncome" ? "Net Income" : "Operating Income",
                      ]}
                      labelFormatter={(label) => `FY ${label}`}
                    />
                  }
                />
                <Bar
                  dataKey="netIncome"
                  fill="url(#netIncomeGradient)"
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                >
                  <LabelList
                    dataKey="netIncome"
                    position="top"
                    formatter={(value: number) => value.toLocaleString()}
                    style={{ fontSize: 11, fontWeight: 600, fill: "#017ABF" }}
                    offset={8}
                  />
                </Bar>
                <Bar
                  dataKey="operatingIncome"
                  fill="url(#opIncomeGradient)"
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                >
                  <LabelList
                    dataKey="operatingIncome"
                    position="top"
                    formatter={(value: number) => value.toLocaleString()}
                    style={{ fontSize: 11, fontWeight: 600, fill: "#F17C1D" }}
                    offset={8}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-2 rounded-sm bg-brand-blue" />
                <span className="text-xs text-muted-foreground">Net Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-2 rounded-sm bg-brand-orange" />
                <span className="text-xs text-muted-foreground">Operating Income</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
