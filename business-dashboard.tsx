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
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 font-['Inter'] h-screen overflow-hidden p-2">
      <div className="mx-auto max-w-full h-full overflow-y-auto flex flex-col">
        {/* Header with Navigation */}
        <div className="bg-white rounded-t-2xl shadow-sm border border-slate-200 flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
            <div className="flex items-center gap-4 flex-1">
              <Button
                onClick={() => navigateView("prev")}
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 hover:bg-slate-100"
                aria-label="Previous view"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <CurrentIcon className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
                  {VIEWS[currentViewIndex].title}
                </h1>
                <p className="text-sm text-slate-600 mt-1">{VIEWS[currentViewIndex].subtitle}</p>
              </div>

              <Button
                onClick={() => navigateView("next")}
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 hover:bg-slate-100"
                aria-label="Next view"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              {SOCIAL_ICONS.map(({ key, icon: Icon, label }) => (
                <Button
                  key={key}
                  variant="ghost"
                  size="sm"
                  className="w-8 h-8 p-0 hover:bg-slate-100"
                  aria-label={label}
                  asChild
                >
                  <a
                    href={businessInfo.socialLinks[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-4 h-4 text-slate-600" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* View Indicator */}
          <div className="flex justify-center pb-4">
            <div className="flex gap-2" role="tablist" aria-label="Dashboard views">
              {VIEWS.map((view, index) => (
                <button
                  key={view.key}
                  onClick={() => setCurrentView(view.key)}
                  role="tab"
                  aria-selected={index === currentViewIndex}
                  aria-label={view.title}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentViewIndex ? "bg-blue-600" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-b-2xl shadow-sm border-x border-b border-slate-200">
          {currentView === "business" && <BusinessView businessInfo={businessInfo} />}
          {currentView === "center" && <CenterView centers={centerInfo} />}
          {currentView === "contact" && <ContactView contacts={contactInfo} />}

          {/* Footer */}
          <div className="px-4 sm:px-6 pb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <span className="text-xs text-slate-500">Confidential 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
