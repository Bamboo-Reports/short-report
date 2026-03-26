"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Handshake,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Globe,
  Calendar,
  Building2,
  Users,
  UserCheck,
  Lightbulb,
  FileText,
  Newspaper,
  Table2,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CheckCircle2 } from "lucide-react"
import { DealMagazine } from "./deal-view-magazine"
import type { DealInfo, AnalystNoteData } from "@/types/dashboard"

type DealLayout = "table" | "magazine"

const DEAL_TYPE_COLUMNS = ["Outsourced Deal", "Partnership", "In-House Deal", "Customer Deals"] as const

const LAYOUT_OPTIONS: { key: DealLayout; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "table", label: "Table View", icon: Table2 },
  { key: "magazine", label: "Magazine View", icon: Newspaper },
]

interface DealViewProps {
  deals: DealInfo[]
  analystNotes?: AnalystNoteData | null
}

interface DealGroup {
  solutionType: string
  deals: { deal: DealInfo; originalIndex: number }[]
}

function groupBySolutionType(deals: DealInfo[]): DealGroup[] {
  const groups: Map<string, { deal: DealInfo; originalIndex: number }[]> = new Map()
  deals.forEach((deal, index) => {
    const key = deal.solutionType || "Other"
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push({ deal, originalIndex: index })
  })
  return Array.from(groups.entries()).map(([solutionType, deals]) => ({
    solutionType,
    deals,
  }))
}

function PartnerLogo({ domain, size = 28 }: { domain: string; size?: number }) {
  const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "")
  return (
    <img
      src={`https://img.logo.dev/${cleanDomain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY}&size=64&format=png`}
      alt={`${cleanDomain} logo`}
      width={size}
      height={size}
      className="rounded-md object-contain flex-shrink-0"
      onError={(e) => {
        e.currentTarget.style.display = "none"
      }}
    />
  )
}

