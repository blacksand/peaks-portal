'use client'

import { useFormFields } from '@payloadcms/ui'
import { useMemo } from 'react'
import type { Dictionary } from 'ts-essentials'

import { AuditUiContent } from './audit-ui-content'
import type { AuditUIContentItem } from './types'

export function AuditUiField() {
  const { createdBy, updatedBy } = useFormFields(
    ([fields]) =>
      ({
        createdBy: fields.createdByUser,
        updatedBy: fields.updatedByUser,
      }) as Dictionary<{ value?: string }>,
  )

  const items: AuditUIContentItem[] = useMemo(
    () => [
      { name: updatedBy?.value ?? '--', title: '最后修改人' },
      { name: createdBy?.value ?? '--', title: '创建人' },
    ],
    [createdBy?.value, updatedBy?.value],
  )

  return <AuditUiContent items={items} />
}
