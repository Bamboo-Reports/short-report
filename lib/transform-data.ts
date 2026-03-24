import type {
  DashboardData,
  BusinessInfo,
  CenterInfo,
  ContactInfo,
  DealInfo,
  TechStackInfo,
  GccSnapshotInfo,
  OpportunityInfo,
} from "@/types/dashboard"
import { DEFAULT_BUSINESS, DEFAULT_CENTERS, DEFAULT_CONTACTS, DEFAULT_DEALS, DEFAULT_TECH_STACK, DEFAULT_GCC_SNAPSHOT, DEFAULT_OPPORTUNITIES } from "./default-data"

export function getBusinessInfo(data?: DashboardData): BusinessInfo {
  if (!data?.business || data.business.length === 0) {
    return DEFAULT_BUSINESS
  }

  const b = data.business[0]
  return {
    name: b.companyName || "Company Name",
    incYear: b.incYear || "2024",
    revenue: b.revenue || "$0",
    employees: b.employees || "0",
    headquarters: b.headquarters || "Location",
    industry: b.industry || "Industry",
    companyType: b.companyType || "Private",
    services: [b.service1, b.service2, b.service3, b.service4].filter(
      (s): s is string => Boolean(s),
    ),
    about: b.about || "Company description not available.",
    socialLinks: {
      website: b.website || DEFAULT_BUSINESS.socialLinks.website,
      linkedin: b.linkedin || DEFAULT_BUSINESS.socialLinks.linkedin,
      twitter: b.twitter || DEFAULT_BUSINESS.socialLinks.twitter,
      instagram: b.instagram || DEFAULT_BUSINESS.socialLinks.instagram,
    },
    stockTicker: b.stockTicker || DEFAULT_BUSINESS.stockTicker,
    financials: {
      revenue: b.revenue || DEFAULT_BUSINESS.financials.revenue,
      netIncome: b.netIncome || DEFAULT_BUSINESS.financials.netIncome,
      marketCap: b.marketCap || DEFAULT_BUSINESS.financials.marketCap,
      stockPrice: b.stockPrice || DEFAULT_BUSINESS.financials.stockPrice,
    },
    executives: DEFAULT_BUSINESS.executives,
    competitors: DEFAULT_BUSINESS.competitors,
  }
}

export function getCenterInfo(data?: DashboardData): CenterInfo[] {
  if (!data?.center || data.center.length === 0) {
    return DEFAULT_CENTERS
  }

  return data.center.map((c) => ({
    legalName: c.legalName || "Legal Name",
    incYear: c.incYear || "2024",
    centerType: c.centerType || "IT",
    location: c.location || "Location",
    employeeCount: c.employeeCount || "0",
    focusRegions: [c.focusRegion1, c.focusRegion2, c.focusRegion3].filter(
      (r): r is string => Boolean(r),
    ),
    services: {
      "IT Services": [c.itService1, c.itService2, c.itService3].filter(
        (s): s is string => Boolean(s),
      ),
    },
    techStack: [c.techStack1, c.techStack2, c.techStack3].filter(
      (t): t is string => Boolean(t),
    ),
    address: c.address || "Address not provided",
    phone: c.phone || null,
    accountName: c.accountName || "Account Name",
    domain: c.domain || "",
  }))
}

export function getContactInfo(data?: DashboardData): ContactInfo[] {
  if (!data?.contact || data.contact.length === 0) {
    return DEFAULT_CONTACTS
  }

  return data.contact.map((c) => ({
    accountName: c.accountName || "Account Name",
    entityName: c.entityName || "Entity Name",
    firstName: c.firstName || "First",
    lastName: c.lastName || "Last",
    designation: c.designation || "Position",
    email: c.email || "email@example.com",
    city: c.city || "City",
    state: c.state || "State",
    country: c.country || "Country",
    linkedin: c.linkedin || "",
    career: parseBulletString(c.career),
    currentProfile: parseBulletString(c.currentProfile),
    qualifications: parseBulletString(c.qualification),
  }))
}

export function getDealInfo(data?: DashboardData): DealInfo[] {
  if (!data?.deal || data.deal.length === 0) {
    return DEFAULT_DEALS
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
    return DEFAULT_TECH_STACK
  }

  return data.techStack.map((t) => ({
    company: t.company || "",
    tool: t.tool || "",
    category: t.category || "",
    count: parseInt(t.count || "1", 10) || 1,
  }))
}

export function getGccSnapshot(centers: CenterInfo[], contacts: ContactInfo[]): GccSnapshotInfo {
  if (centers.length === 0 && contacts.length === 0) {
    return DEFAULT_GCC_SNAPSHOT
  }

  const currentHeadcount = centers.reduce((sum, c) => sum + (parseInt(c.employeeCount, 10) || 0), 0)

  const defaultCenter = (city: string) => DEFAULT_GCC_SNAPSHOT.centers.find((dc) => dc.city === city)

  const centerSnapshots = centers.map((c) => {
    const dc = defaultCenter(c.location)
    return {
      city: c.location,
      centerName: c.legalName,
      centerType: c.centerType,
      incYear: c.incYear,
      employeeCount: c.employeeCount,
      analystNote: dc?.analystNote
        || `Supports ${c.accountName}'s operations with focus on ${Object.keys(c.services).join(", ").toLowerCase()}.`,
      lat: dc?.lat || 20.5937,
      lng: dc?.lng || 78.9629,
    }
  })

  const keyExecutives = contacts.slice(0, 4).map((c) => ({
    name: `${c.firstName} ${c.lastName}`,
    designation: c.designation,
  }))

  return {
    centers: centerSnapshots,
    keyExecutives,
    currentHeadcount,
    headcountHistory: DEFAULT_GCC_SNAPSHOT.headcountHistory,
  }
}

export function getOpportunities(data?: DashboardData): OpportunityInfo[] {
  if (!data?.opportunity || data.opportunity.length === 0) {
    return DEFAULT_OPPORTUNITIES
  }

  return data.opportunity.map((o) => ({
    opportunity: o.opportunity || "",
    details: parseBulletString(o.opportunityDetails),
  }))
}

function parseBulletString(value?: string): string[] {
  if (!value) return []
  return value
    .split("\n")
    .map((line) => line.replace(/^[•\-\s]+/, "").trim())
    .filter(Boolean)
}
