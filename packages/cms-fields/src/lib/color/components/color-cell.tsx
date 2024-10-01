'use client'

import { useTableCell } from '@payloadcms/ui'

import { useBackgroundColor } from '../utils/use-background-color'
import type { ColorFieldValue } from './types'

export function ColorCell() {
  const cellContext = useTableCell()

  const { cellData } = cellContext as { cellData?: ColorFieldValue }

  const { className, style } = useBackgroundColor(cellData)

  return (
    <div
      className={`
          size-[20px] border border-solid
          border-[var(--theme-elevation-400)]
          ${className}
        `}
      style={style}
    />
  )
}
