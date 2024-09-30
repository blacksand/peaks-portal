'use client'

import { useTableCell } from '@payloadcms/ui'

import './blurhash-cell.scss'
import { ReactBlurhash } from './react-blurhash'

export function BlurhashCell() {
  const cellContext = useTableCell()

  const { cellData } = cellContext as { cellData?: string }

  return (
    <span>
      <span className="blurhash-cell">
        {cellData ? (
          <ReactBlurhash
            className="blurhash-cell__thumbnail"
            hash={cellData}
            height={60}
            width={80}
          />
        ) : undefined}
      </span>
    </span>
  )
}