export function DealView({ deals, analystNotes }: DealViewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [layout, setLayout] = useState<DealLayout>("table")

  const groups = groupBySolutionType(deals)

  if (selectedIndex !== null) {
    return (
      <DealDetailView
        deal={deals[selectedIndex]}
        currentIndex={selectedIndex}
        total={deals.length}
        onBack={() => setSelectedIndex(null)}
        onPrev={() => setSelectedIndex(selectedIndex - 1)}
        onNext={() => setSelectedIndex(selectedIndex + 1)}
      />
    )
  }

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

      {/* Layout Switcher */}
      <div className="flex items-center gap-1 p-1 bg-muted/50 rounded-lg w-fit">
        {LAYOUT_OPTIONS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setLayout(key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              layout === key
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Deal Views */}
      {layout === "table" && (
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                <Handshake className="w-4 h-4 text-brand-blue" />
              </div>
              Global-Deals Map
              <Badge variant="outline" className="ml-2 text-xs border-border/60 text-muted-foreground font-normal">
                {deals.length} {deals.length === 1 ? "deal" : "deals"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30 hover:bg-muted/30">
                  <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground pl-6">Solution Type</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Year</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Partner Name</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Company Entity</TableHead>
                  <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Solution</TableHead>
                  {DEAL_TYPE_COLUMNS.map((col) => (
                    <TableHead key={col} className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-center">
                      {col.replace(" Deal", "").replace(" Deals", "")}
                    </TableHead>
                  ))}
                  <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-center pr-6">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups.map((group, groupIdx) =>
                  group.deals.map((item, rowIdx) => {
                    const isFirstInGroup = rowIdx === 0
                    const isLastInGroup = rowIdx === group.deals.length - 1
                    return (
                      <TableRow
                        key={item.originalIndex}
                        className={`group hover:bg-muted/20 transition-colors ${
                          isLastInGroup && groupIdx < groups.length - 1 ? "border-b-2 border-border" : ""
                        }`}
                      >
                        {isFirstInGroup && (
                          <TableCell className="pl-6 py-4 align-top font-medium text-sm text-foreground" rowSpan={group.deals.length}>
                            <span className="leading-snug">{group.solutionType}</span>
                          </TableCell>
                        )}
                        <TableCell className="py-4">
                          <span className="text-sm font-medium tabular-nums text-foreground">
                            {item.deal.dealYear}{item.deal.dealYearEnd ? `–${item.deal.dealYearEnd}` : ""}
                          </span>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center gap-2.5">
                            {item.deal.partnerUrl && <PartnerLogo domain={item.deal.partnerUrl} />}
                            <span className="text-sm font-medium text-foreground">{item.deal.partnerName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <span className="text-sm text-foreground">{item.deal.companyEntity}</span>
                        </TableCell>
                        <TableCell className="py-4">
                          <ul className="space-y-0.5">
                            {item.deal.solution.map((s, idx) => (
                              <li key={idx} className="flex items-start gap-1.5 text-sm text-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-[7px] flex-shrink-0" />
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </TableCell>
                        {DEAL_TYPE_COLUMNS.map((col) => (
                          <TableCell key={col} className="text-center py-4">
                            {item.deal.dealType === col && <CheckCircle2 className="w-5 h-5 text-brand-blue/70 mx-auto" />}
                          </TableCell>
                        ))}
                        <TableCell className="text-center pr-6 py-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-brand-blue hover:bg-brand-blue/10"
                            onClick={() => setSelectedIndex(item.originalIndex)}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      {layout === "magazine" && <DealMagazine deals={deals} onSelectDeal={setSelectedIndex} />}
    </div>
  )
}

function DealDetailView({
  deal,
  currentIndex,
  total,
  onBack,
  onPrev,
  onNext,
}: {
  deal: DealInfo
  currentIndex: number
  total: number
  onBack: () => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className="px-6 sm:px-8 py-6 space-y-6">
      {/* Back Button + Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3 text-muted-foreground hover:text-brand-blue hover:bg-brand-blue/10"
          onClick={onBack}
          aria-label="Back to all deals"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          All Deals
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground tabular-nums">
            {currentIndex + 1} of {total}
          </span>
          <div className="flex items-center gap-0.5">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onPrev}
              disabled={currentIndex === 0}
              aria-label="Previous deal"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onNext}
              disabled={currentIndex === total - 1}
              aria-label="Next deal"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Deal Header Card */}
      <Card className="border-border/60 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-brand-blue/8 to-brand-blue/3 border-b border-border/60 px-6 py-5">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              {deal.partnerUrl && (
                <div className="w-12 h-12 rounded-xl bg-white border border-border/60 flex items-center justify-center flex-shrink-0 p-1.5">
                  <PartnerLogo domain={deal.partnerUrl} size={36} />
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-foreground leading-tight">
                  {deal.partnerName}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">{deal.companyEntity}</p>
              </div>
            </div>
            {deal.url && (
              <a
                href={deal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-brand-blue hover:text-brand-blue/80 transition-colors group flex-shrink-0"
                data-pdf-link="true"
              >
                <Globe className="w-4 h-4" />
                <span>Source</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}
          </div>
        </div>
      </Card>

      {/* Facts Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <FactCard icon={Lightbulb} label="Solution Type" value={deal.solutionType} />
        <FactCard icon={Handshake} label="Deal Type" value={deal.dealType} />
        <FactCard
          icon={Calendar}
          label="Deal Year"
          value={deal.dealYearEnd ? `${deal.dealYear} – ${deal.dealYearEnd}` : deal.dealYear}
        />
        <FactCard icon={Globe} label="Country" value={deal.country} />
      </div>

      {/* Solutions */}
      {deal.solution.length > 0 && (
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                <Lightbulb className="w-4 h-4 text-brand-blue" />
              </div>
              Solutions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {deal.solution.map((s, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-sm px-3 py-1.5 border-brand-blue/30 text-brand-blue bg-brand-blue/5 font-medium"
                >
                  {s}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Deal Details */}
      {deal.dealDetails.length > 0 && (
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-brand-blue" />
              </div>
              Deal Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              {deal.dealDetails.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-[7px] flex-shrink-0" />
                  <p className="text-sm text-foreground/80 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Persons */}
      {(deal.companyKeyPersons.length > 0 || deal.partnerKeyPersons.length > 0) && (
        <div className={`grid gap-6 ${deal.companyKeyPersons.length > 0 && deal.partnerKeyPersons.length > 0 ? "lg:grid-cols-2" : "grid-cols-1"}`}>
          {deal.companyKeyPersons.length > 0 && (
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                  <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-brand-orange" />
                  </div>
                  Company Key Person(s)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  {deal.companyKeyPersons.map((person, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-[7px] flex-shrink-0" />
                      <p className="text-sm text-foreground/80 leading-relaxed">{person}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {deal.partnerKeyPersons.length > 0 && (
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                  <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                    <Users className="w-4 h-4 text-brand-orange" />
                  </div>
                  Partner Key Person(s)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2.5">
                  {deal.partnerKeyPersons.map((person, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-[7px] flex-shrink-0" />
                      <p className="text-sm text-foreground/80 leading-relaxed">{person}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

function FactCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl bg-card border border-border/60 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
      </div>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  )
}
