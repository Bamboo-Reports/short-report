import type {
  DashboardData,
  BusinessInfo,
  CenterInfo,
  ContactInfo,
} from "@/types/dashboard"
import { DEFAULT_BUSINESS, DEFAULT_CENTERS, DEFAULT_CONTACTS } from "./default-data"

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
  }))
}
