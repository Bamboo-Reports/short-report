"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Loader2 } from "lucide-react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import type { FinanceApiResponse } from "@/types/dashboard"

interface RevenueChartProps {
  ticker: string
}

const chartConfig = {
  avgPrice: {
    label: "Avg. Stock Price",
    color: "#017ABF",
  },
} satisfies ChartConfig

export function RevenueChart({ ticker }: RevenueChartProps) {
  const [data, setData] = useState<FinanceApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const res = await fetch(`/api/finance?ticker=${encodeURIComponent(ticker)}`)
        if (!res.ok) throw new Error("Failed to fetch")
        const json = await res.json()
        setData(json)
      } catch {
        setError("Unable to load financial data")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [ticker])

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
          <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-brand-blue" />
          </div>
          Financial Performance
          <span className="text-xs font-normal text-muted-foreground ml-auto">
            {ticker} &middot; 5-Year Avg. Stock Price
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && (
          <div className="flex items-center justify-center h-[220px] text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            <span className="text-sm">Loading market data...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-[220px] text-muted-foreground">
            <span className="text-sm">{error}</span>
          </div>
        )}

        {!loading && !error && data?.priceHistory && data.priceHistory.length > 0 && (
          <ChartContainer config={chartConfig} className="!aspect-auto h-[220px] w-full min-h-[220px]">
            <AreaChart
              data={data.priceHistory}
              margin={{ top: 8, right: 12, left: 12, bottom: 0 }}
            >
              <defs>
                <linearGradient id="brandBlueGradient" x1="0" y1="0" x2="0" y2="1">
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
                tickFormatter={(value) => `$${value}`}
                width={55}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value) => [`$${Number(value).toFixed(2)}`, "Avg. Price"]}
                    labelFormatter={(label) => `FY ${label}`}
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="avgPrice"
                stroke="#017ABF"
                strokeWidth={2.5}
                fill="url(#brandBlueGradient)"
                dot={{ r: 4, fill: "#017ABF", strokeWidth: 2, stroke: "white" }}
                activeDot={{ r: 6, fill: "#F17C1D", strokeWidth: 2, stroke: "white" }}
              />
            </AreaChart>
          </ChartContainer>
        )}

      </CardContent>
    </Card>
  )
}
