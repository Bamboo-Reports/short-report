import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Linkedin, MapPin, User, ExternalLink } from "lucide-react"

export function ContactView({ data }: { data?: any }) {
  const getContactData = () => {
    if (data?.contact && data.contact.length > 0) {
      return data.contact.map((contact: any) => ({
        accountName: contact.accountName || "Account Name",
        entityName: contact.entityName || "Entity Name",
        firstName: contact.firstName || "First",
        lastName: contact.lastName || "Last",
        designation: contact.designation || "Position",
        email: contact.email || "email@example.com",
        city: contact.city || "City",
        state: contact.state || "State",
        country: contact.country || "Country",
        linkedin: contact.linkedin || "",
      }))
    }

    // Default data
    return [
      {
        accountName: "Zscaler Inc.",
        entityName: "Zscaler Softech India Pvt. Ltd.",
        firstName: "Vishal",
        lastName: "Gautam",
        designation: "Vice President, Engineering & Site Managing Director",
        email: "vgautam@zscaler.com",
        city: "Bengaluru",
        state: "Karnataka",
        country: "India",
        linkedin: "linkedin.com/in/gautamvishal",
      },
      {
        accountName: "Zscaler Inc.",
        entityName: "Zscaler Softech India Pvt. Ltd.",
        firstName: "Kirabkumar",
        lastName: "D G",
        designation: "Director of Engineering",
        email: "kirankumardg@zscaler.com",
        city: "Bengaluru",
        state: "Karnataka",
        country: "India",
        linkedin: "linkedin.com/in/kirankumardg",
      },
      {
        accountName: "Zscaler Inc.",
        entityName: "Zscaler Softech India Pvt. Ltd.",
        firstName: "Saurav",
        lastName: "G",
        designation: "Director of Engineering",
        email: "sauravg@zscaler.com",
        city: "Bengaluru",
        state: "Karnataka",
        country: "India",
        linkedin: "linkedin.com/in/sauravmware",
      },
      {
        accountName: "Zscaler Inc.",
        entityName: "Zscaler Softech India Pvt. Ltd.",
        firstName: "Kishore",
        lastName: "Thakur",
        designation: "Senior Director, Site Reliability Engineering",
        email: "kthakur@zscaler.com",
        city: "Hyderabad",
        state: "Telangana",
        country: "India",
        linkedin: "linkedin.com/in/kishorethakur",
      },
      {
        accountName: "Zscaler Inc.",
        entityName: "Zscaler Softech India Pvt. Ltd.",
        firstName: "Satish",
        lastName: "Sreenivasaiah",
        designation: "Director - Product Security Engineering",
        email: "satishsreenivasaiah@zscaler.com",
        city: "Bengaluru",
        state: "Karnataka",
        country: "India",
        linkedin: "linkedin.com/in/satish-sreenivasaiah-b661983/",
      },
    ]
  }

  const contactData = getContactData()

  return (
    <div className="p-4 sm:p-6">
      <div className="space-y-4">
        {contactData.map((contact, index) => (
          <Card key={index} className="border-slate-200 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="grid lg:grid-cols-4 gap-6">
                {/* Personal Information */}
                <div className="lg:col-span-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {contact.firstName} {contact.lastName}
                      </h3>
                      <p className="text-xs text-slate-500">{contact.entityName}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-slate-500">Account</p>
                      <p className="text-sm font-medium text-slate-900">{contact.accountName}</p>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="lg:col-span-1">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Position</p>
                  <div className="space-y-3">
                    <div>
                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 text-xs">
                        {contact.designation}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="lg:col-span-1">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Contact</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                        data-pdf-link="true"
                      >
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-blue-600" />
                      <a
                        href={`https://${contact.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                        data-pdf-link="true"
                      >
                        LinkedIn Profile
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div className="lg:col-span-1">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Location</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{contact.city}</p>
                        <p className="text-xs text-slate-500">
                          {contact.state}, {contact.country}
                        </p>
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
