import type {
  DashboardData,
  BusinessInfo,
  CenterInfo,
  ContactInfo,
  DealInfo,
  TechStackInfo,
  GccSnapshotInfo,
  OpportunityInfo,
  FinancialYearData,
  AnalystNoteData,
} from "@/types/dashboard"

function parseBulletString(value?: string): string[] {
  if (!value) return []
  return value
    .split("\n")
    .map((line) => line.replace(/^[•\-\s]+/, "").trim())
    .filter(Boolean)
}

export function getBusinessInfo(data?: DashboardData): BusinessInfo | null {
  if (!data?.business || data.business.length === 0) {
    return null
  }

  const b = data.business[0]

  const services = data.services && data.services.length > 0
    ? data.services
    : b.services
      ? parseBulletString(b.services)
      : [b.service1, b.service2, b.service3, b.service4].filter(
          (s): s is string => Boolean(s),
        )

  const executives = data.executives && data.executives.length > 0
    ? data.executives
    : []

  const competitors = data.competitors && data.competitors.length > 0
    ? data.competitors
    : []

  return {
    name: b.companyName || "Company Name",
    incYear: b.incYear || "",
    revenue: b.revenue || "",
    employees: b.employees || "",
    headquarters: b.headquarters || "",
    industry: b.industry || "",
    companyType: b.companyType || "Private",
    services,
    about: b.about || "",
    socialLinks: {
      website: b.website || "",
      linkedin: b.linkedin || "",
      twitter: b.twitter || "",
      instagram: b.instagram || "",
    },
    stockTicker: b.stockTicker || "",
    financials: {
      revenue: b.revenue || "",
      netIncome: b.netIncome || "",
      marketCap: b.marketCap || "",
      stockPrice: b.stockPrice || "",
    },
    executives,
    competitors,
  }
}

export function getCenterInfo(data?: DashboardData): CenterInfo[] {
  if (!data?.center || data.center.length === 0) {
    return []
  }

  return data.center.map((c) => {
    let services: Record<string, string[]>
    if (c.services && Object.keys(c.services).length > 0) {
      services = {}
      for (const [category, serviceStr] of Object.entries(c.services)) {
        services[category] = parseBulletString(serviceStr)
      }
    } else {
      services = {
        "IT Services": [c.itService1, c.itService2, c.itService3].filter(
          (s): s is string => Boolean(s),
        ),
      }
    }

    const focusRegions = c.focusRegions
      ? parseBulletString(c.focusRegions)
      : [c.focusRegion1, c.focusRegion2, c.focusRegion3].filter(
          (r): r is string => Boolean(r),
        )

    const techStack = c.techStack
      ? parseBulletString(c.techStack)
      : [c.techStack1, c.techStack2, c.techStack3].filter(
          (t): t is string => Boolean(t),
        )

    return {
      legalName: c.legalName || "Legal Name",
      incYear: c.incYear || "",
      centerType: c.centerType || "IT",
      location: c.location || "",
      employeeCount: c.employeeCount || "0",
      focusRegions,
      services,
      techStack,
      address: c.address || "",
      phone: c.phone || null,
      accountName: c.accountName || "",
      domain: c.domain || "",
      latitude: c.latitude,
      longitude: c.longitude,
      analystNotes: c.analystNotes,
    }
  })
}

export function getContactInfo(data?: DashboardData): ContactInfo[] {
  if (!data?.contact || data.contact.length === 0) {
    return []
  }

  return data.contact.map((c) => ({
    accountName: c.accountName || "",
    entityName: c.entityName || "",
    firstName: c.firstName || "",
    lastName: c.lastName || "",
    designation: c.designation || "",
    email: c.email || "",
    city: c.city || "",
    state: c.state || "",
    country: c.country || "",
    linkedin: c.linkedin || "",
    career: parseBulletString(c.career),
    currentProfile: parseBulletString(c.currentProfile),
    qualifications: parseBulletString(c.qualification),
    profileImage: c.profileImage || undefined,
  }))
}

export function getDealInfo(data?: DashboardData): DealInfo[] {
  if (!data?.deal || data.deal.length === 0) {
    return []
  }

  return data.deal.map((d) => ({
    solutionType: d.solutionType || "",
    dealType: d.dealType || "",
    dealYear: d.dealYear || "",
    dealYearEnd: d.dealYearEnd || "",
    country: d.country || "",
    companyEntity: d.companyEntity || "",
    partnerName: d.partnerName || "",
    partnerUrl: d.partnerUrl || "",
    solution: parseBulletString(d.solution),
    dealDetails: parseBulletString(d.dealDetails),
    companyKeyPersons: parseBulletString(d.companyKeyPerson),
    partnerKeyPersons: parseBulletString(d.partnerKeyPerson),
    url: d.url || "",
  }))
}

export function getTechStackInfo(data?: DashboardData): TechStackInfo[] {
  if (!data?.techStack || data.techStack.length === 0) {
    return []
  }

  return data.techStack.map((t) => ({
    company: t.company || "",
    tool: t.tool || "",
    category: t.category || "",
    count: parseInt(t.count || "1", 10) || 1,
  }))
}

export function getGccSnapshot(centers: CenterInfo[], contacts: ContactInfo[], data?: DashboardData): GccSnapshotInfo | null {
  if (centers.length === 0) {
    return null
  }

  const currentHeadcount = centers.reduce((sum, c) => sum + (parseInt(c.employeeCount, 10) || 0), 0)

  const centerSnapshots = centers.map((c) => ({
    city: c.location,
    centerName: c.legalName,
    centerType: c.centerType,
    incYear: c.incYear,
    employeeCount: c.employeeCount,
    analystNote: c.analystNotes || "",
    lat: c.latitude ?? 20.5937,
    lng: c.longitude ?? 78.9629,
  }))

  const keyExecutives = contacts.slice(0, 4).map((c) => ({
    name: `${c.firstName} ${c.lastName}`,
    designation: c.designation,
  }))

  const headcountHistory = data?.headcountHistory && data.headcountHistory.length > 0
    ? data.headcountHistory
    : []

  return {
    centers: centerSnapshots,
    keyExecutives,
    currentHeadcount,
    headcountHistory,
  }
}

export function getOpportunities(data?: DashboardData): OpportunityInfo[] {
  if (!data?.opportunity || data.opportunity.length === 0) {
    return []
  }

  return data.opportunity.map((o) => ({
    opportunity: o.opportunity || "",
    details: parseBulletString(o.opportunityDetails),
  }))
}

export function getFinancialData(data?: DashboardData): FinancialYearData[] | null {
  if (!data?.financials || data.financials.length === 0) {
    return null
  }
  return data.financials
}

export function getAnalystNotes(data?: DashboardData, section?: string): AnalystNoteData | null {
  if (!data?.analystNotes || !section) return null
  return data.analystNotes[section] || null
}
