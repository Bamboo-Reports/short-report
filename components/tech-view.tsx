"use client"

import { useMemo, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, FileText } from "lucide-react"
import type { TechStackInfo } from "@/types/dashboard"

const BRAND_PALETTE = [
  "#017ABF",  // brand blue
  "#F17C1D",  // brand orange
  "#015a8f",  // dark blue
  "#FFAE71",  // light orange
  "#6EC4EA",  // brand blue light
  "#d35400",  // deep orange
  "#0396a6",  // teal blue
  "#e8913a",  // warm orange
  "#034e7b",  // navy blue
  "#f4a460",  // sandy orange
  "#2a9df4",  // sky blue
  "#c0592b",  // rust orange
]

function getCategoryColor(category: string, index: number): string {
  return BRAND_PALETTE[index % BRAND_PALETTE.length]
}


interface TechViewProps {
  techStack: TechStackInfo[]
}

export function TechView({ techStack }: TechViewProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartInstanceRef = useRef<any>(null)

  const treemapData = useMemo(() => {
    const categoryMap = new Map<string, { tool: string; count: number }[]>()
    techStack.forEach((item) => {
      const key = item.category
      if (!categoryMap.has(key)) categoryMap.set(key, [])
      categoryMap.get(key)!.push({ tool: item.tool, count: item.count })
    })

    const points: { id?: string; name: string; parent?: string; value?: number; color?: string }[] = []

    let catIndex = 0
    categoryMap.forEach((tools, category) => {
      points.push({
        id: category,
        name: category,
        color: getCategoryColor(category, catIndex),
      })
      catIndex++

      tools.forEach(({ tool, count }) => {
        points.push({
          name: tool,
          parent: category,
          value: count,
        })
      })
    })

    return points
  }, [techStack])


  useEffect(() => {
    if (!chartRef.current) return

    let destroyed = false

    async function renderChart() {
      const Highcharts = (await import("highcharts")).default
      const treemapModule = (await import("highcharts/modules/treemap")).default
      if (typeof treemapModule === "function") {
        treemapModule(Highcharts)
      }

      if (destroyed || !chartRef.current) return

      chartInstanceRef.current = Highcharts.chart(chartRef.current, {
        chart: {
          type: "treemap",
          backgroundColor: "transparent",
          style: {
            fontFamily: "Google Sans, system-ui, sans-serif",
          },
        },
        title: {
          text: undefined,
        },
        credits: {
          enabled: false,
        },
        tooltip: {
          useHTML: true,
          style: {
            fontSize: "13px",
          },
          pointFormat: "<b>{point.name}</b>: {point.value}",
        },
        series: [
          {
            type: "treemap",
            name: "Tech Stack",
            allowTraversingTree: true,
            alternateStartingDirection: true,
            animationLimit: 1000,
            borderRadius: 3,
            nodeSizeBy: "leaf",
            dataLabels: {
              format: "{point.name}",
              style: {
                textOutline: "none",
              },
            },
            levels: [
              {
                level: 1,
                layoutAlgorithm: "sliceAndDice",
                groupPadding: 3,
                borderRadius: 3,
                borderWidth: 1,
                colorByPoint: true,
                dataLabels: {
                  headers: true,
                  enabled: true,
                  style: {
                    fontSize: "0.6em",
                    fontWeight: "normal",
                    textTransform: "uppercase",
                    color: "var(--highcharts-neutral-color-100, #000)",
                  },
                },
              },
              {
                level: 2,
                dataLabels: {
                  enabled: true,
                  inside: false,
                },
              },
            ],
            data: treemapData,
          },
        ] as any,
      })
    }

    renderChart()

    return () => {
      destroyed = true
      chartInstanceRef.current?.destroy()
      chartInstanceRef.current = null
    }
  }, [treemapData])

  const analysis = useMemo(() => {
    const B = ({ children }: { children: React.ReactNode }) => (
      <span className="font-semibold text-foreground">{children}</span>
    )

    const totalTools = techStack.length
    const categories = new Map<string, TechStackInfo[]>()
    techStack.forEach((t) => {
      if (!categories.has(t.category)) categories.set(t.category, [])
      categories.get(t.category)!.push(t)
    })
    const totalCategories = categories.size
    const totalCount = techStack.reduce((sum, t) => sum + t.count, 0)

    // Top category by tool count
    const sortedCategories = Array.from(categories.entries())
      .map(([cat, tools]) => ({ cat, toolCount: tools.length, totalCount: tools.reduce((s, t) => s + t.count, 0) }))
      .sort((a, b) => b.toolCount - a.toolCount)
    const topCat = sortedCategories[0]

    // Top tool by count
    const topTool = [...techStack].sort((a, b) => b.count - a.count)[0]

    // Company name
    const companyName = techStack[0]?.company || "The organization"

    const summary = (
      <>
        {companyName}&apos;s technology footprint spans <B>{totalTools} tools</B> across{" "}
        <B>{totalCategories} categories</B>, with a combined adoption score of <B>{totalCount}</B>.
        {topCat && <>{" "}The heaviest investment is in <B>{topCat.cat}</B> ({topCat.toolCount} tools), reflecting the organization&apos;s core technology priorities.</>}
      </>
    )

    const bullets: React.ReactNode[] = []

    // Bullet 1: Dominant category
    if (topCat) {
      const topCatPct = totalTools > 0 ? Math.round((topCat.toolCount / totalTools) * 100) : 0
      bullets.push(
        <><B>{topCat.cat}</B> accounts for <B>{topCatPct}%</B> of the technology stack with <B>{topCat.toolCount} tools</B>.
          {topCatPct >= 40
            ? " This heavy concentration signals a core competency area — any vendor in this space faces an entrenched ecosystem."
            : " A balanced distribution across categories suggests a diversified technology strategy."}
        </>
      )
    }

    // Bullet 2: Top tool
    if (topTool) {
      bullets.push(
        <><B>{topTool.tool}</B> leads adoption with a score of <B>{topTool.count}</B> in the <B>{topTool.category}</B> category, indicating it is a foundational technology in the stack with deep organizational dependency.</>
      )
    }

    // Bullet 3: Stack breadth
    if (sortedCategories.length >= 3) {
      const top3 = sortedCategories.slice(0, 3)
      bullets.push(
        <>The top 3 categories — {top3.map((c, i) => (
          <span key={c.cat}>{i > 0 && (i === 2 ? ", and " : ", ")}<B>{c.cat}</B> ({c.toolCount})</span>
        ))} — cover <B>{Math.round((top3.reduce((s, c) => s + c.toolCount, 0) / totalTools) * 100)}%</B> of all tools, revealing where budget and engineering effort are concentrated.</>
      )
    }

    return { summary, bullets }
  }, [techStack])

  return (
    <div className="px-6 sm:px-8 py-6 space-y-6">
      {/* Analyst Overview */}
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
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            {analysis.summary}
          </p>
          <div className="space-y-2.5">
            {analysis.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div
                  className={`w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0 ${
                    idx % 2 === 0 ? "bg-brand-blue" : "bg-brand-orange"
                  }`}
                />
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {bullet}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Treemap Card */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
            <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-brand-blue" />
            </div>
            Technology Landscape
            <Badge variant="outline" className="ml-2 text-xs border-border/60 text-muted-foreground font-normal">
              {techStack.length} tools &middot; {new Set(techStack.map(t => t.category)).size} categories &middot; {techStack.reduce((sum, t) => sum + t.count, 0)} total
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div ref={chartRef} className="w-full" style={{ height: "520px" }} />
        </CardContent>
      </Card>
    </div>
  )
}
