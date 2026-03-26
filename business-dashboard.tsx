"use client"

import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Building2,
  Users,
  Shield,
  Handshake,
  Cpu,
  MapPin,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  DollarSign,
} from "lucide-react"
import { BusinessView } from "@/components/business-view"
import { CenterView } from "@/components/center-view"
import { ContactView } from "@/components/contact-view"
import { DealView } from "@/components/deal-view"
import { TechView } from "@/components/tech-view"
import { GccView } from "@/components/gcc-view"
import { OpportunityView } from "@/components/opportunity-view"
import { KeyFinancialsView } from "@/components/key-financials-view"
import { getBusinessInfo, getCenterInfo, getContactInfo, getDealInfo, getTechStackInfo, getGccSnapshot, getOpportunities, getFinancialData, getAnalystNotes } from "@/lib/transform-data"
import type { DashboardData } from "@/types/dashboard"
import { FileX } from "lucide-react"

function NoData() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
      <FileX className="w-12 h-12 mb-4 opacity-40" />
      <p className="text-lg font-semibold">NO DATA FOR REPORT</p>
      <p className="text-sm mt-1">Add data to the Excel sheet for this section.</p>
    </div>
  )
}

type ViewType = "business" | "financials" | "center" | "contact" | "deal" | "tech" | "gcc" | "opportunity"

const VIEWS = [
  { key: "business" as ViewType, title: "Business Snapshot", subtitle: "Company Overview & Analytics", icon: Shield },
  { key: "financials" as ViewType, title: "Key Financials", subtitle: "Revenue & Income Analysis", icon: DollarSign },
  { key: "gcc" as ViewType, title: "GCC Snapshot", subtitle: "India Centers Overview & Growth", icon: MapPin },
  { key: "center" as ViewType, title: "Center Details", subtitle: "Office Locations & Operations", icon: Building2 },
  { key: "contact" as ViewType, title: "Contact Details", subtitle: "Key Personnel & Leadership", icon: Users },
  { key: "deal" as ViewType, title: "Deal Details", subtitle: "Partnerships & Customer Deals", icon: Handshake },
  { key: "tech" as ViewType, title: "Tech Details", subtitle: "Technology Stack & Landscape", icon: Cpu },
  { key: "opportunity" as ViewType, title: "Opportunity Map", subtitle: "Strategic Growth Opportunities", icon: Lightbulb },
]

const SOCIAL_ICONS = [
  { key: "website", icon: Globe, label: "Website" },
  { key: "linkedin", icon: Linkedin, label: "LinkedIn" },
  { key: "twitter", icon: Twitter, label: "Twitter" },
  { key: "instagram", icon: Instagram, label: "Instagram" },
] as const

const VIEW_KEYS = VIEWS.map((v) => v.key)

function getInitialView(): ViewType {
  if (typeof window === "undefined") return "business"
  const param = new URLSearchParams(window.location.search).get("view") as ViewType | null
  return param && VIEW_KEYS.includes(param) ? param : "business"
}

interface BusinessDashboardProps {
  data?: DashboardData
  availableReports?: string[]
  selectedReport?: string | null
}

