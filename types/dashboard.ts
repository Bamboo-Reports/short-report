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
  stockTicker?: string
  netIncome?: string
  marketCap?: string
  stockPrice?: string
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
  stockTicker: string
  financials: FinancialInfo
  executives: ExecutiveInfo[]
  competitors: CompetitorInfo[]
}

export interface FinancialInfo {
  revenue: string
  netIncome: string
  marketCap: string
  stockPrice: string
}

export interface ExecutiveInfo {
  name: string
  title: string
  since?: string
}

export interface CompetitorInfo {
  name: string
  industry: string
  marketCap?: string
}

export interface FinanceApiResponse {
  ticker: string
  stockPrice: number | null
  marketCap: number | null
  currency: string
  revenue: number | null
  netIncome: number | null
  priceHistory: { year: string; avgPrice: number }[]
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
  domain?: string
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
  domain: string
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
  career?: string
  currentProfile?: string
  qualification?: string
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
  career: string[]
  currentProfile: string[]
  qualifications: string[]
}

export interface DealData {
  solutionType?: string
  dealType?: string
  dealYear?: string
  dealYearEnd?: string
  country?: string
  companyEntity?: string
  partnerName?: string
  partnerUrl?: string
  solution?: string
  dealDetails?: string
  companyKeyPerson?: string
  partnerKeyPerson?: string
  url?: string
}

export interface DealInfo {
  solutionType: string
  dealType: string
  dealYear: string
  dealYearEnd: string
  country: string
  companyEntity: string
  partnerName: string
  partnerUrl: string
  solution: string[]
  dealDetails: string[]
  companyKeyPersons: string[]
  partnerKeyPersons: string[]
  url: string
}

export interface TechStackData {
  company?: string
  tool?: string
  category?: string
  count?: string
}

export interface TechStackInfo {
  company: string
  tool: string
  category: string
  count: number
}

export interface HeadcountYear {
  year: string
  count: number
}

export interface CenterSnapshot {
  city: string
  centerName: string
  centerType: string
  incYear: string
  employeeCount: string
  analystNote: string
  lat: number
  lng: number
}

export interface GccSnapshotInfo {
  centers: CenterSnapshot[]
  keyExecutives: { name: string; designation: string }[]
  currentHeadcount: number
  headcountHistory: HeadcountYear[]
}

export interface OpportunityData {
  opportunity?: string
  opportunityDetails?: string
}

export interface OpportunityInfo {
  opportunity: string
  details: string[]
}

export interface DashboardData {
  business?: BusinessData[]
  center?: CenterData[]
  contact?: ContactData[]
  deal?: DealData[]
  techStack?: TechStackData[]
  opportunity?: OpportunityData[]
}
