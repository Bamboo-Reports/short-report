"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DealInfo } from "@/types/dashboard"
import { ArrowRight, Calendar } from "lucide-react"

function PartnerLogo({ domain, size = 28 }: { domain: string; size?: number }) {
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "")
  return (
    <img
      src={`https://img.logo.dev/${cleanDomain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY}&size=64&format=png`}
      alt={`${cleanDomain} logo`}
      width={size}
      height={size}
      className="rounded-md object-contain flex-shrink-0"
      onError={(e) => { e.currentTarget.style.display = "none" }}
    />
  )
}

interface DealTimelineProps {
  deals: DealInfo[]
  onSelectDeal: (index: number) => void
}

export function DealTimeline({ deals, onSelectDeal }: DealTimelineProps) {
  // Group deals by year, sorted descending
  const grouped = deals.reduce<Record<string, { deal: DealInfo; index: number }[]>>((acc, deal, i) => {
    const year = deal.dealYear || "Unknown"
    if (!acc[year]) acc[year] = []
    acc[year].push({ deal, index: i })
    return acc
  }, {})

  const sortedYears = Object.keys(grouped).sort((a, b) => {
    const na = parseInt(a), nb = parseInt(b)
    if (isNaN(na) && isNaN(nb)) return 0
    if (isNaN(na)) return 1
    if (isNaN(nb)) return -1
    return nb - na
  })

  return (
    <div className="relative pl-8">
      {/* Timeline line */}
      <div className="absolute left-3 top-0 bottom-0 border-l-2 border-brand-blue/30" />

      <div className="space-y-8">
        {sortedYears.map((year) => (
          <div key={year}>
            {/* Year marker */}
            <div className="relative flex items-center mb-4">
              <div className="absolute -left-8 w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center z-10">
                <Calendar className="w-3 h-3 text-white" />
              </div>
              <span className="text-lg font-semibold text-brand-blue">{year}</span>
            </div>

            {/* Deals for this year */}
            <div className="space-y-3 ml-2">
              {grouped[year].map(({ deal, index }) => (
                <div key={index} className="relative">
                  {/* Connector dot */}
                  <div className="absolute -left-[2.625rem] top-4 w-2.5 h-2.5 rounded-full bg-brand-blue/40 border-2 border-white z-10" />

                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {deal.partnerUrl && (
                          <PartnerLogo domain={deal.partnerUrl} />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1.5">
                            <span className="font-medium text-sm truncate">
                              {deal.partnerName}
                            </span>
                            <Badge
                              className={
                                deal.dealType === "Outsourced"
                                  ? "bg-brand-orange text-white border-transparent"
                                  : "bg-brand-blue text-white border-transparent"
                              }
                            >
                              {deal.dealType}
                            </Badge>
                          </div>

                          <p className="text-xs text-muted-foreground mb-2">
                            {deal.solutionType}
                          </p>

                          <div className="flex flex-wrap gap-1 mb-2">
                            {deal.solution.map((s, si) => (
                              <span
                                key={si}
                                className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                              >
                                {s}
                              </span>
                            ))}
                          </div>

                          <button
                            onClick={() => onSelectDeal(index)}
                            className="text-xs text-brand-blue hover:text-brand-blue/80 font-medium inline-flex items-center gap-1 transition-colors"
                          >
                            View Details <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
