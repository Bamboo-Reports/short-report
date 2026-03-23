export interface BusinessData {
  companyName?: string
  incYear?: string
  revenue?: string
  employees?: string
  headquarters?: string
  industry?: string
  companyType?: string
  service1?: string
  service2?: string
  service3?: string
  service4?: string
  about?: string
  website?: string
  linkedin?: string
  twitter?: string
  instagram?: string
}

export interface BusinessInfo {
  name: string
  incYear: string
  revenue: string
  employees: string
  headquarters: string
  industry: string
  companyType: string
  services: string[]
  about: string
  socialLinks: SocialLinks
}

export interface SocialLinks {
  website: string
  linkedin: string
  twitter: string
  instagram: string
}

export interface CenterData {
  legalName?: string
  incYear?: string
  centerType?: string
  location?: string
  employeeCount?: string
  focusRegion1?: string
  focusRegion2?: string
  focusRegion3?: string
  itService1?: string
  itService2?: string
  itService3?: string
  techStack1?: string
  techStack2?: string
  techStack3?: string
  address?: string
  phone?: string | null
  accountName?: string
}

export interface CenterInfo {
  legalName: string
  incYear: string
  centerType: string
  location: string
  employeeCount: string
  focusRegions: string[]
  services: Record<string, string[]>
  techStack: string[]
  address: string
  phone: string | null
  accountName: string
}

export interface ContactData {
  accountName?: string
  entityName?: string
  firstName?: string
  lastName?: string
  designation?: string
  email?: string
  city?: string
  state?: string
  country?: string
  linkedin?: string
}

export interface ContactInfo {
  accountName: string
  entityName: string
  firstName: string
  lastName: string
  designation: string
  email: string
  city: string
  state: string
  country: string
  linkedin: string
}

export interface DashboardData {
  business?: BusinessData[]
  center?: CenterData[]
  contact?: ContactData[]
}
