import type { JSONField } from 'payload'

import { icon } from '../validations/icon'
import type { IconField } from './types'

export function iconField({
  name,
  label,
  admin,
  custom: {
    placeholder = { en: 'Select icon...', zh: '选择图标...' },
    rtl,
    svgIcons,
    ...custom
  } = {},
  validate,
  ...options
}: Partial<IconField> = {}): JSONField {
  const clientProps = { placeholder, rtl, svgIcons }

  const components = {
    ...admin?.components,
    Cell: admin?.components?.Cell ?? {
      clientProps,
      path: '@peaks/cms-fields/components#IconCell',
    },
    Field: admin?.components?.Field ?? {
      clientProps,
      path: '@peaks/cms-fields/components#IconField',
    },
  }

  return {
    ...options,
    name: name ?? 'icon',
    type: 'json',
    label: label ?? { en: 'Icon', zh: '图标' },
    admin: { ...admin, components },
    custom,
    validate: validate ?? icon,
  }
}
