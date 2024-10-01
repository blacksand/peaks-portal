'use client'

import { getTranslation } from '@payloadcms/translations'
import { useField, useTranslation } from '@payloadcms/ui'

import './blurhash-field.css'
import { ReactBlurhash } from './react-blurhash'
import type { BlurhashFieldProps } from './types'

export function BlurhashField({ label, path }: BlurhashFieldProps) {
  const { value } = useField({ path })
  const { i18n } = useTranslation()

  return (
    typeof value === 'string' && (
      <div className="field-type field-blurhash">
        <div className="blurhash">
          <ReactBlurhash
            className="blurhash__image"
            hash={value}
            height={90}
            width={120}
          />
          <div className="blurhash__detail">
            <div className="blurhash-label">{getTranslation(label, i18n)}</div>
            <div className="blurhash-value">{value}</div>
          </div>
        </div>
      </div>
    )
  )
}
