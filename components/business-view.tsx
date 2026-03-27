"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
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
import Image from "next/image"

interface BusinessViewProps {
  businessInfo: BusinessInfo
  analystNotes?: AnalystNoteData | null
}

export function BusinessView({ businessInfo, analystNotes }: BusinessViewProps) {
  return (
    <div className="px-6 sm:px-8 py-6 animate-fade-in-up">
      <div className="space-y-6">

        {/* ── Company Identity Banner ──────────────────────── */}
        <div className="relative rounded-2xl overflow-hidden border border-border/40 shadow-executive-lg">
          {/* Gradient background */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #017ABF08 0%, #017ABF03 40%, #F17C1D05 100%)",
            }}
          />
          <div className="relative px-6 sm:px-8 py-6 sm:py-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-5">
              <IdentityItem icon={Building2} label="Company" value={businessInfo.name} accent="blue" logoUrl={businessInfo.socialLinks.website} />
              <IdentityItem icon={Shield} label="Industry" value={businessInfo.industry} accent="blue" />
              <IdentityItem icon={Briefcase} label="Type" value={businessInfo.companyType} accent="orange" />
              <IdentityItem icon={Users} label="Employees" value={businessInfo.employees} accent="blue" />
              <IdentityItem icon={Calendar} label="Founded" value={businessInfo.incYear} accent="orange" />
              <IdentityItem icon={MapPin} label="Headquarters" value={businessInfo.headquarters} accent="orange" />
            </div>
          </div>
        </div>

        {/* ── Financial Highlights + Performance Chart ──────── */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Financials — 2-column KPI grid */}
          <Card className="lg:col-span-2 border-border/60 shadow-executive hover:shadow-executive-md transition-all duration-300 flex flex-col">
            <div className="h-0.5 bg-gradient-to-r from-brand-orange via-brand-orange-light to-transparent" />
            <CardHeader className="pb-4 border-b border-border/20">
              <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                  <Banknote className="w-4 h-4 text-brand-orange" />
                </div>
                Financial Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col pt-5">
              <div className="grid grid-cols-2 gap-3 flex-1">
                <FinancialMetric
                  label="Revenue"
                  value={businessInfo.financials.revenue}
                  icon={<DollarSign className="w-4 h-4" />}
                />
                <FinancialMetric
                  label="Net Income"
                  value={businessInfo.financials.netIncome}
                  icon={<TrendingUp className="w-4 h-4" />}
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
          <div className="lg:col-span-3">
            <RevenueChart ticker={businessInfo.stockTicker} />
          </div>
        </div>

        {/* ── Analyst Notes ────────────────────────────────── */}
        {analystNotes && analystNotes.notes.length > 0 && (
          <Card className="border-border/60 shadow-executive card-accent-orange">
            <CardHeader className="pb-4 border-b border-border/20">
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

        {/* ── About ────────────────────────────────────────── */}
        <Card className="border-border/60 shadow-executive card-accent-blue">
          <CardHeader className="pb-4 border-b border-border/20">
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

        {/* ── Key Executives + Core Services + Competitors ── */}
        <div className="grid lg:grid-cols-3 gap-6 stagger-children">
          {/* Key Executives */}
          <Card className="border-border/60 shadow-executive hover:shadow-executive-md transition-all duration-300">
            <div className="h-0.5 bg-gradient-to-r from-brand-blue to-brand-blue-light/50" />
            <CardHeader className="pb-3 border-b border-border/20">
              <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                  <Crown className="w-4 h-4 text-brand-blue" />
                </div>
                Key Executives
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-0.5">
                {businessInfo.executives.map((exec, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/40 transition-all duration-200 group"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-blue to-brand-blue-light flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-semibold text-white">
                        {exec.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground/90 font-medium truncate">{exec.name}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{exec.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Core Services */}
          <Card className="border-border/60 shadow-executive hover:shadow-executive-md transition-all duration-300">
            <div className="h-0.5 bg-gradient-to-r from-brand-orange to-brand-orange-light/50" />
            <CardHeader className="pb-3 border-b border-border/20">
              <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-brand-orange" />
                </div>
                Core Services
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-0.5">
                {businessInfo.services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/40 transition-all duration-200 group"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px] ${
                      index % 2 === 0 ? "bg-brand-orange" : "bg-brand-orange-light"
                    }`} />
                    <span className="text-sm text-foreground/80 leading-relaxed">{service}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Competitors */}
          <Card className="border-border/60 shadow-executive hover:shadow-executive-md transition-all duration-300">
            <div className="h-0.5 bg-gradient-to-r from-brand-blue via-brand-blue-light to-transparent" />
            <CardHeader className="pb-3 border-b border-border/20">
              <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                  <Swords className="w-4 h-4 text-brand-blue" />
                </div>
                Key Competitors
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-0.5">
                {businessInfo.competitors.map((comp, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/40 transition-all duration-200 group"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[7px] ${
                      index % 2 === 0 ? "bg-brand-blue" : "bg-brand-blue-light"
                    }`} />
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

/* ── Sub-components ──────────────────────────────────────────── */

function IdentityItem({
  icon: Icon,
  label,
  value,
  accent,
  logoUrl,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  accent: "blue" | "orange"
  logoUrl?: string
}) {
  const domain = logoUrl
    ? new URL(logoUrl.startsWith("http") ? logoUrl : `https://${logoUrl}`).hostname
    : null
  const [logoLoaded, setLogoLoaded] = useState(false)

  return (
    <div className="flex items-start gap-3">
      {domain ? (
        <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
          {!logoLoaded && <Skeleton className="absolute inset-0 rounded-xl" />}
          <Image
            src={`https://img.logo.dev/${domain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY}`}
            alt={`${value} logo`}
            width={40}
            height={40}
            className={`object-contain w-full h-full transition-opacity duration-300 ${logoLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLogoLoaded(true)}
          />
        </div>
      ) : (
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
          accent === "blue" ? "bg-brand-blue/10 text-brand-blue" : "bg-brand-orange/10 text-brand-orange"
        }`}>
          <Icon className="w-4.5 h-4.5" />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider leading-none mb-1.5">{label}</p>
        <p className="text-sm font-medium text-foreground leading-snug">{value}</p>
      </div>
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
    <div className="rounded-xl bg-gradient-to-br from-muted/50 to-muted/15 border border-border/30 p-3.5 flex flex-col justify-between h-full hover:border-border/50 transition-colors duration-200">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-brand-blue/50">{icon}</span>
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl sm:text-3xl font-semibold text-foreground tabular-nums leading-tight">{value}</p>
    </div>
  )
}
