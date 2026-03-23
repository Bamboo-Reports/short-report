"use client"

import { useState } from "react"
import BusinessDashboard from "../business-dashboard"
import AdminPanel from "../admin-panel"
import { Button } from "@/components/ui/button"
import { Settings, Eye } from "lucide-react"

export default function Page() {
  const [isAdminMode, setIsAdminMode] = useState(true)
  const [dashboardData, setDashboardData] = useState(null)

  const handleDataUpload = (data: any) => {
    setDashboardData(data)
  }

  const handlePreview = () => {
    setIsAdminMode(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setIsAdminMode(!isAdminMode)}
          variant="outline"
          size="sm"
          className="gap-2 bg-white shadow-lg"
        >
          {isAdminMode ? (
            <>
              <Eye className="w-4 h-4" />
              Preview
            </>
          ) : (
            <>
              <Settings className="w-4 h-4" />
              Admin
            </>
          )}
        </Button>
      </div>

      {isAdminMode ? (
        <AdminPanel onDataUpload={handleDataUpload} onPreview={handlePreview} />
      ) : (
        <BusinessDashboard data={dashboardData} />
      )}
    </div>
  )
}
