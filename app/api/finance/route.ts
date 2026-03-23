import { NextResponse } from "next/server"
import YahooFinance from "yahoo-finance2"

const yahooFinance = new YahooFinance({ suppressNotices: ["yahooSurvey"] })

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ticker = searchParams.get("ticker") || "ZS"

  try {
    const now = new Date()
    const fiveYearsAgo = new Date(now)
    fiveYearsAgo.setFullYear(now.getFullYear() - 5)

    const [quoteSummary, historical] = await Promise.all([
      yahooFinance.quoteSummary(ticker, {
        modules: ["price", "summaryDetail", "defaultKeyStatistics", "financialData"],
      }),
      yahooFinance.chart(ticker, {
        period1: fiveYearsAgo.toISOString().split("T")[0],
        period2: now.toISOString().split("T")[0],
        interval: "1mo",
      }),
    ])

    const price = quoteSummary.price
    const financialData = quoteSummary.financialData
    const summaryDetail = quoteSummary.summaryDetail

    // Extract annual revenue from monthly close prices for the chart
    const monthlyData = historical.quotes || []
    const annualRevenue = extractAnnualData(monthlyData)

    return NextResponse.json({
      ticker,
      stockPrice: price?.regularMarketPrice ?? null,
      marketCap: price?.marketCap ?? null,
      currency: price?.currency ?? "USD",
      revenue: financialData?.totalRevenue ?? null,
      netIncome: financialData?.ebitda ?? null,
      priceHistory: annualRevenue,
    })
  } catch (error) {
    console.error("Yahoo Finance error:", error)
    return NextResponse.json(
      { error: "Failed to fetch financial data" },
      { status: 500 },
    )
  }
}

interface HistoricalQuote {
  date: Date | string | null
  close: number | null
}

function extractAnnualData(quotes: HistoricalQuote[]) {
  const yearMap = new Map<number, { total: number; count: number }>()

  for (const q of quotes) {
    if (!q.date || q.close == null) continue
    const year = new Date(q.date).getFullYear()
    const existing = yearMap.get(year)
    if (existing) {
      existing.total += q.close
      existing.count += 1
    } else {
      yearMap.set(year, { total: q.close, count: 1 })
    }
  }

  return Array.from(yearMap.entries())
    .map(([year, { total, count }]) => ({
      year: year.toString(),
      avgPrice: Math.round((total / count) * 100) / 100,
    }))
    .sort((a, b) => parseInt(a.year) - parseInt(b.year))
}
