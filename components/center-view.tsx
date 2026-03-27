"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Building2,
  Users,
  Phone,
  MapPin,
  Globe,
  Cpu,
  Eye,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Calendar,
  FileText,
  Landmark,
} from "lucide-react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import type { CenterInfo, AnalystNoteData } from "@/types/dashboard"

interface CenterViewProps {
  centers: CenterInfo[]
  analystNotes?: AnalystNoteData | null
}

export function CenterView({ centers, analystNotes }: CenterViewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const analytics = useMemo(() => {
    const totalHeadcount = centers.reduce(
      (sum, c) => sum + (parseInt(c.employeeCount.replace(/[^0-9]/g, ""), 10) || 0),
      0
    )
    const uniqueCities = [...new Set(centers.map((c) => c.location))]
    const uniqueTypes = [...new Set(centers.map((c) => c.centerType))]

    const oldest = centers.reduce((prev, curr) => {
      const prevYear = parseInt(prev.incYear, 10) || 9999
      const currYear = parseInt(curr.incYear, 10) || 9999
      return currYear < prevYear ? curr : prev
    }, centers[0])

    const largest = centers.reduce((prev, curr) => {
      const prevCount = parseInt(prev.employeeCount.replace(/[^0-9]/g, ""), 10) || 0
      const currCount = parseInt(curr.employeeCount.replace(/[^0-9]/g, ""), 10) || 0
      return currCount > prevCount ? curr : prev
    }, centers[0])

    const typeCounts: Record<string, number> = {}
    centers.forEach((c) => {
      typeCounts[c.centerType] = (typeCounts[c.centerType] || 0) + 1
    })
    const dominantType = Object.entries(typeCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"

    return { totalHeadcount, uniqueCities, uniqueTypes, oldest, largest, dominantType }
  }, [centers])

  if (selectedIndex !== null) {
    return (
      <CenterDetailView
        center={centers[selectedIndex]}
        currentIndex={selectedIndex}
        total={centers.length}
        onBack={() => setSelectedIndex(null)}
        onPrev={() => setSelectedIndex(selectedIndex - 1)}
        onNext={() => setSelectedIndex(selectedIndex + 1)}
      />
    )
  }

  return (
    <div className="px-6 sm:px-8 py-6 animate-fade-in-up">
      <div className="space-y-6">
        {/* Summary Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
          <MetricCard
            icon={<Building2 className="w-5 h-5" />}
            label="Total Centers"
            value={String(centers.length)}
            accent="blue"
          />
          <MetricCard
            icon={<Users className="w-5 h-5" />}
            label="Total Headcount"
            value={analytics.totalHeadcount.toLocaleString()}
            accent="orange"
          />
          <MetricCard
            icon={<MapPin className="w-5 h-5" />}
            label="Locations"
            value={analytics.uniqueCities.join(", ")}
            accent="blue"
          />
          <MetricCard
            icon={<Landmark className="w-5 h-5" />}
            label="Center Types"
            value={analytics.uniqueTypes.join(", ")}
            accent="orange"
          />
        </div>

        {/* Analyst Narrative */}
        {analystNotes && analystNotes.notes.length > 0 && (
          <Card className="border-border/60 shadow-sm card-accent-orange">
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

        {/* Center Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 stagger-children">
          {centers.map((center, index) => (
            <Card
              key={index}
              className="border-border/60 shadow-executive hover:shadow-executive-md transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="h-0.5 bg-gradient-to-r from-brand-blue/60 to-transparent" />
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {center.domain ? (
                      <LogoWithSkeleton domain={center.domain} name={center.accountName} size={40} />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-5 h-5 text-brand-blue" />
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base font-semibold text-foreground leading-tight">
                          {center.location}
                        </CardTitle>
                        <Badge
                          className={`text-[11px] font-medium border-0 ${
                            center.centerType === "GBS"
                              ? "bg-brand-orange/10 text-brand-orange"
                              : "bg-brand-blue/10 text-brand-blue"
                          }`}
                        >
                          {center.centerType}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{center.legalName}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-lg bg-muted/40 border border-border/40 p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        Established
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground tabular-nums">{center.incYear}</p>
                  </div>
                  <div className="rounded-lg bg-muted/40 border border-border/40 p-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Users className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        Employees
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground tabular-nums">{center.employeeCount}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {center.focusRegions.map((region, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="text-[11px] px-2 py-0.5 border-brand-blue-light/40 text-brand-blue bg-brand-blue/5"
                      >
                        {region}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-xs text-muted-foreground hover:text-brand-blue hover:bg-brand-blue/10 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedIndex(index)
                    }}
                    aria-label={`View details for ${center.location} center`}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1.5" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
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
    <div className={`bg-card rounded-xl border border-border/60 p-4 shadow-executive hover:shadow-executive-md transition-all duration-300 border-l-[3px] ${
      accent === "blue" ? "border-l-brand-blue" : "border-l-brand-orange"
    }`}>
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
            accent === "blue" ? "bg-brand-blue/10 text-brand-blue" : "bg-brand-orange/10 text-brand-orange"
          }`}
        >
          {icon}
        </div>
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-lg text-foreground tracking-tight">{value}</p>
    </div>
  )
}

function CenterDetailView({
  center,
  currentIndex,
  total,
  onBack,
  onPrev,
  onNext,
}: {
  center: CenterInfo
  currentIndex: number
  total: number
  onBack: () => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className="px-6 sm:px-8 py-6 space-y-6 animate-slide-in-right">
      {/* Back Button + Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3 text-muted-foreground hover:text-brand-blue hover:bg-brand-blue/10"
          onClick={onBack}
          aria-label="Back to all centers"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          All Centers
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
              aria-label="Previous center"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onNext}
              disabled={currentIndex === total - 1}
              aria-label="Next center"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Center Header Card */}
      <Card className="border-border/60 shadow-executive overflow-hidden">
        <div className="bg-gradient-to-r from-brand-blue/10 via-brand-blue/5 to-transparent border-b border-border/60 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {center.domain ? (
                <LogoWithSkeleton domain={center.domain} name={center.accountName} size={48} />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-brand-blue" />
                </div>
              )}
              <div>
                <h2 className="text-xl font-semibold text-foreground leading-tight">{center.legalName}</h2>
                <p className="text-sm text-muted-foreground mt-1">{center.accountName}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Facts Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <FactCard label="Location" value={center.location + ", India"} />
        <FactCard label="Center Type" value={center.centerType} />
        <FactCard label="Established" value={center.incYear} />
        <FactCard label="Employees" value={center.employeeCount} />
      </div>

      {/* Services */}
      <Card className="border-border/60 shadow-executive">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
            <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-brand-blue" />
            </div>
            Services & Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(center.services).map(([category, serviceList], idx) => (
              <ServiceCategory
                key={idx}
                title={category}
                items={serviceList}
                variant="service"
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tech Stack */}
      <Card className="border-border/60 shadow-executive">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
            <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
              <Cpu className="w-4 h-4 text-brand-orange" />
            </div>
            Technology Stack
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {center.techStack.map((tech, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="text-sm px-3 py-1.5 border-brand-orange/30 text-brand-orange bg-brand-orange/5 font-medium hover:bg-brand-orange/10 transition-colors duration-200"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FactCard({
  label,
  value,
  children,
}: {
  label: string
  value?: string
  children?: React.ReactNode
}) {
  return (
    <div className="rounded-xl bg-card border border-border/60 p-4 shadow-executive hover:shadow-executive-md transition-all duration-300">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">{label}</p>
      {children || <p className="text-sm font-medium text-foreground">{value}</p>}
    </div>
  )
}

function ServiceCategory({
  title,
  items,
  variant,
}: {
  title: string
  items: string[]
  variant: "service" | "tech"
}) {
  const isTech = variant === "tech"
  return (
    <div className={`rounded-xl p-4 shadow-executive ${
      isTech
        ? "bg-brand-orange/5 border border-brand-orange/20"
        : "bg-muted/50 border border-border/40"
    }`}>
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/40">
        {isTech && <Cpu className="w-3.5 h-3.5 text-brand-orange" />}
        <h4 className={`text-sm font-medium ${isTech ? "text-brand-orange" : "text-foreground"}`}>
          {title}
        </h4>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
            <div className={`w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0 ${
              isTech ? "bg-brand-orange" : "bg-brand-blue"
            }`} />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function LogoWithSkeleton({ domain, name, size }: { domain: string; name: string; size: number }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="relative rounded-xl overflow-hidden flex-shrink-0" style={{ width: size, height: size }}>
      {!loaded && <Skeleton className="absolute inset-0 rounded-xl" />}
      <Image
        src={`https://img.logo.dev/${domain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY}`}
        alt={`${name} logo`}
        width={size}
        height={size}
        className={`object-contain w-full h-full transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}
