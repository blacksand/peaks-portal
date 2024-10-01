'use client'

import { useTableCell } from '@payloadcms/ui'

import './blurhash-cell.css'
import { ReactBlurhash } from './react-blurhash'

export function BlurhashCell() {
  const cellContext = useTableCell()

  const { cellData } = cellContext as { cellData?: string }

  return (
    <div className="blurhash-cell">
      {cellData ? (
        <ReactBlurhash
          className="blurhash-cell__thumbnail"
          hash={cellData}
          height={40}
          width={60}
        />
      ) : undefined}
    </div>
  )
}
