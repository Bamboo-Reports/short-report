"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Building2,
  Users,
  Shield,
  Eye,
  Trash2,
} from "lucide-react"
import * as XLSX from "xlsx"

interface AdminPanelProps {
  onDataUpload: (data: any) => void
  onPreview: () => void
}

interface UploadedFile {
  name: string
  data: any[]
  uploadedAt: Date
}

export default function AdminPanel({ onDataUpload, onPreview }: AdminPanelProps) {
  const [uploadedFiles, setUploadedFiles] = useState<{
    business: UploadedFile | null
    center: UploadedFile | null
    contact: UploadedFile | null
  }>({
    business: null,
    center: null,
    contact: null,
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const businessFileRef = useRef<HTMLInputElement>(null)
  const centerFileRef = useRef<HTMLInputElement>(null)
  const contactFileRef = useRef<HTMLInputElement>(null)

  // Sample data for Excel templates
  const sampleData = {
    business: [
      {
        companyName: "Zscaler Inc.",
        incYear: "2007",
        revenue: "$2167 Mn",
        employees: "7384",
        headquarters: "California, United States",
        industry: "Security and Compliance Software",
        companyType: "Public",
        service1: "Cyber threat Protection",
        service2: "Data Protection",
        service3: "Digital Experience Management",
        service4: "Security Strategy",
        about:
          "Zscaler, Inc. is a cloud-based information security company that provides internet security, web filtering, and secure access solutions for businesses and organizations.",
      },
    ],
    center: [
      {
        legalName: "Zscaler Softech India Pvt. Ltd.",
        accountName: "Zscaler Inc.",
        incYear: "2007",
        centerType: "IT",
        location: "Bengaluru",
        employeeCount: "1001",
        focusRegion1: "Global",
        focusRegion2: "APAC",
        focusRegion3: "ASEAN",
        address: "Bengaluru, Karnataka, India",
        phone: "",
        itService1: "Web Security Service",
        itService2: "Data Protection Services",
        itService3: "Cloud Security Services",
        techStack1: "AWS Lambda",
        techStack2: "Terraform",
        techStack3: "Microsoft Azure",
      },
    ],
    contact: [
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
    ],
  }

  const downloadSampleExcel = (type: "business" | "center" | "contact") => {
    const ws = XLSX.utils.json_to_sheet(sampleData[type])
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, `${type}_data`)
    XLSX.writeFile(wb, `sample_${type}_data.xlsx`)
  }

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "business" | "center" | "contact",
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsProcessing(true)
    try {
      const data = await file.arrayBuffer()
      const workbook = XLSX.read(data)
      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet)

      setUploadedFiles((prev) => ({
        ...prev,
        [type]: {
          name: file.name,
          data: jsonData,
          uploadedAt: new Date(),
        },
      }))
    } catch (error) {
      console.error("Error parsing Excel file:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const removeFile = (type: "business" | "center" | "contact") => {
    setUploadedFiles((prev) => ({
      ...prev,
      [type]: null,
    }))
  }

  const handlePreview = () => {
    const combinedData = {
      business: uploadedFiles.business?.data || [],
      center: uploadedFiles.center?.data || [],
      contact: uploadedFiles.contact?.data || [],
    }
    onDataUpload(combinedData)
    onPreview()
  }

  const getUploadProgress = () => {
    const uploaded = Object.values(uploadedFiles).filter((file) => file !== null).length
    return (uploaded / 3) * 100
  }

  const allFilesUploaded = Object.values(uploadedFiles).every((file) => file !== null)

  const sections = [
    {
      key: "business" as const,
      title: "Business Snapshot",
      description: "Company overview, financial data, and core services",
      icon: Shield,
      color: "blue",
      fileRef: businessFileRef,
    },
    {
      key: "center" as const,
      title: "Center Details",
      description: "Office locations, operations, and service offerings",
      icon: Building2,
      color: "green",
      fileRef: centerFileRef,
    },
    {
      key: "contact" as const,
      title: "Contact Details",
      description: "Key personnel and leadership information",
      icon: Users,
      color: "purple",
      fileRef: contactFileRef,
    },
  ]

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Data Upload Center</h1>
          <p className="text-lg text-slate-600 mb-6">
            Upload your business data to generate beautiful, interactive dashboards
          </p>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Upload Progress</span>
              <span>{Math.round(getUploadProgress())}% Complete</span>
            </div>
            <Progress value={getUploadProgress()} className="h-2" />
          </div>

          <Badge variant="secondary" className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold">
            Research NXT Platform
          </Badge>
        </div>

        {/* Upload Sections */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {sections.map((section) => {
            const uploadedFile = uploadedFiles[section.key]
            const Icon = section.icon

            return (
              <Card key={section.key} className="border-slate-200 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${section.color}-100`}>
                      <Icon className={`w-5 h-5 text-${section.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{section.title}</h3>
                      <p className="text-sm text-slate-500 font-normal">{section.description}</p>
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Download Sample Button */}
                  <Button
                    onClick={() => downloadSampleExcel(section.key)}
                    variant="outline"
                    size="sm"
                    className="w-full gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Sample Excel
                  </Button>

                  <Separator />

                  {/* Upload Area */}
                  {!uploadedFile ? (
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                      <FileSpreadsheet className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-600 mb-3">
                        Drag and drop your Excel file here, or click to browse
                      </p>
                      <Button
                        onClick={() => section.fileRef.current?.click()}
                        size="sm"
                        className="gap-2"
                        disabled={isProcessing}
                      >
                        <Upload className="w-4 h-4" />
                        {isProcessing ? "Processing..." : "Upload File"}
                      </Button>
                      <input
                        ref={section.fileRef}
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={(e) => handleFileUpload(e, section.key)}
                        className="hidden"
                      />
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium text-green-900">{uploadedFile.name}</p>
                            <p className="text-xs text-green-600">
                              {uploadedFile.data.length} records • {uploadedFile.uploadedAt.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          onClick={() => removeFile(section.key)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Preview Button */}
        <div className="text-center">
          {allFilesUploaded ? (
            <Button
              onClick={handlePreview}
              size="lg"
              className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <Eye className="w-5 h-5" />
              Preview Dashboard
            </Button>
          ) : (
            <div className="flex items-center justify-center gap-2 text-slate-500">
              <AlertCircle className="w-5 h-5" />
              <span>Upload all three files to preview your dashboard</span>
            </div>
          )}
        </div>

        {/* Instructions */}
        <Card className="mt-8 border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">How to Use This Platform</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">
                  1
                </div>
                <h4 className="font-medium text-slate-900 mb-1">Download Templates</h4>
                <p className="text-sm text-slate-600">
                  Download sample Excel files for each section to see the required format
                </p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">
                  2
                </div>
                <h4 className="font-medium text-slate-900 mb-1">Fill Your Data</h4>
                <p className="text-sm text-slate-600">
                  Use the templates to structure your data and save as Excel files
                </p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 font-semibold">
                  3
                </div>
                <h4 className="font-medium text-slate-900 mb-1">Upload & Preview</h4>
                <p className="text-sm text-slate-600">
                  Upload all three files and click preview to see your beautiful dashboard
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
