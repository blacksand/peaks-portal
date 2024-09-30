'use client'

import { useTableCell } from '@payloadcms/ui'
import type { CellComponentProps } from 'payload'

export function AuditUiCell({ className }: CellComponentProps) {
  const { rowData } = useTableCell()

  const { createdByUser, updatedByUser } = (rowData ?? {}) as {
    createdByUser?: string
    updatedByUser?: string
  }

  const text = [
    `最后修改人: ${updatedByUser || '-'}`,
    `创建人: ${createdByUser || '-'}`,
  ]

  return <span className={className}>{text.join(', ')}</span>
}
