"use client"

import * as React from "react"
import { CertificateVaultWorkbench, type Certificate } from "./certificate-vault-workbench"

export { type Certificate } from "./certificate-vault-workbench"

interface CertificatesGridProps {
  testimonials: Certificate[]
  showViewAllLink?: boolean
}

export const CertificatesGrid: React.FC<CertificatesGridProps> = ({
  testimonials,
  showViewAllLink = true,
}) => {
  return (
    <CertificateVaultWorkbench
      testimonials={testimonials}
      showViewAllLink={showViewAllLink}
    />
  )
}

export default CertificatesGrid
