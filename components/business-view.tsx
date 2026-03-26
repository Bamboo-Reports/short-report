"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Building2,
  Briefcase,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Monitor,
  Lock,
  TrendingUp,
  Crown,
  Shield,
  Swords,
  Banknote,
  BarChart3,
  FileText,
} from "lucide-react"
import type { BusinessInfo, AnalystNoteData } from "@/types/dashboard"
import { RevenueChart } from "./revenue-chart"

interface BusinessViewProps {
  businessInfo: BusinessInfo
  analystNotes?: AnalystNoteData | null
}

export function BusinessView({ businessInfo, analystNotes }: BusinessViewProps) {
  return (
    <div className="px-6 sm:px-8 py-6">
      <div className="space-y-6">
        {/* Company Overview Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <MetricCard
            icon={<Building2 className="w-5 h-5" />}
            label="Company"
            value={businessInfo.name}
            accent="blue"
          />
          <MetricCard
            icon={<Shield className="w-5 h-5" />}
            label="Industry"
            value={businessInfo.industry}
            accent="blue"
          />
          <MetricCard
            icon={<Briefcase className="w-5 h-5" />}
            label="Company Type"
            value={businessInfo.companyType}
            accent="orange"
          />
          <MetricCard
            icon={<Users className="w-5 h-5" />}
            label="Employees"
            value={businessInfo.employees}
            accent="blue"
          />
          <MetricCard
            icon={<Calendar className="w-5 h-5" />}
            label="Founded"
            value={businessInfo.incYear}
            accent="orange"
          />
          <MetricCard
            icon={<MapPin className="w-5 h-5" />}
            label="Headquarters"
            value={businessInfo.headquarters}
            accent="orange"
          />
        </div>

        {/* Row 1: Financials + Financial Performance Chart */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Financials Block */}
          <Card className="border-border/60 shadow-sm flex flex-col">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                  <Banknote className="w-4 h-4 text-brand-orange" />
                </div>
                Financial Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="grid grid-cols-2 gap-3 flex-1">
                <FinancialMetric
                  label="Revenue"
                  value={businessInfo.financials.revenue}
                  icon={<DollarSign className="w-4 h-4" />}
                  trend="up"
                />
                <FinancialMetric
                  label="Net Income"
                  value={businessInfo.financials.netIncome}
                  icon={<TrendingUp className="w-4 h-4" />}
                  trend="up"
                />
                <FinancialMetric
                  label="Market Cap"
                  value={businessInfo.financials.marketCap}
                  icon={<BarChart3 className="w-4 h-4" />}
                />
                <FinancialMetric
                  label="Stock Price"
                  value={businessInfo.financials.stockPrice}
                  icon={<Monitor className="w-4 h-4" />}
                />
              </div>
            </CardContent>
          </Card>

          {/* Financial Performance Chart */}
          <RevenueChart ticker={businessInfo.stockTicker} />
        </div>

        {/* Analyst Notes */}
        {analystNotes && analystNotes.notes.length > 0 && (
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-brand-orange" />
                </div>
                Analyst Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5">
                {analystNotes.notes.map((note, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px] ${
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

        {/* About */}
        <Card className="border-border/60 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-brand-blue" />
              </div>
              About
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground/80 leading-relaxed">{businessInfo.about}</p>
          </CardContent>
        </Card>

        {/* Row 3: Key Executives + Core Services + Competitors */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Key Executives */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                  <Crown className="w-4 h-4 text-brand-blue" />
                </div>
                Key Executives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {businessInfo.executives.map((exec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue group-hover:bg-brand-orange transition-colors flex-shrink-0 mt-[7px]" />
                    <span className="text-sm text-foreground/80">{exec.name} – {exec.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Core Services */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-brand-orange" />
                </div>
                Core Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {businessInfo.services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/60 transition-colors group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue group-hover:bg-brand-orange transition-colors flex-shrink-0 mt-[7px]" />
                    <span className="text-sm text-foreground/80">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Competitors */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                  <Swords className="w-4 h-4 text-brand-blue" />
                </div>
                Key Competitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {businessInfo.competitors.map((comp, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue group-hover:bg-brand-orange transition-colors flex-shrink-0 mt-[7px]" />
                    <span className="text-sm text-foreground/80">{comp.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode
  label: string
  value: string
  accent: "blue" | "orange"
}) {
  return (
    <div className="bg-card rounded-xl border border-border/60 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
          accent === "blue" ? "bg-brand-blue/10 text-brand-blue" : "bg-brand-orange/10 text-brand-orange"
        }`}>
          {icon}
        </div>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-lg text-foreground tracking-tight">
        {value}
      </p>
    </div>
  )
}

function FinancialMetric({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: React.ReactNode
  trend?: "up" | "down"
}) {
  return (
    <div className="rounded-xl bg-muted/40 border border-border/40 p-3.5 flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-brand-blue/60">{icon}</span>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-3xl font-semibold text-foreground tabular-nums leading-tight">{value}</p>
    </div>
  )
}