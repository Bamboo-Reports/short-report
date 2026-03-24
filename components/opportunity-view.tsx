"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Brain,
  BarChart3,
  Megaphone,
  Store,
  Cloud,
  HeadsetIcon,
  Lightbulb,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import type { OpportunityInfo } from "@/types/dashboard"

const OPPORTUNITY_ICONS = [Brain, BarChart3, Megaphone, Store, Cloud, HeadsetIcon]

const OPPORTUNITY_COLORS = [
  { bg: "bg-brand-blue/10", text: "text-brand-blue", accent: "#017ABF" },
  { bg: "bg-brand-orange/10", text: "text-brand-orange", accent: "#F17C1D" },
  { bg: "bg-[#015a8f]/10", text: "text-[#015a8f]", accent: "#015a8f" },
  { bg: "bg-[#FFAE71]/15", text: "text-[#d35400]", accent: "#d35400" },
  { bg: "bg-[#6EC4EA]/15", text: "text-[#0396a6]", accent: "#0396a6" },
  { bg: "bg-[#e8913a]/10", text: "text-[#e8913a]", accent: "#e8913a" },
]

interface OpportunityViewProps {
  opportunities: OpportunityInfo[]
}

export function OpportunityView({ opportunities }: OpportunityViewProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <div className="px-6 sm:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-brand-orange/10 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-brand-orange" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-foreground">Opportunity Map</h2>
          <p className="text-xs text-muted-foreground">{opportunities.length} strategic opportunities identified</p>
        </div>
      </div>

      {/* Opportunity Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {opportunities.map((opp, idx) => {
          const Icon = OPPORTUNITY_ICONS[idx % OPPORTUNITY_ICONS.length]
          const color = OPPORTUNITY_COLORS[idx % OPPORTUNITY_COLORS.length]
          const isExpanded = expandedIndex === idx

          return (
            <Card
              key={idx}
              className={`border-border/60 shadow-sm overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md ${
                isExpanded ? "sm:col-span-2 lg:col-span-3" : ""
              }`}
              onClick={() => setExpandedIndex(isExpanded ? null : idx)}
            >
              <div className="h-1" style={{ backgroundColor: color.accent }} />
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  {/* Number + Icon */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className={`w-11 h-11 rounded-xl ${color.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${color.text}`} />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-foreground leading-snug">
                        {opp.opportunity}
                      </h3>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                      )}
                    </div>

                    {/* Preview - always show first line truncated when collapsed */}
                    {!isExpanded && opp.details.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                        {opp.details[0]}
                      </p>
                    )}

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="mt-3 space-y-2.5">
                        {opp.details.map((detail, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5">
                            <div
                              className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0"
                              style={{ backgroundColor: color.accent }}
                            />
                            <p className="text-sm text-foreground/80 leading-relaxed">{detail}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