export default function BusinessDashboard({ data, availableReports = [], selectedReport }: BusinessDashboardProps) {
  const [currentView, setCurrentViewState] = useState<ViewType>(getInitialView)

  const setCurrentView = useCallback((view: ViewType) => {
    setCurrentViewState(view)
    const params = new URLSearchParams(window.location.search)
    if (view === "business") {
      params.delete("view")
    } else {
      params.set("view", view)
    }
    const qs = params.toString()
    window.history.replaceState(null, "", qs ? `${window.location.pathname}?${qs}` : window.location.pathname)
  }, [])

  const businessInfo = useMemo(() => getBusinessInfo(data), [data])
  const centerInfo = useMemo(() => getCenterInfo(data), [data])
  const contactInfo = useMemo(() => getContactInfo(data), [data])
  const dealInfo = useMemo(() => getDealInfo(data), [data])
  const techStackInfo = useMemo(() => getTechStackInfo(data), [data])
  const gccSnapshot = useMemo(() => getGccSnapshot(centerInfo, contactInfo, data), [centerInfo, contactInfo, data])
  const opportunityInfo = useMemo(() => getOpportunities(data), [data])
  const financialData = useMemo(() => getFinancialData(data), [data])

  const currentViewIndex = VIEWS.findIndex((view) => view.key === currentView)
  const CurrentIcon = VIEWS[currentViewIndex].icon

  const navigateView = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? (currentViewIndex - 1 + VIEWS.length) % VIEWS.length
        : (currentViewIndex + 1) % VIEWS.length
    setCurrentView(VIEWS[newIndex].key)
  }

  const handleCompanyChange = (report: string) => {
    const params = new URLSearchParams(window.location.search)
    params.set("company", report)
    window.location.href = `${window.location.pathname}?${params.toString()}`
  }

  return (
    <div className="bg-background min-h-screen h-screen overflow-hidden flex flex-col">
      {/* Executive Header */}
      <header className="flex-shrink-0 bg-gradient-to-r from-brand-blue to-[#015a8f] text-white">
        <div className="px-6 sm:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-11 h-11 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                <CurrentIcon className="w-5 h-5 text-white" />
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  {VIEWS[currentViewIndex].title}
                </h1>
                <p className="text-sm text-white/70 mt-0.5">{VIEWS[currentViewIndex].subtitle}</p>
              </div>

              <div className="flex items-center gap-0.5 ml-1">
                <Button
                  onClick={() => navigateView("prev")}
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 text-white/70 hover:text-white hover:bg-white/10 rounded-lg"
                  aria-label="Previous view"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => navigateView("next")}
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 text-white/70 hover:text-white hover:bg-white/10 rounded-lg"
                  aria-label="Next view"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Company Selector */}
              {availableReports.length > 1 && (
                <select
                  value={selectedReport || ""}
                  onChange={(e) => handleCompanyChange(e.target.value)}
                  className="bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
                >
                  {availableReports.map((report) => (
                    <option key={report} value={report} className="text-foreground bg-background">
                      {report}
                    </option>
                  ))}
                </select>
              )}

              <div className="hidden sm:flex items-center gap-1">
                {SOCIAL_ICONS.map(({ key, icon: Icon, label }) => (
                  <Button
                    key={key}
                    variant="ghost"
                    size="sm"
                    className="w-9 h-9 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-lg"
                    aria-label={label}
                    asChild
                  >
                    <a
                      href={businessInfo?.socialLinks[key] || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 sm:px-8">
          <nav className="flex gap-1" role="tablist" aria-label="Dashboard views">
            {VIEWS.map((view) => {
              const isActive = view.key === currentView
              const ViewIcon = view.icon
              return (
                <button
                  key={view.key}
                  onClick={() => setCurrentView(view.key)}
                  role="tab"
                  aria-selected={isActive}
                  className={`
                    flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all duration-200
                    ${isActive
                      ? "bg-background text-foreground shadow-sm"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                    }
                  `}
                >
                  <ViewIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{view.title}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[1400px] mx-auto">
          {currentView === "business" && (businessInfo ? <BusinessView businessInfo={businessInfo} analystNotes={getAnalystNotes(data, "Business Snapshot")} /> : <NoData />)}
          {currentView === "financials" && (financialData ? <KeyFinancialsView financials={financialData} /> : <NoData />)}
          {currentView === "center" && (centerInfo.length > 0 ? <CenterView centers={centerInfo} analystNotes={getAnalystNotes(data, "Center Details")} /> : <NoData />)}
          {currentView === "contact" && (contactInfo.length > 0 ? <ContactView contacts={contactInfo} analystNotes={getAnalystNotes(data, "Contact Details")} /> : <NoData />)}
          {currentView === "deal" && (dealInfo.length > 0 ? <DealView deals={dealInfo} analystNotes={getAnalystNotes(data, "Deal Details")} /> : <NoData />)}
          {currentView === "tech" && (techStackInfo.length > 0 ? <TechView techStack={techStackInfo} analystNotes={getAnalystNotes(data, "Tech Details")} /> : <NoData />)}
          {currentView === "gcc" && (gccSnapshot ? <GccView snapshot={gccSnapshot} analystNotes={getAnalystNotes(data, "GCC Snapshot")} /> : <NoData />)}
          {currentView === "opportunity" && (opportunityInfo.length > 0 ? <OpportunityView opportunities={opportunityInfo} analystNotes={getAnalystNotes(data, "Opportunity Map")} /> : <NoData />)}
        </div>

        {/* Footer */}
        <footer className="border-t border-border/60 mt-6">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-5 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Confidential &middot; {new Date().getFullYear()}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">
                Page {currentViewIndex + 1} of {VIEWS.length}
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
