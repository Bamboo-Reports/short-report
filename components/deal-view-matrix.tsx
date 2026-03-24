"use client"

import { useState } from "react"
import type { DealInfo } from "@/types/dashboard"

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

interface DealMatrixProps {
  deals: DealInfo[]
  onSelectDeal: (index: number) => void
}

const DEAL_TYPE_COLORS: Record<string, { dot: string; label: string }> = {
  Partnership: { dot: "bg-brand-blue", label: "Partnership" },
  Outsourced: { dot: "bg-brand-orange", label: "Outsourced" },
  "In-House": { dot: "bg-emerald-500", label: "In-House" },
  Customer: { dot: "bg-purple-500", label: "Customer" },
}

const DEFAULT_COLOR = { dot: "bg-gray-400", label: "Other" }

export function DealMatrix({ deals, onSelectDeal }: DealMatrixProps) {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null)

  // Extract unique solution types and years
  const solutionTypes = [...new Set(deals.map((d) => d.solutionType))].sort()
  const years = [...new Set(deals.map((d) => d.dealYear))].sort()

  // Build a lookup: "solutionType|year" -> array of { deal, index }
  const cellMap = deals.reduce<Record<string, { deal: DealInfo; index: number }[]>>(
    (acc, deal, i) => {
      const key = `${deal.solutionType}|${deal.dealYear}`
      if (!acc[key]) acc[key] = []
      acc[key].push({ deal, index: i })
      return acc
    },
    {}
  )

  // Collect all unique deal types that appear for the legend
  const usedDealTypes = [...new Set(deals.map((d) => d.dealType))].sort()

  return (
    <div className="space-y-4">
      {/* Matrix */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="text-left text-xs font-semibold text-muted-foreground p-2 min-w-[160px] sticky left-0 bg-background z-10">
                Solution Type
              </th>
              {years.map((year) => (
                <th
                  key={year}
                  className="text-center text-xs font-semibold text-muted-foreground p-2 min-w-[72px]"
                >
                  {year}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {solutionTypes.map((st, ri) => (
              <tr
                key={st}
                className={ri % 2 === 0 ? "bg-muted/20" : ""}
              >
                <td className="text-xs font-medium p-2 sticky left-0 bg-inherit z-10">
                  {st}
                </td>
                {years.map((year) => {
                  const key = `${st}|${year}`
                  const cellDeals = cellMap[key] || []
                  const isHovered = hoveredCell === key

                  return (
                    <td
                      key={year}
                      className="text-center p-2 relative"
                    >
                      {cellDeals.length > 0 && (
                        <div className="flex items-center justify-center gap-1 flex-wrap">
                          {cellDeals.map(({ deal, index }, di) => {
                            const color =
                              DEAL_TYPE_COLORS[deal.dealType] || DEFAULT_COLOR

                            return (
                              <button
                                key={di}
                                onClick={() => onSelectDeal(index)}
                                onMouseEnter={() => setHoveredCell(key)}
                                onMouseLeave={() => setHoveredCell(null)}
                                className={`w-4 h-4 rounded-full ${color.dot} hover:ring-2 hover:ring-offset-1 hover:ring-brand-blue/50 transition-all cursor-pointer`}
                                aria-label={`${deal.partnerName} - ${deal.dealType}`}
                              />
                            )
                          })}
                        </div>
                      )}

                      {/* Tooltip popup */}
                      {isHovered && cellDeals.length > 0 && (
                        <div className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-popover border rounded-lg shadow-lg p-3 text-left pointer-events-none">
                          <div className="space-y-2">
                            {cellDeals.map(({ deal }, di) => (
                              <div key={di} className={di > 0 ? "pt-2 border-t" : ""}>
                                <div className="flex items-center gap-2 mb-1">
                                  {deal.partnerUrl && (
                                    <PartnerLogo
                                      domain={deal.partnerUrl}
                                      size={16}
                                    />
                                  )}
                                  <span className="text-xs font-semibold truncate">
                                    {deal.partnerName}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {deal.solution.map((s, si) => (
                                    <span
                                      key={si}
                                      className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                                    >
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* Tooltip arrow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-b border-r rotate-45 -mt-1" />
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap px-2 pt-2 border-t">
        <span className="text-xs font-semibold text-muted-foreground">Legend:</span>
        {usedDealTypes.map((dt) => {
          const color = DEAL_TYPE_COLORS[dt] || DEFAULT_COLOR
          return (
            <div key={dt} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full ${color.dot}`} />
              <span className="text-xs text-muted-foreground">{dt}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
