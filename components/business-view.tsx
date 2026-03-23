import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Monitor,
  Lock,
} from "lucide-react"
import type { BusinessInfo } from "@/types/dashboard"

interface BusinessViewProps {
  businessInfo: BusinessInfo
}

export function BusinessView({ businessInfo }: BusinessViewProps) {
  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Company Information Cards */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    <p className="text-sm font-semibold text-slate-900 mt-1">{businessInfo.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Type</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {businessInfo.companyType}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

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
                    <p className="text-lg font-bold text-green-600 mt-1">{businessInfo.revenue}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Founded</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {businessInfo.incYear}
                    </p>
                  </div>
                </CardContent>
              </Card>

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
                    <p className="text-sm font-semibold text-slate-900 mt-1">{businessInfo.headquarters}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Employees</p>
                    <p className="text-sm font-semibold text-slate-900 mt-1 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {businessInfo.employees}
                    </p>
                  </div>
                </CardContent>
              </Card>

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
                      {businessInfo.industry}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Services */}
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
                  {businessInfo.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0" />
                      <span className="text-sm font-medium text-slate-700">{service}</span>
                    </div>
                  ))}
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
            <p className="text-sm text-slate-700 leading-relaxed">{businessInfo.about}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
