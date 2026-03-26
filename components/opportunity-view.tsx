"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Brain,
  BarChart3,
  Megaphone,
  Store,
  Cloud,
  HeadsetIcon,
  Lightbulb,
  FileText,
} from "lucide-react"
import type { OpportunityInfo, AnalystNoteData } from "@/types/dashboard"

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
  analystNotes?: AnalystNoteData | null
}

// First 2 get large (span 2 cols), rest get 1 col each
function getBentoSpan(idx: number, total: number): string {
  if (total <= 2) return "lg:col-span-1"
  if (idx < 2) return "lg:col-span-2"
  return "lg:col-span-1"
}

export function OpportunityView({ opportunities, analystNotes }: OpportunityViewProps) {
  return (
    <div className="px-6 sm:px-8 py-6 space-y-6">
      {/* Analyst Overview */}
      {analystNotes && analystNotes.notes.length > 0 && (
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
            <div className="space-y-2.5">
              {analystNotes.notes.map((note, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0 ${
                      idx % 2 === 0 ? "bg-brand-blue" : "bg-brand-orange"
                    }`}
                  />
                  <p className="text-sm text-foreground/80 leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bento Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {opportunities.map((opp, idx) => {
          const Icon = OPPORTUNITY_ICONS[idx % OPPORTUNITY_ICONS.length]
          const color = OPPORTUNITY_COLORS[idx % OPPORTUNITY_COLORS.length]
          const span = getBentoSpan(idx, opportunities.length)

          return (
            <Card
              key={idx}
              className={`border-border/60 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 ${span}`}
            >
              <div className="h-1" style={{ backgroundColor: color.accent }} />
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl ${color.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${color.text}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground leading-snug">
                      {opp.opportunity}
                    </h3>

                    {opp.details.length > 0 && (
                      <div className="mt-3 space-y-2">
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
