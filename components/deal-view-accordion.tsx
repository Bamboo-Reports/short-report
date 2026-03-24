"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DealInfo } from "@/types/dashboard"
import { ChevronDown } from "lucide-react"

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

interface DealAccordionProps {
  deals: DealInfo[]
  onSelectDeal: (index: number) => void
}

export function DealAccordion({ deals, onSelectDeal }: DealAccordionProps) {
  // Group deals by solution type
  const grouped = deals.reduce<Record<string, { deal: DealInfo; index: number }[]>>((acc, deal, i) => {
    const type = deal.solutionType || "Other"
    if (!acc[type]) acc[type] = []
    acc[type].push({ deal, index: i })
    return acc
  }, {})

  const solutionTypes = Object.keys(grouped).sort()

  // First group open by default
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(solutionTypes.length > 0 ? [solutionTypes[0]] : [])
  )

  const toggleSection = (type: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(type)) {
        next.delete(type)
      } else {
        next.add(type)
      }
      return next
    })
  }

  return (
    <div className="space-y-2">
      {solutionTypes.map((type) => {
        const sectionDeals = grouped[type]
        const isOpen = openSections.has(type)

        return (
          <div
            key={type}
            className="rounded-lg border overflow-hidden"
          >
            {/* Accordion header */}
            <button
              onClick={() => toggleSection(type)}
              className="w-full flex items-center justify-between px-4 py-3 bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm">{type}</span>
                <Badge variant="secondary" className="text-[10px]">
                  {sectionDeals.length} deal{sectionDeals.length !== 1 ? "s" : ""}
                </Badge>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Accordion content with smooth transition */}
            <div
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {sectionDeals.map(({ deal, index }) => (
                    <Card
                      key={index}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => onSelectDeal(index)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2.5 mb-3">
                          {deal.partnerUrl && (
                            <PartnerLogo domain={deal.partnerUrl} />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {deal.partnerName}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              {deal.dealYear}
                              {deal.dealYearEnd && deal.dealYearEnd !== deal.dealYear
                                ? `–${deal.dealYearEnd}`
                                : ""}
                            </p>
                          </div>
                        </div>

                        <Badge
                          className={
                            deal.dealType === "Outsourced"
                              ? "bg-brand-orange/10 text-brand-orange border-brand-orange/20 mb-2"
                              : "bg-brand-blue/10 text-brand-blue border-brand-blue/20 mb-2"
                          }
                        >
                          {deal.dealType}
                        </Badge>

                        <div className="flex flex-wrap gap-1 mt-1">
                          {deal.solution.map((s, si) => (
                            <span
                              key={si}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
