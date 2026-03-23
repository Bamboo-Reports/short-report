"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Building2,
  Users,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { BusinessView } from "@/components/business-view"
import { CenterView } from "@/components/center-view"
import { ContactView } from "@/components/contact-view"
import { getBusinessInfo, getCenterInfo, getContactInfo } from "@/lib/transform-data"
import type { DashboardData } from "@/types/dashboard"

type ViewType = "business" | "center" | "contact"

const VIEWS = [
  { key: "business" as ViewType, title: "Business Snapshot", subtitle: "Company Overview & Analytics", icon: Shield },
  { key: "center" as ViewType, title: "Center Details", subtitle: "Office Locations & Operations", icon: Building2 },
  { key: "contact" as ViewType, title: "Contact Details", subtitle: "Key Personnel & Leadership", icon: Users },
]

const SOCIAL_ICONS = [
  { key: "website", icon: Globe, label: "Website" },
  { key: "linkedin", icon: Linkedin, label: "LinkedIn" },
  { key: "twitter", icon: Twitter, label: "Twitter" },
  { key: "instagram", icon: Instagram, label: "Instagram" },
] as const

export default function BusinessDashboard({ data }: { data?: DashboardData }) {
  const [currentView, setCurrentView] = useState<ViewType>("business")

  const businessInfo = useMemo(() => getBusinessInfo(data), [data])
  const centerInfo = useMemo(() => getCenterInfo(data), [data])
  const contactInfo = useMemo(() => getContactInfo(data), [data])

  const currentViewIndex = VIEWS.findIndex((view) => view.key === currentView)
  const CurrentIcon = VIEWS[currentViewIndex].icon

  const navigateView = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? (currentViewIndex - 1 + VIEWS.length) % VIEWS.length
        : (currentViewIndex + 1) % VIEWS.length
    setCurrentView(VIEWS[newIndex].key)
  }

  return (
    <div className="bg-background min-h-screen h-screen overflow-hidden flex flex-col">
      {/* Executive Header */}
      <header className="flex-shrink-0 bg-gradient-to-r from-brand-blue to-[#015a8f] text-white">
        <div className="px-6 sm:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <Button
                onClick={() => navigateView("prev")}
                variant="ghost"
                size="sm"
                className="w-9 h-9 p-0 text-white/70 hover:text-white hover:bg-white/10 rounded-lg"
                aria-label="Previous view"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="w-11 h-11 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                <CurrentIcon className="w-5 h-5 text-white" />
              </div>

              <div>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
                  {VIEWS[currentViewIndex].title}
                </h1>
                <p className="text-sm text-white/70 mt-0.5">{VIEWS[currentViewIndex].subtitle}</p>
              </div>

              <Button
                onClick={() => navigateView("next")}
                variant="ghost"
                size="sm"
                className="w-9 h-9 p-0 text-white/70 hover:text-white hover:bg-white/10 rounded-lg"
                aria-label="Next view"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

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
                    href={businessInfo.socialLinks[key]}
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
                      : "text-white/60 hover:text-white hover:bg-white/8"
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
          {currentView === "business" && <BusinessView businessInfo={businessInfo} />}
          {currentView === "center" && <CenterView centers={centerInfo} />}
          {currentView === "contact" && <ContactView contacts={contactInfo} />}
        </div>

        {/* Footer */}
        <footer className="border-t border-border/60 mt-2">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              Confidential &middot; 2025
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
