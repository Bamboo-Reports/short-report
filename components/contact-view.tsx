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
import { Mail, Linkedin, MapPin, User, ExternalLink, Eye, ArrowLeft, ChevronLeft, ChevronRight, Briefcase, GraduationCap, UserCheck } from "lucide-react"
import type { ContactInfo } from "@/types/dashboard"

interface ContactViewProps {
  contacts: ContactInfo[]
}

export function ContactView({ contacts }: ContactViewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

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

  return (
    <div className="px-6 sm:px-8 py-6">
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2.5 text-base font-semibold text-foreground">
            <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center">
              <User className="w-4 h-4 text-brand-blue" />
            </div>
            Key Personnel
            <Badge variant="outline" className="ml-2 text-xs border-border/60 text-muted-foreground font-normal">
              {contacts.length} {contacts.length === 1 ? "contact" : "contacts"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground pl-6">
                  Name
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Designation
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Email
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  LinkedIn
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground text-center pr-6">
                  Profile
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact, index) => (
                <TableRow
                  key={index}
                  className="group hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-brand-blue to-brand-blue-light rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-white">
                          {contact.firstName[0]}{contact.lastName[0]}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground">
                        {contact.firstName} {contact.lastName}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-brand-blue/8 text-brand-blue hover:bg-brand-blue/12 border-0 text-xs font-medium leading-normal py-1 px-2.5">
                      {contact.designation}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-brand-blue hover:text-brand-blue/80 transition-colors"
                      data-pdf-link="true"
                    >
                      {contact.email}
                    </a>
                  </TableCell>
                  <TableCell>
                    {contact.linkedin && (
                      <a
                        href={`https://${contact.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-sm text-brand-blue hover:text-brand-blue/80 transition-colors group/link"
                        data-pdf-link="true"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        <span>Profile</span>
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="text-center pr-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-brand-blue hover:bg-brand-blue/10"
                      onClick={() => setSelectedIndex(index)}
                      aria-label={`View profile for ${contact.firstName} ${contact.lastName}`}
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
