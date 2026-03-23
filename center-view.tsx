import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Phone, MapPin } from "lucide-react"

export function CenterView({ data }: { data?: any }) {
  const getCenterData = () => {
    if (data?.center && data.center.length > 0) {
      return data.center.map((center: any) => ({
        legalName: center.legalName || "Legal Name",
        incYear: center.incYear || "2024",
        centerType: center.centerType || "IT",
        location: center.location || "Location",
        employeeCount: center.employeeCount || "0",
        focusRegions: [center.focusRegion1, center.focusRegion2, center.focusRegion3].filter(Boolean),
        services: {
          "IT Services": [center.itService1, center.itService2, center.itService3].filter(Boolean),
        },
        techStack: [center.techStack1, center.techStack2, center.techStack3].filter(Boolean),
        address: center.address || "Address not provided",
        phone: center.phone || null,
        accountName: center.accountName || "Account Name",
      }))
    }

    // Default data
    return [
      {
        legalName: "Zscaler Softech India Pvt. Ltd.",
        incYear: "2007",
        centerType: "IT",
        location: "Bengaluru",
        employeeCount: "1001",
        focusRegions: ["Global", "APAC", "ASEAN", "Japan"],
        services: {
          "IT Services": [
            "Web Security Service",
            "Data Protection Services",
            "Cloud Security Services",
            "Web Managing Services",
            "Global IT Service Desk Management",
          ],
        },
        techStack: ["AWS Lambda", "Terraform", "Microsoft Azure", "Salesforce Sales Cloud"],
        address: "Bengaluru, Karnataka, India",
        phone: null,
        accountName: "Zscaler Inc.",
      },
      {
        legalName: "Zscaler Softech India Pvt. Ltd.",
        incYear: "2024",
        centerType: "IT",
        location: "Hyderabad",
        employeeCount: "113",
        focusRegions: ["Global", "India"],
        services: {
          "IT Services": [
            "Platform Engineering",
            "IT Infrastructure",
            "Cloud Services",
            "IT Architecture",
            "Artificial Intelligence",
            "Machine Learning",
            "Data Center Operations",
          ],
        },
        techStack: ["Microsoft Azure", "Terraform", "Kubernetes", "AWS Cloud", "Ansible"],
        address: "Hyderabad, Telangana, India",
        phone: null,
        accountName: "Zscaler Inc.",
      },
      {
        legalName: "Alcon Laboratories India Pvt. Ltd.",
        incYear: "2018",
        centerType: "GBS",
        location: "Bengaluru",
        employeeCount: "1001",
        focusRegions: ["Global", "APAC", "EMEA"],
        services: {
          "IT Services": ["IT support", "IT Security Services", "Cybersecurity", "Cyber Threat Intelligence"],
          "ER&D": ["R&D Service", "Development of Materials"],
          FnA: [
            "Financial Planning & Analysis",
            "P&L Management",
            "Financial Reporting",
            "Budgeting & Forecasting",
            "Variance Analysis",
            "Treasury Management",
          ],
          HR: ["Talent Acquisition", "Employee Relations"],
          "Procurement and Supply Chain": [
            "Supply Chain Analytics",
            "Spend Analysis",
            "Supplier Performance",
            "Global Procurement Operations",
            "Contract Management",
            "Strategic Sourcing",
            "Supplier Evaluation",
            "Supplier Negotiation",
          ],
          "Sales & Marketing": ["Sales & Marketing Operations"],
          "Customer Support Services": ["Quality Assurance", "Customer Service", "Customer Experience"],
          "Others Service": ["Government Affairs Management"],
        },
        techStack: [
          "SAP ERP",
          "SAP Ariba",
          "SAP MM",
          "Coupa Supplier Portal",
          "ServiceNow Procurement Service Management",
          "Workday HCM",
          "SAP FICO",
        ],
        address: "11th Floor, RMZ Azure, Bellary Road, Hebbal, Bengaluru - 560092, Karnataka",
        phone: "8045444444",
        accountName: "Alcon Inc.",
      },
    ]
  }

  const centerData = getCenterData()

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-6">
        {centerData.map((center, index) => (
          <Card key={index} className="border-slate-200 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <Building2 className="w-5 h-5 text-blue-600" />
                {center.location} Center - {center.accountName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-4 gap-6">
                {/* Center Details - Takes 1 column */}
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
                          className={`${center.centerType === "GBS" ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-blue-100 text-blue-800 hover:bg-blue-200"}`}
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
                      {/* Focus Regions */}
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

                {/* Services Section - Takes 3 columns */}
                <div className="lg:col-span-3">
                  <div className="border border-slate-200 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-4">Services</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Regular Services */}
                      {Object.entries(center.services).map(([category, serviceList], idx) => (
                        <div key={idx} className="bg-slate-50 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-slate-800 mb-3 pb-2 border-b border-slate-200">
                            {category}
                          </h4>
                          <ul className="space-y-2">
                            {serviceList.map((service, serviceIdx) => (
                              <li key={serviceIdx} className="flex items-start gap-2 text-xs text-slate-600">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                <span className="leading-relaxed">{service}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {/* Tech Stack with orange border */}
                      <div className="bg-slate-50 rounded-lg p-4 border-2 border-orange-300">
                        <h4 className="text-sm font-semibold text-orange-700 mb-3 pb-2 border-b border-orange-200">
                          Tech Stack
                        </h4>
                        <ul className="space-y-2">
                          {center.techStack.map((tech, techIdx) => (
                            <li key={techIdx} className="flex items-start gap-2 text-xs text-slate-600">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-1.5 flex-shrink-0"></div>
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
