"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Mail,
  Linkedin,
  MapPin,
  User,
  ExternalLink,
  Eye,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  GraduationCap,
  UserCheck,
  FileText,
  Users,
  Globe,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import type { ContactInfo, AnalystNoteData } from "@/types/dashboard"

interface ContactViewProps {
  contacts: ContactInfo[]
  analystNotes?: AnalystNoteData | null
}

type RoleTier = "Senior Leadership" | "Management" | "Other Key Personnel"

function classifyRole(designation: string): RoleTier {
  const upper = designation.toUpperCase()
  if (
    upper.includes("VP") ||
    upper.includes("VICE PRESIDENT") ||
    upper.includes("DIRECTOR") ||
    upper.includes("HEAD") ||
    upper.includes("CHIEF") ||
    upper.includes("CTO") ||
    upper.includes("CEO") ||
    upper.includes("CXO") ||
    upper.includes("CFO") ||
    upper.includes("CIO") ||
    upper.includes("COO") ||
    upper.includes("PRESIDENT")
  ) {
    return "Senior Leadership"
  }
  if (
    upper.includes("MANAGER") ||
    upper.includes("LEAD") ||
    upper.includes("PRINCIPAL") ||
    upper.includes("SENIOR")
  ) {
    return "Management"
  }
  return "Other Key Personnel"
}

