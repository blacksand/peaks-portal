import type { PropsWithChildren } from 'react'

import { cn } from '@peaks/common-utils'

import { getThemeColorCss } from '../utils/get-theme-color-css'

interface ColorBoxProps extends PropsWithChildren {
  className?: string
  color: string
  foreground: string
}

export function ThemeColorBox({
  children,
  className,
  color,
  foreground,
}: ColorBoxProps) {
  const backgroundColor = getThemeColorCss(color)
  const foregroundColor = getThemeColorCss(foreground)
  return (
    <span
      className={cn(`inline-flex size-6 items-center justify-center border border-solid`, className)}
      style={{ backgroundColor, color: foregroundColor }}
    >
      {children}
    </span>
  )
}
