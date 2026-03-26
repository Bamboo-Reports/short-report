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
    <div className="px-6 sm:px-8 py-6 space-y-6">
      {/* Summary Metrics Strip */}
      <div className="grid grid-cols-2 gap-4">
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

      {/* Contact Cards Grouped by Role Tier */}
      {tierOrder.map((tier) => {
        const group = groupedContacts[tier]
        if (group.length === 0) return null

        return (
          <div key={tier} className="space-y-4">
            <div className="flex items-center gap-3">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.map(({ contact, originalIndex }) => (
                <Card
                  key={originalIndex}
                  className="border-border/60 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                  onClick={() => setSelectedIndex(originalIndex)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      {contact.profileImage ? (
                        <img
                          src={contact.profileImage}
                          alt={`${contact.firstName} ${contact.lastName}`}
                          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-brand-blue-light rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-base font-semibold text-white">
                            {contact.firstName[0]}{contact.lastName[0]}
                          </span>
                        </div>
                      )}

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {contact.firstName} {contact.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {contact.designation}
                        </p>

                        <div className="mt-3 space-y-1.5">
                          {contact.city && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <MapPin className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">
                                {contact.city}
                                {contact.state ? `, ${contact.state}` : ""}
                              </span>
                            </div>
                          )}
                          {contact.email && (
                            <div className="flex items-center gap-1.5 text-xs">
                              <Mail className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                              <a
                                href={`mailto:${contact.email}`}
                                className="text-brand-blue hover:text-brand-blue/80 transition-colors truncate"
                                data-pdf-link="true"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {contact.email}
                              </a>
                              <button
                                onClick={(e) => handleCopyEmail(contact.email, e)}
                                className="p-0.5 rounded text-muted-foreground hover:text-brand-blue transition-colors flex-shrink-0"
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
                          {contact.linkedin && (
                            <div className="flex items-center gap-1.5 text-xs">
                              <Linkedin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                              <a
                                href={`https://${contact.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-blue hover:text-brand-blue/80 transition-colors truncate"
                                data-pdf-link="true"
                                onClick={(e) => e.stopPropagation()}
                              >
                                LinkedIn Profile
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* View Profile link */}
                    <div className="flex justify-end mt-3 pt-3 border-t border-border/40">
                      <span className="text-xs text-brand-blue font-medium flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        View Profile
                        <ArrowRight className="w-3 h-3" />
                      </span>
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
    <div className="bg-card rounded-xl border border-border/60 p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
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
    <div className="px-6 sm:px-8 py-6 space-y-6">
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
      <Card className="border-border/60 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-brand-blue/8 to-brand-blue/3 border-b border-border/60 px-6 py-6">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-gradient-to-br from-brand-blue to-brand-blue-light rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                <span className="text-lg font-semibold text-white">
                  {contact.firstName[0]}{contact.lastName[0]}
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-xl font-semibold text-foreground leading-tight">
                  {contact.firstName} {contact.lastName}
                </h2>
                <p className="text-sm text-brand-blue font-medium mt-1">
                  {contact.designation}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-sm text-brand-blue hover:text-brand-blue/80 transition-colors"
                data-pdf-link="true"
              >
                <Mail className="w-4 h-4" />
                <span>{contact.email}</span>
              </a>
              {contact.linkedin && (
                <a
                  href={`https://${contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-brand-blue hover:text-brand-blue/80 transition-colors group"
                  data-pdf-link="true"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Details Grid */}
      <div className="grid sm:grid-cols-1 gap-4">
        <DetailCard label="Location">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-brand-orange mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">{contact.city}</p>
              <p className="text-xs text-muted-foreground">{contact.state}, {contact.country}</p>
            </div>
          </div>
        </DetailCard>
      </div>

      {/* Current Profile */}
      {contact.currentProfile.length > 0 && (
        <Card className="border-border/60 shadow-sm">
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
          <Card className="border-border/60 shadow-sm">
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
          <Card className="border-border/60 shadow-sm">
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
    <div className="rounded-xl bg-card border border-border/60 p-4 shadow-sm">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1.5">{label}</p>
      {children}
    </div>
  )
}
