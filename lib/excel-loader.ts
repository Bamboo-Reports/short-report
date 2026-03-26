import * as XLSX from "xlsx"
import * as fs from "fs"
import * as path from "path"
import type {
  DashboardData,
  BusinessData,
  CenterData,
  ContactData,
  DealData,
  TechStackData,
  OpportunityData,
  ExecutiveInfo,
  CompetitorInfo,
  FinancialYearData,
  HeadcountYear,
  AnalystNoteData,
} from "@/types/dashboard"

const DATA_DIR = path.join(process.cwd(), "data")

// Known (non-service) columns in the Centers sheet
const CENTER_KNOWN_FIELDS = new Set([
  "legalName", "incYear", "centerType", "location", "employeeCount",
  "address", "phone", "accountName", "domain", "focusRegions",
  "techStack", "latitude", "longitude", "analystNotes",
])

function parseBulletString(value?: string | null): string[] {
  if (!value) return []
  return String(value)
    .split("\n")
    .map((line) => line.replace(/^[•\-\s]+/, "").trim())
    .filter(Boolean)
}

export function getAvailableReports(): string[] {
  if (!fs.existsSync(DATA_DIR)) return []
  return fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.endsWith(".xlsx") && !f.startsWith("~$"))
    .map((f) => f.replace(/\.xlsx$/, ""))
}

