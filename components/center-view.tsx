"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Building2, Users, Phone, MapPin, Globe, Cpu, Eye, ArrowLeft } from "lucide-react"
import type { CenterInfo } from "@/types/dashboard"

interface CenterViewProps {
  centers: CenterInfo[]
}

export function CenterView({ centers }: CenterViewProps) {
  const [selectedCenter, setSelectedCenter] = useState<CenterInfo | null>(null)

  if (selectedCenter) {
    return (
      <CenterDetailView
        center={selectedCenter}
        onBack={() => setSelectedCenter(null)}
      />
    )
  }

  return (
    <div className="px-6 sm:px-8 py-6">
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
            <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-brand-blue" />
            </div>
            India Centers
            <Badge variant="outline" className="ml-2 text-xs border-border/60 text-muted-foreground font-normal">
              {centers.length} {centers.length === 1 ? "center" : "centers"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground pl-6">
                  Legal Name
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Location
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Type
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Est.
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-right">
                  Employees
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Focus Regions
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-center pr-6">
                  Details
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {centers.map((center, index) => (
                <TableRow
                  key={index}
                  className="group hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="pl-6 py-4">
                    <p className="text-sm font-medium text-foreground">{center.legalName}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{center.accountName}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">{center.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`text-xs font-medium border-0 ${
                        center.centerType === "GBS"
                          ? "bg-brand-orange/10 text-brand-orange"
                          : "bg-brand-blue/10 text-brand-blue"
                      }`}
                    >
                      {center.centerType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium tabular-nums text-foreground">{center.incYear}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm font-medium tabular-nums text-foreground">
                      {center.employeeCount}
                    </span>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-center pr-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-brand-blue hover:bg-brand-blue/10"
                      onClick={() => setSelectedCenter(center)}
                      aria-label={`View details for ${center.location} center`}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function CenterDetailView({
  center,
  onBack,
}: {
  center: CenterInfo
  onBack: () => void
}) {
  return (
    <div className="px-6 sm:px-8 py-6 space-y-6">
      {/* Back Button + Header */}
      <div className="flex items-center gap-4">
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
      </div>

      {/* Center Header Card */}
      <Card className="border-border/60 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-brand-blue/8 to-brand-blue/3 border-b border-border/60 px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-6 h-6 text-brand-blue" />
              </div>
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
      <Card className="border-border/60 shadow-sm">
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
      <Card className="border-border/60 shadow-sm">
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
                className="text-sm px-3 py-1.5 border-brand-orange/30 text-brand-orange bg-brand-orange/5 font-medium"
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
    <div className="rounded-xl bg-card border border-border/60 p-4 shadow-sm">
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
    <div className={`rounded-xl p-4 ${
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
