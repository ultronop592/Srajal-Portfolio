"use client"

import * as React from "react"
import { CertificateInteractiveExperience, type Certificate } from "./certificate-interactive-experience"

export { type Certificate } from "./certificate-interactive-experience"

interface CertificatesGridProps {
  testimonials: Certificate[]
  showViewAllLink?: boolean
}

export const CertificatesGrid: React.FC<CertificatesGridProps> = ({
  testimonials,
  showViewAllLink = true,
}) => {
  return (
    <CertificateInteractiveExperience
      testimonials={testimonials}
      showViewAllLink={showViewAllLink}
    />
  )
}

export default CertificatesGrid