export function loadReportFromExcel(reportName: string): DashboardData {
  const filePath = path.join(DATA_DIR, `${reportName}.xlsx`)
  if (!fs.existsSync(filePath)) return {}

  const fileBuffer = fs.readFileSync(filePath)
  const wb = XLSX.read(fileBuffer, { type: "buffer" })
  const data: DashboardData = {}

  // ─── Sheet 1: Business ───
  const businessSheet = wb.Sheets["Business"]
  if (businessSheet) {
    const rows = XLSX.utils.sheet_to_json<Record<string, string>>(businessSheet)
    if (rows.length > 0) {
      const r = rows[0]
      data.business = [{
        companyName: r.companyName,
        incYear: r.incYear,
        revenue: r.revenue,
        employees: r.employees,
        headquarters: r.headquarters,
        industry: r.industry,
        companyType: r.companyType,
        about: r.about,
        services: r.services,
        executives: r.executives,
        competitors: r.competitors,
        website: r.website,
        linkedin: r.linkedin,
        twitter: r.twitter,
        instagram: r.instagram,
        stockTicker: r.stockTicker,
        netIncome: r.netIncome,
        marketCap: r.marketCap,
        stockPrice: r.stockPrice,
      }]

      // Parse executives: "Name – Title\nName – Title"
      if (r.executives) {
        data.executives = parseBulletString(r.executives).map((line) => {
          const dashIdx = line.indexOf(" – ")
          if (dashIdx === -1) {
            const altIdx = line.indexOf(" - ")
            if (altIdx === -1) return { name: line, title: "" }
            return { name: line.slice(0, altIdx).trim(), title: line.slice(altIdx + 3).trim() }
          }
          return { name: line.slice(0, dashIdx).trim(), title: line.slice(dashIdx + 3).trim() }
        })
      }

      // Parse competitors: "Name\nName"
      if (r.competitors) {
        data.competitors = parseBulletString(r.competitors).map((name) => ({
          name,
          industry: "",
        }))
      }

      // Parse services: "Service1\nService2"
      if (r.services) {
        data.services = parseBulletString(r.services)
      }
    }
  }

  // ─── Sheet 2: Centers ───
  const centersSheet = wb.Sheets["Centers"]
  if (centersSheet) {
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(centersSheet)
    data.center = rows.map((r) => {
      const center: CenterData = {
        legalName: str(r.legalName),
        incYear: str(r.incYear),
        centerType: str(r.centerType),
        location: str(r.location),
        employeeCount: str(r.employeeCount),
        address: str(r.address),
        phone: str(r.phone) || null,
        accountName: str(r.accountName),
        domain: str(r.domain),
        focusRegions: str(r.focusRegions),
        techStack: str(r.techStack),
        latitude: r.latitude != null ? Number(r.latitude) : undefined,
        longitude: r.longitude != null ? Number(r.longitude) : undefined,
        analystNotes: str(r.analystNotes),
      }

      // Collect service category columns (any column not in known fields)
      const services: Record<string, string> = {}
      for (const key of Object.keys(r)) {
        if (!CENTER_KNOWN_FIELDS.has(key) && r[key]) {
          services[key] = String(r[key])
        }
      }
      if (Object.keys(services).length > 0) {
        center.services = services
      }

      return center
    })
  }

  // ─── Sheet 3: Contacts ───
  const contactsSheet = wb.Sheets["Contacts"]
  if (contactsSheet) {
    const rows = XLSX.utils.sheet_to_json<Record<string, string>>(contactsSheet)
    data.contact = rows.map((r) => ({
      accountName: r.accountName,
      entityName: r.entityName,
      firstName: r.firstName,
      lastName: r.lastName,
      designation: r.designation,
      email: r.email,
      city: r.city,
      state: r.state,
      country: r.country,
      linkedin: r.linkedin,
      career: r.career,
      currentProfile: r.currentProfile,
      qualification: r.qualification,
      profileImage: r.profileImage,
    }))
  }

  // ─── Sheet 4: Deals ───
  const dealsSheet = wb.Sheets["Deals"]
  if (dealsSheet) {
    const rows = XLSX.utils.sheet_to_json<Record<string, string>>(dealsSheet)
    data.deal = rows.map((r) => ({
      solutionType: r.solutionType,
      dealType: r.dealType,
      dealYear: str(r.dealYear),
      dealYearEnd: str(r.dealYearEnd),
      country: r.country,
      companyEntity: r.companyEntity,
      partnerName: r.partnerName,
      partnerUrl: r.partnerUrl,
      solution: r.solution,
      dealDetails: r.dealDetails,
      companyKeyPerson: r.companyKeyPerson,
      partnerKeyPerson: r.partnerKeyPerson,
      url: r.url,
    }))
  }

  // ─── Sheet 5: Tech Stack ───
  const techSheet = wb.Sheets["Tech Stack"]
  if (techSheet) {
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(techSheet)
    data.techStack = rows.map((r) => ({
      company: str(r.company),
      tool: str(r.tool),
      category: str(r.category),
      count: str(r.count),
    }))
  }

  // ─── Sheet 6: Opportunities ───
  const oppSheet = wb.Sheets["Opportunities"]
  if (oppSheet) {
    const rows = XLSX.utils.sheet_to_json<Record<string, string>>(oppSheet)
    data.opportunity = rows.map((r) => ({
      opportunity: r.opportunity,
      opportunityDetails: r.opportunityDetails,
    }))
  }

  // ─── Sheet 7: Financials ───
  const finSheet = wb.Sheets["Financials"]
  if (finSheet) {
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(finSheet)
    data.financials = rows.map((r) => ({
      year: str(r.year),
      revenue: Number(r.revenue) || 0,
      netIncome: Number(r.netIncome) || 0,
      operatingIncome: Number(r.operatingIncome) || 0,
    }))
  }

  // ─── Sheet 8: Headcount History ───
  const hcSheet = wb.Sheets["Headcount History"]
  if (hcSheet) {
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(hcSheet)
    data.headcountHistory = rows.map((r) => ({
      year: str(r.year),
      count: Number(r.count) || 0,
    }))
  }

  // ─── Sheet 9: Analyst Notes ───
  const notesSheet = wb.Sheets["Analyst Notes"]
  if (notesSheet) {
    const rows = XLSX.utils.sheet_to_json<Record<string, string>>(notesSheet)
    const notes: Record<string, AnalystNoteData> = {}
    for (const r of rows) {
      if (r.section) {
        notes[r.section] = {
          notes: parseBulletString(r.notes),
        }
      }
    }
    data.analystNotes = notes
  }

  return data
}

function str(val: unknown): string {
  if (val == null) return ""
  return String(val)
}