export function ContactView({ contacts, analystNotes }: ContactViewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  const handleCopyEmail = useCallback((email: string, e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2000)
  }, [])

  const metrics = useMemo(() => {
    const uniqueDesignations = new Set(contacts.map((c) => c.designation))
    const uniqueCities = new Set(contacts.map((c) => c.city).filter(Boolean))
    const linkedinCount = contacts.filter((c) => c.linkedin).length
    const linkedinPct =
      contacts.length > 0
        ? Math.round((linkedinCount / contacts.length) * 100)
        : 0

    const uniqueEntities = new Set(contacts.map((c) => c.entityName).filter(Boolean))

    return {
      total: contacts.length,
      uniqueRoles: uniqueDesignations.size,
      cities: Array.from(uniqueCities),
      linkedinPct,
      entities: Array.from(uniqueEntities),
    }
  }, [contacts])

  const groupedContacts = useMemo(() => {
    const groups: Record<RoleTier, { contact: ContactInfo; originalIndex: number }[]> = {
      "Senior Leadership": [],
      "Management": [],
      "Other Key Personnel": [],
    }

    contacts.forEach((contact, index) => {
      const tier = classifyRole(contact.designation)
      groups[tier].push({ contact, originalIndex: index })
    })

    return groups
  }, [contacts])

  if (selectedIndex !== null) {
    return (
      <ContactDetailView
        contact={contacts[selectedIndex]}
        currentIndex={selectedIndex}
        total={contacts.length}
        onBack={() => setSelectedIndex(null)}
        onPrev={() => setSelectedIndex(selectedIndex - 1)}
        onNext={() => setSelectedIndex(selectedIndex + 1)}
      />
    )
  }

  const tierOrder: RoleTier[] = ["Senior Leadership", "Management", "Other Key Personnel"]

  return (
    <div className="px-6 sm:px-8 py-6 space-y-6 animate-fade-in-up">
      {/* Summary Metrics Strip */}
      <div className="grid grid-cols-2 gap-4 stagger-children">
        <MetricCard
          icon={<Users className="w-5 h-5" />}
          label="Total Contacts"
          value={String(metrics.total)}
          accent="blue"
        />
        <MetricCard
          icon={<MapPin className="w-5 h-5" />}
          label="Locations"
          value={metrics.cities.join(", ") || "N/A"}
          accent="orange"
          small={metrics.cities.length > 2}
        />
      </div>

      {/* Analyst Overview */}
      {analystNotes && analystNotes.notes.length > 0 && (
        <Card className="card-accent-orange border-border/60 shadow-executive">
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

      {/* Contact Cards Grouped by Role Tier */}
      {tierOrder.map((tier) => {
        const group = groupedContacts[tier]
        if (group.length === 0) return null

        return (
          <div key={tier} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-brand-blue" />
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                {tier}
              </h3>
              <Badge
                variant="outline"
                className="text-xs border-border/60 text-muted-foreground font-normal"
              >
                {group.length}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children">
              {group.map(({ contact, originalIndex }) => (
                <Card
                  key={originalIndex}
                  className="border-border/60 shadow-executive hover:shadow-executive-md transition-all duration-300 cursor-pointer group overflow-hidden"
                  onClick={() => setSelectedIndex(originalIndex)}
                >
                  {/* Top accent bar */}
                  <div className="h-1 bg-gradient-to-r from-brand-blue via-brand-blue/60 to-brand-blue-light" />
                  <CardContent className="p-0">
                    {/* Header section with avatar and name */}
                    <div className="px-5 pt-5 pb-4">
                      <div className="flex items-center gap-4">
                        {/* Avatar with ring */}
                        <div className="relative flex-shrink-0">
                          <div className="w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-br from-brand-blue to-brand-blue-light">
                            {contact.profileImage ? (
                              <ProfileImage
                                src={contact.profileImage}
                                alt={`${contact.firstName} ${contact.lastName}`}
                                size={64}
                                initials={`${contact.firstName[0]}${contact.lastName[0]}`}
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue via-[#015a8f] to-brand-blue-light flex items-center justify-center">
                                <span className="text-lg font-semibold text-white">
                                  {contact.firstName[0]}{contact.lastName[0]}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Name, designation, and location */}
                        <div className="flex-1 min-w-0">
                          <p className="text-[15px] font-semibold text-foreground truncate leading-tight">
                            {contact.firstName} {contact.lastName}
                          </p>
                          <p className="text-xs text-brand-blue font-medium mt-1 line-clamp-2 leading-relaxed">
                            {contact.designation}
                          </p>
                          {contact.city && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-muted-foreground">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">
                                {contact.city}
                                {contact.state ? `, ${contact.state}` : ""}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="mx-5 h-px bg-gradient-to-r from-border/60 via-border/40 to-transparent" />

                    {/* Contact details section */}
                    <div className="px-5 py-3.5 space-y-2">
                      {contact.email && (
                        <div className="flex items-center gap-2 text-xs">
                          <div className="w-6 h-6 rounded-md bg-brand-blue/8 flex items-center justify-center flex-shrink-0">
                            <Mail className="w-3 h-3 text-brand-blue" />
                          </div>
                          <a
                            href={`mailto:${contact.email}`}
                            className="text-foreground/70 hover:text-brand-blue transition-colors truncate"
                            data-pdf-link="true"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {contact.email}
                          </a>
                          <button
                            onClick={(e) => handleCopyEmail(contact.email, e)}
                            className="p-0.5 rounded text-muted-foreground hover:text-brand-blue transition-colors flex-shrink-0 ml-auto"
                            aria-label="Copy email"
                          >
                            {copiedEmail === contact.email ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Footer action */}
                    <div className="px-5 py-3 bg-muted/30 border-t border-border/40">
                      <div className="flex items-center justify-end">
                        <span className="text-xs text-brand-blue font-medium flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                          View Profile
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
  accent,
  small,
}: {
  icon: React.ReactNode
  label: string
  value: string
  accent: "blue" | "orange"
  small?: boolean
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
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p
        className={`text-foreground tracking-tight ${
          small ? "text-sm" : "text-lg"
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function ContactDetailView({
  contact,
  currentIndex,
  total,
  onBack,
  onPrev,
  onNext,
}: {
  contact: ContactInfo
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
          aria-label="Back to all contacts"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          All Contacts
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
              aria-label="Previous contact"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={onNext}
              disabled={currentIndex === total - 1}
              aria-label="Next contact"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Header with Contact Info */}
      <Card className="border-border/60 shadow-executive overflow-hidden">
        {/* Accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-brand-blue via-brand-blue/70 to-brand-blue-light" />
        <div className="bg-gradient-to-br from-brand-blue/8 via-brand-blue/4 to-transparent px-6 py-6">
          <div className="flex items-start gap-6">
            {/* Large avatar with ring */}
            <div className="relative flex-shrink-0">
              <div className="w-[84px] h-[84px] rounded-full p-[3px] bg-gradient-to-br from-brand-blue to-brand-blue-light shadow-lg">
                {contact.profileImage ? (
                  <ProfileImage
                    src={contact.profileImage}
                    alt={`${contact.firstName} ${contact.lastName}`}
                    size={78}
                    initials={`${contact.firstName[0]}${contact.lastName[0]}`}
                  />
                ) : (
                  <div className="w-[78px] h-[78px] rounded-full bg-gradient-to-br from-brand-blue via-[#015a8f] to-brand-blue-light flex items-center justify-center">
                    <span className="text-2xl font-semibold text-white">
                      {contact.firstName[0]}{contact.lastName[0]}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Name, title, and contact links */}
            <div className="flex-1 min-w-0 pt-1">
              <h2 className="text-xl font-semibold text-foreground leading-tight">
                {contact.firstName} {contact.lastName}
              </h2>
              <p className="text-sm text-brand-blue font-medium mt-1">
                {contact.designation}
              </p>
              {contact.city && (
                <div className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-brand-orange flex-shrink-0" />
                  <span>{contact.city}{contact.state ? `, ${contact.state}` : ""}{contact.country ? `, ${contact.country}` : ""}</span>
                </div>
              )}

              {/* Contact action buttons */}
              <div className="flex items-center gap-3 mt-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-brand-blue/10 text-brand-blue hover:bg-brand-blue/15 transition-colors text-xs font-medium"
                  data-pdf-link="true"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{contact.email}</span>
                </a>
                {contact.linkedin && (
                  <a
                    href={`https://${contact.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/15 transition-colors text-xs font-medium"
                    data-pdf-link="true"
                  >
                    <Linkedin className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Current Profile */}
      {contact.currentProfile.length > 0 && (
        <Card className="border-border/60 shadow-executive">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-brand-blue" />
              </div>
              Current Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2.5">
              {contact.currentProfile.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-[7px] flex-shrink-0" />
                  <p className="text-sm text-foreground/80 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Career History + Qualifications row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Career History */}
        {contact.career.length > 0 && (
          <Card className="card-accent-orange border-border/60 shadow-executive">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-brand-orange" />
                </div>
                Career History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5">
                {contact.career.map((role, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-[7px] flex-shrink-0" />
                    <p className="text-sm text-foreground/80 leading-relaxed">{role}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Qualifications */}
        {contact.qualifications.length > 0 && (
          <Card className="card-accent-orange border-border/60 shadow-executive">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-brand-orange" />
                </div>
                Qualifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5">
                {contact.qualifications.map((qual, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mt-[7px] flex-shrink-0" />
                    <p className="text-sm text-foreground/80 leading-relaxed">{qual}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

    </div>
  )
}

function DetailCard({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl bg-card border border-border/60 p-4 shadow-executive">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">{label}</p>
      {children}
    </div>
  )
}

function ProfileImage({
  src,
  alt,
  size,
  initials,
}: {
  src: string
  alt: string
  size: number
  initials: string
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  return (
    <div className="relative rounded-full overflow-hidden bg-card" style={{ width: size, height: size }}>
      {!loaded && !error && <Skeleton className="absolute inset-0 rounded-full" />}
      {error ? (
        <div className="w-full h-full rounded-full bg-gradient-to-br from-brand-blue via-[#015a8f] to-brand-blue-light flex items-center justify-center">
          <span className={`font-semibold text-white ${size >= 78 ? "text-2xl" : "text-lg"}`}>{initials}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full rounded-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}
