import type { JSONField, Validate } from 'payload'

import { createField } from '@peaks/cms-utils'

export interface ColorField extends JSONField {
  required?: boolean

  admin?: JSONField['admin'] & {
    allowAlpha?: boolean
    disablePicker?: boolean
  }
}

export const validateColor: Validate = (value, options) => {
  if (options.required && value == null) {
    return 'required'
  }

  return true
}

export function colorField({
  admin: { allowAlpha, disablePicker, ...admin } = {},
  ...overrides
}: Partial<ColorField>): JSONField {
  return createField(
    {
      name: 'color',
      type: 'json',
      label: 'Color',
      validate: validateColor,

      admin: {
        components: {
          Cell: {
            path: '@peaks/cms-fields/components#ColorCell',
          },
          Field: {
            clientProps: { allowAlpha, disablePicker },
            path: '@peaks/cms-fields/components#ColorField',
          },
        },
        ...admin,
      } as JSONField['admin'],
    },
    overrides,
  )
}
