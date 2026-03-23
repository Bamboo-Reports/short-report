import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Phone, MapPin } from "lucide-react"
import type { CenterInfo } from "@/types/dashboard"

interface CenterViewProps {
  centers: CenterInfo[]
}

export function CenterView({ centers }: CenterViewProps) {
  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-6">
        {centers.map((center, index) => (
          <Card key={index} className="border-slate-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Building2 className="w-5 h-5 text-blue-600" />
                {center.location} Center - {center.accountName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-4 gap-6">
                {/* Center Details */}
                <div className="lg:col-span-1 space-y-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Center Details</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Legal Name</p>
                        <p className="text-sm font-semibold text-slate-900">{center.legalName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Account Name</p>
                        <p className="text-sm font-semibold text-slate-900">{center.accountName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Incorporation Year</p>
                        <Badge variant="outline" className="text-xs">
                          {center.incYear}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Center Type</p>
                        <Badge
                          className={
                            center.centerType === "GBS"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          }
                        >
                          {center.centerType}
                        </Badge>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Address</p>
                        <p className="text-sm text-slate-700 flex items-start gap-1">
                          <MapPin className="w-3 h-3 mt-0.5 text-slate-500 flex-shrink-0" />
                          <span>{center.address}</span>
                        </p>
                      </div>
                      {center.phone && (
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Phone</p>
                          <p className="text-sm font-semibold text-slate-900 flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-500" />
                            {center.phone}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-slate-500 mb-1">Employee Count</p>
                        <p className="text-sm font-semibold text-slate-900 flex items-center gap-1">
                          <Users className="w-3 h-3 text-slate-500" />
                          {center.employeeCount}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-2">Focus Regions</p>
                        <div className="space-y-1">
                          {center.focusRegions.map((region, idx) => (
                            <div key={idx} className="text-sm text-slate-700">
                              {region}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services Section */}
                <div className="lg:col-span-3">
                  <div className="border border-slate-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">Services</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(center.services).map(([category, serviceList], idx) => (
                        <div key={idx} className="bg-slate-50 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-slate-800 mb-3 pb-2 border-b border-slate-200">
                            {category}
                          </h4>
                          <ul className="space-y-2">
                            {serviceList.map((service, serviceIdx) => (
                              <li key={serviceIdx} className="flex items-start gap-2 text-xs text-slate-600">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0" />
                                <span className="leading-relaxed">{service}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      <div className="bg-slate-50 rounded-lg p-4 border-2 border-orange-300">
                        <h4 className="text-sm font-semibold text-orange-700 mb-3 pb-2 border-b border-orange-200">
                          Tech Stack
                        </h4>
                        <ul className="space-y-2">
                          {center.techStack.map((tech, techIdx) => (
                            <li key={techIdx} className="flex items-start gap-2 text-xs text-slate-600">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0" />
                              <span className="leading-relaxed">{tech}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
