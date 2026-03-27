"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import type { DealInfo } from "@/types/dashboard"

function PartnerLogo({ domain, size = 28 }: { domain: string; size?: number }) {
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "")
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  if (error) return null
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      {!loaded && <Skeleton className="absolute inset-0 rounded-md" />}
      <img
        src={`https://img.logo.dev/${cleanDomain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY}&size=64&format=png`}
        alt={`${cleanDomain} logo`}
        width={size}
        height={size}
        className={`rounded-md object-contain flex-shrink-0 transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  )
}

interface DealKanbanProps {
  deals: DealInfo[]
  onSelectDeal: (index: number) => void
}

const COLUMNS = [
  { type: "Outsourced", borderColor: "border-t-brand-orange", bgColor: "bg-brand-orange/5" },
  { type: "Partnership", borderColor: "border-t-brand-blue", bgColor: "bg-brand-blue/5" },
  { type: "In-House", borderColor: "border-t-emerald-500", bgColor: "bg-emerald-50" },
  { type: "Customer", borderColor: "border-t-purple-500", bgColor: "bg-purple-50" },
] as const

export function DealKanban({ deals, onSelectDeal }: DealKanbanProps) {
  // Group deals by deal type
  const grouped = deals.reduce<Record<string, { deal: DealInfo; index: number }[]>>((acc, deal, i) => {
    const type = deal.dealType || "Other"
    if (!acc[type]) acc[type] = []
    acc[type].push({ deal, index: i })
    return acc
  }, {})

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {COLUMNS.map((col) => {
        const columnDeals = grouped[col.type] || []

        return (
          <div
            key={col.type}
            className={`rounded-lg border border-t-4 ${col.borderColor} ${col.bgColor} p-3`}
          >
            {/* Column header */}
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">{col.type}</h3>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                {columnDeals.length}
              </Badge>
            </div>

            {/* Deal cards */}
            <div className="space-y-2">
              {columnDeals.map(({ deal, index }) => (
                <Card
                  key={index}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onSelectDeal(index)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      {deal.partnerUrl && (
                        <PartnerLogo domain={deal.partnerUrl} size={20} />
                      )}
                      <span className="text-xs font-medium truncate">
                        {deal.partnerName}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {deal.dealYear}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {deal.solutionType}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {deal.solution.slice(0, 3).map((s, si) => (
                        <Badge
                          key={si}
                          variant="outline"
                          className="text-[9px] px-1 py-0 h-4"
                        >
                          {s}
                        </Badge>
                      ))}
                      {deal.solution.length > 3 && (
                        <span className="text-[9px] text-muted-foreground">
                          +{deal.solution.length - 3}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              {columnDeals.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-6">
                  No deals
                </p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
