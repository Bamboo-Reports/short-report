"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Globe,
  Linkedin,
  Twitter,
  Instagram,
  Building2,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Shield,
  Monitor,
  Lock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { CenterView as OfficeCenterView } from "./center-view"
import { ContactView as OfficeContactView } from "./contact-view"

type ViewType = "business" | "center" | "contact"

export default function BusinessDashboard({ data }: { data?: any }) {
  const [currentView, setCurrentView] = useState<ViewType>("business")

  const views = [
    { key: "business" as ViewType, title: "Business Snapshot", subtitle: "Company Overview & Analytics" },
    { key: "center" as ViewType, title: "Center Details", subtitle: "Office Locations & Operations" },
    { key: "contact" as ViewType, title: "Contact Details", subtitle: "Key Personnel & Leadership" },
  ]

  const currentViewIndex = views.findIndex((view) => view.key === currentView)

  const navigateView = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? (currentViewIndex - 1 + views.length) % views.length
        : (currentViewIndex + 1) % views.length
    setCurrentView(views[newIndex].key)
  }

  const getBusinessData = () => {
    if (data?.business && data.business.length > 0) {
      const businessData = data.business[0]
      return {
        name: businessData.companyName || "Company Name",
        incYear: businessData.incYear || "2024",
        revenue: businessData.revenue || "$0",
        employees: businessData.employees || "0",
        headquarters: businessData.headquarters || "Location",
        industry: businessData.industry || "Industry",
        companyType: businessData.companyType || "Private",
        services: [businessData.service1, businessData.service2, businessData.service3, businessData.service4].filter(
          Boolean,
        ),
        about: businessData.about || "Company description not available.",
      }
    }

    // Default data
    return {
      name: "Zscaler Inc.",
      incYear: "2007",
      revenue: "$2167 Mn",
      employees: "7384",
      headquarters: "California, United States",
      industry: "Security and Compliance Software",
      companyType: "Public",
      services: ["Cyber threat Protection", "Data Protection", "Digital Experience Management", "Security Strategy"],
      about:
        "Zscaler, Inc. is a cloud-based information security company that provides internet security, web filtering, and secure access solutions for businesses and organizations. Their platform enables secure and fast connections between users and applications, regardless of device, location, or network.",
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 font-['Inter'] h-screen overflow-hidden p-2">
      <div className="mx-auto max-w-full h-full overflow-y-auto flex flex-col">
        {/* Header with Navigation */}
        <div className="bg-white rounded-t-2xl shadow-sm border border-slate-200 flex-shrink-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 gap-4">
            <div className="flex items-center gap-4 flex-1">
              {/* Navigation Arrow Left */}
              <Button
                onClick={() => navigateView("prev")}
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 hover:bg-slate-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                {currentView === "business" && <Shield className="w-6 h-6 text-white" />}
                {currentView === "center" && <Building2 className="w-6 h-6 text-white" />}
                {currentView === "contact" && <Users className="w-6 h-6 text-white" />}
              </div>

              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900">
                  {views[currentViewIndex].title}
                </h1>
                <p className="text-sm text-slate-600 mt-1">{views[currentViewIndex].subtitle}</p>
              </div>

              {/* Navigation Arrow Right */}
              <Button
                onClick={() => navigateView("next")}
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0 hover:bg-slate-100"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-slate-100" asChild>
                  <a href="https://zscaler.com" target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 text-slate-600" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-slate-100" asChild>
                  <a href="https://linkedin.com/company/zscaler" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 text-slate-600" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-slate-100" asChild>
                  <a href="https://x.com/zscaler" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 text-slate-600" />
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-slate-100" asChild>
                  <a href="https://instagram.com/zscaler" target="_blank" rel="noopener noreferrer">
                    <Instagram className="w-4 h-4 text-slate-600" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* View Indicator */}
          <div className="flex justify-center pb-4">
            <div className="flex gap-2">
              {views.map((view, index) => (
                <button
                  key={view.key}
                  onClick={() => setCurrentView(view.key)}
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
          {currentView === "business" && <BusinessView data={data} />}
          {currentView === "center" && <OfficeCenterView data={data} />}
          {currentView === "contact" && <OfficeContactView data={data} />}

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

function BusinessView({ data }: { data?: any }) {
  const getBusinessData = () => {
    if (data?.business && data.business.length > 0) {
      const businessData = data.business[0]
      return {
        name: businessData.companyName || "Company Name",
        incYear: businessData.incYear || "2024",
        revenue: businessData.revenue || "$0",
        employees: businessData.employees || "0",
        headquarters: businessData.headquarters || "Location",
        industry: businessData.industry || "Industry",
        companyType: businessData.companyType || "Private",
        services: [businessData.service1, businessData.service2, businessData.service3, businessData.service4].filter(
          Boolean,
        ),
        about: businessData.about || "Company description not available.",
      }
    }

    // Default data
    return {
      name: "Zscaler Inc.",
      incYear: "2007",
      revenue: "$2167 Mn",
      employees: "7384",
      headquarters: "California, United States",
      industry: "Security and Compliance Software",
      companyType: "Public",
      services: ["Cyber threat Protection", "Data Protection", "Digital Experience Management", "Security Strategy"],
      about:
        "Zscaler, Inc. is a cloud-based information security company that provides internet security, web filtering, and secure access solutions for businesses and organizations. Their platform enables secure and fast connections between users and applications, regardless of device, location, or network.",
    }
  }

  const companyData = getBusinessData()

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-6">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Company Information Cards - Takes 3 columns */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Basic Info */}
              <Card className="border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    Company Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Company Name</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1">{companyData.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Type</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {companyData.companyType}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Info */}
              <Card className="border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    Financial Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Annual Revenue</p>
                    <p className="text-lg font-bold text-green-600 mt-1">{companyData.revenue}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Founded</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {companyData.incYear}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Location & Team */}
              <Card className="border-slate-200 hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
                    <MapPin className="w-4 h-4 text-red-600" />
                    Location & Team
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Headquarters</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1">{companyData.headquarters}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Employees</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {companyData.employees}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Industry */}
              <Card className="border-slate-200 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
                    <Monitor className="w-4 h-4 text-purple-600" />
                    Industry Focus
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Sector</p>
                    <Badge className="mt-2 bg-purple-100 text-purple-800 hover:bg-purple-200">
                      {companyData.industry}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>

          {/* Services - Takes 1 column */}
          <div className="lg:col-span-1">
            <Card className="border-slate-200 hover:shadow-md transition-shadow h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-semibold text-slate-900">
                  <Lock className="w-4 h-4 text-blue-600" />
                  Core Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {companyData.services.map((service, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                        <span className="text-sm font-medium text-slate-700">{service}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-slate-900">About the Company</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-700 leading-relaxed">{companyData.about}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
