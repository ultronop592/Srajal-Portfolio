"use client"

import { Download } from "lucide-react"

interface ResumeDownloadButtonProps {
  variant?: "primary" | "secondary" | "floating"
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function ResumeDownloadButton({
  variant = "primary",
  size = "md",
  className = "",
}: ResumeDownloadButtonProps) {
  const handleDownloadResume = () => {
    // Updated Google Drive direct download link with new resume
    const driveDownloadUrl = "https://drive.google.com/uc?export=download&id=1eIxB8c51EMGQVDiDetjrjJ-evX-hwWhk"

    // Open in new tab for safety and trigger download
    window.open(driveDownloadUrl, "_blank", "noopener,noreferrer")
  }

  const baseClasses =
    "inline-flex items-center justify-center font-semibold transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 active:scale-95"

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-1",
    secondary:
      "bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-lg hover:scale-105",
    floating:
      "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-2xl hover:shadow-blue-500/25 hover:scale-110 hover:-translate-y-1 rounded-full",
  }

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
  }

  return (
    <button
      onClick={handleDownloadResume}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} group`}
      aria-label="Download Srajal Tiwari's resume from Google Drive"
      title="Download Resume PDF"
    >
      <Download
        className={`mr-2 group-hover:animate-bounce ${
          size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"
        }`}
      />
      Download Resume
    </button>
  )
}
