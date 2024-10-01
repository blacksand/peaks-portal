'use client'

import { Icon } from '@iconify/react'
import { useTableCell } from '@payloadcms/ui'

import type { IconFieldValue } from '../field/types'

export function IconCell() {
  const cellContext = useTableCell()

  const { cellData } = cellContext as { cellData?: IconFieldValue }

  return cellData?.data ? <Icon icon={cellData.data} /> : null
}
