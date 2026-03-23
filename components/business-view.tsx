"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Monitor,
  Lock,
  TrendingUp,
  Crown,
  Swords,
  Banknote,
  BarChart3,
} from "lucide-react"
import type { BusinessInfo } from "@/types/dashboard"
import { RevenueChart } from "./revenue-chart"

interface BusinessViewProps {
  businessInfo: BusinessInfo
}

export function BusinessView({ businessInfo }: BusinessViewProps) {
  return (
    <div className="px-6 sm:px-8 py-6">
      <div className="space-y-6">
        {/* Company Overview Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            icon={<Building2 className="w-5 h-5" />}
            label="Company"
            value={businessInfo.name}
            accent="blue"
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

        {/* Row 1: Financials + Key Executives */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Financials Block */}
          <Card className="lg:col-span-2 border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                  <Banknote className="w-4 h-4 text-brand-orange" />
                </div>
                Financial Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
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
                  ticker={businessInfo.stockTicker}
                />
              </div>
            </CardContent>
          </Card>

          {/* Key Executives */}
          <Card className="lg:col-span-3 border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                  <Crown className="w-4 h-4 text-brand-blue" />
                </div>
                Key Executives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-0.5">
                {businessInfo.executives.map((exec, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        index === 0
                          ? "bg-gradient-to-br from-brand-orange to-brand-orange-light"
                          : "bg-gradient-to-br from-brand-blue to-brand-blue-light"
                      }`}>
                        {exec.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{exec.name}</p>
                        <p className="text-xs text-muted-foreground">{exec.title}</p>
                      </div>
                    </div>
                    {exec.since && (
                      <Badge variant="outline" className="text-[10px] border-border/60 text-muted-foreground">
                        Since {exec.since}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 2: Company Profile + Core Services + Competitors */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Company Profile */}
          <Card className="border-border/60 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-brand-blue" />
                </div>
                Company Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoField label="Company Type">
                <Badge
                  variant="outline"
                  className="text-xs font-medium border-brand-blue/30 text-brand-blue bg-brand-blue/5"
                >
                  {businessInfo.companyType}
                </Badge>
              </InfoField>
              <InfoField label="Industry">
                <Badge className="text-xs font-medium bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/15 border-0">
                  {businessInfo.industry}
                </Badge>
              </InfoField>
              <InfoField label="Stock Ticker">
                <span className="text-sm font-mono font-bold text-brand-blue">{businessInfo.stockTicker}</span>
              </InfoField>
              <div className="pt-3 border-t border-border/60">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">About</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{businessInfo.about}</p>
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
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/60 transition-colors group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-blue group-hover:bg-brand-orange transition-colors flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground/80">{service}</span>
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
              <div className="space-y-0.5">
                {businessInfo.competitors.map((comp, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-foreground">{comp.name}</p>
                      <p className="text-xs text-muted-foreground">{comp.industry}</p>
                    </div>
                    {comp.marketCap && (
                      <span className="text-xs font-mono font-semibold text-muted-foreground tabular-nums">
                        {comp.marketCap}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 3: Financial Performance Chart */}
        <RevenueChart ticker={businessInfo.stockTicker} />
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
      <p className="text-lg font-bold text-foreground tracking-tight truncate" title={value}>
        {value}
      </p>
    </div>
  )
}

function FinancialMetric({
  label,
  value,
  icon,
  trend,
  ticker,
}: {
  label: string
  value: string
  icon: React.ReactNode
  trend?: "up" | "down"
  ticker?: string
}) {
  return (
    <div className="rounded-xl bg-muted/40 border border-border/40 p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-brand-blue/60">{icon}</span>
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-xl font-bold text-foreground tabular-nums">{value}</p>
      {ticker && (
        <p className="text-[10px] font-mono text-muted-foreground mt-1">NASDAQ: {ticker}</p>
      )}
    </div>
  )
}

function InfoField({
  label,
  value,
  children,
}: {
  label: string
  value?: string
  children?: React.ReactNode
}) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">{label}</p>
      {children || <p className="text-sm font-medium text-foreground">{value}</p>}
    </div>
  )
}
