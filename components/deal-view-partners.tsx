"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import type { DealInfo } from "@/types/dashboard"
import { ArrowRight } from "lucide-react"

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

interface DealPartnersProps {
  deals: DealInfo[]
  onSelectDeal: (index: number) => void
}

export function DealPartners({ deals, onSelectDeal }: DealPartnersProps) {
  // Group deals by partner name
  const grouped = deals.reduce<Record<string, { deal: DealInfo; index: number }[]>>((acc, deal, i) => {
    const name = deal.partnerName || "Unknown Partner"
    if (!acc[name]) acc[name] = []
    acc[name].push({ deal, index: i })
    return acc
  }, {})

  const partnerNames = Object.keys(grouped).sort()

  return (
    <div className="space-y-4">
      {partnerNames.map((name) => {
        const partnerDeals = grouped[name]
        const firstDeal = partnerDeals[0].deal

        return (
          <Card key={name} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                {firstDeal.partnerUrl && (
                  <PartnerLogo domain={firstDeal.partnerUrl} size={48} />
                )}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <CardTitle className="text-base truncate">{name}</CardTitle>
                  <Badge
                    variant="secondary"
                    className="flex-shrink-0"
                  >
                    {partnerDeals.length} deal{partnerDeals.length !== 1 ? "s" : ""}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="divide-y">
                {partnerDeals.map(({ deal, index }) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                  >
                    <span className="text-xs text-muted-foreground font-mono w-20 flex-shrink-0">
                      {deal.dealYear}
                      {deal.dealYearEnd && deal.dealYearEnd !== deal.dealYear
                        ? `–${deal.dealYearEnd}`
                        : ""}
                    </span>

                    <Badge
                      className="bg-brand-blue/10 text-brand-blue border-brand-blue/20 flex-shrink-0"
                    >
                      {deal.solutionType}
                    </Badge>

                    <Badge
                      className={
                        deal.dealType === "Outsourced"
                          ? "bg-brand-orange/10 text-brand-orange border-brand-orange/20 flex-shrink-0"
                          : "bg-brand-blue/10 text-brand-blue border-brand-blue/20 flex-shrink-0"
                      }
                    >
                      {deal.dealType}
                    </Badge>

                    <span className="text-xs text-muted-foreground truncate flex-1">
                      {deal.solution.join(", ")}
                    </span>

                    <button
                      onClick={() => onSelectDeal(index)}
                      className="text-xs text-brand-blue hover:text-brand-blue/80 font-medium inline-flex items-center gap-1 flex-shrink-0 transition-colors"
                    >
                      Details <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
