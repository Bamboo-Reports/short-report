import BusinessDashboard from "../business-dashboard"
import { getAvailableReports, loadReportFromExcel } from "@/lib/excel-loader"

interface PageProps {
  searchParams: Promise<{ company?: string }>
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams
  const reports = getAvailableReports()
  const selectedReport = params.company && reports.includes(params.company)
    ? params.company
    : reports[0] || null

  const data = selectedReport ? loadReportFromExcel(selectedReport) : undefined

  return (
    <BusinessDashboard
      data={data}
      availableReports={reports}
      selectedReport={selectedReport}
    />
  )
}
