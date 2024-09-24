import Image from 'next/image'

import './brand-logo.css'

export interface BrandLogoProps {
  title?: string
  height?: number
  width?: number
}

export function BrandLogo({ title, height, width }: BrandLogoProps) {
  return (
    <div className="brand-logo">
      <Image src="/favicon.ico" className="logo-icon" alt="logo" height={height ?? 24} width={width ?? 24} />
      <span className="logo-text" data-testid="logoText">
        {title}
      </span>
    </div>
  )
}
