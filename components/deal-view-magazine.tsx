"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { DealInfo } from "@/types/dashboard"
import { ArrowRight, MapPin, Briefcase, Layers, Calendar } from "lucide-react"

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

interface DealMagazineProps {
  deals: DealInfo[]
  onSelectDeal: (index: number) => void
}

export function DealMagazine({ deals, onSelectDeal }: DealMagazineProps) {
  return (
    <div className="space-y-5">
      {deals.map((deal, index) => {
        const isAlternate = index % 2 === 1

        return (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div
                className={`flex flex-col md:flex-row ${
                  isAlternate ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Main content — wider side */}
                <div className="flex-[65] p-5 md:p-6">
                  <h3 className="text-lg font-bold mb-2 text-foreground">
                    {deal.partnerName}
                  </h3>

                  {deal.dealDetails.length > 0 && (
                    <div className="text-sm text-muted-foreground leading-relaxed mb-4 space-y-1.5">
                      {deal.dealDetails.slice(0, 2).map((detail, di) => (
                        <p key={di}>{detail}</p>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {deal.solution.map((s, si) => (
                      <Badge
                        key={si}
                        variant="outline"
                        className="text-xs"
                      >
                        {s}
                      </Badge>
                    ))}
                  </div>

                  <button
                    onClick={() => onSelectDeal(index)}
                    className="text-sm text-brand-blue hover:text-brand-blue/80 font-medium inline-flex items-center gap-1.5 transition-colors"
                  >
                    Read More <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Sidebar — narrower side */}
                <div
                  className={`flex-[35] bg-muted/30 p-5 md:p-6 border-t md:border-t-0 ${
                    isAlternate ? "md:border-r" : "md:border-l"
                  }`}
                >
                  {deal.partnerUrl && (
                    <div className="mb-4">
                      <PartnerLogo domain={deal.partnerUrl} size={40} />
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                          Year
                        </p>
                        <p className="text-sm font-medium">
                          {deal.dealYear}
                          {deal.dealYearEnd && deal.dealYearEnd !== deal.dealYear
                            ? `–${deal.dealYearEnd}`
                            : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Briefcase className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                          Deal Type
                        </p>
                        <Badge
                          className={
                            deal.dealType === "Outsourced"
                              ? "bg-brand-orange text-white border-transparent mt-0.5"
                              : "bg-brand-blue text-white border-transparent mt-0.5"
                          }
                        >
                          {deal.dealType}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Layers className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                          Solution Type
                        </p>
                        <p className="text-sm font-medium">{deal.solutionType}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">
                          Country
                        </p>
                        <p className="text-sm font-medium">{deal.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
