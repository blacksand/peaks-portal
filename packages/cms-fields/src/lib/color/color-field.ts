import type { GroupField, Validate } from 'payload'

import { createField, field } from '@peaks/cms-utils'

export interface ColorField extends GroupField {
  required?: boolean

  admin?: GroupField['admin'] & {
    allowAlpha?: boolean
    disablePicker?: boolean
  }
}

export const validateColor: Validate = () => {
  return 'unimplemented'
}

export function colorField({
  admin: { allowAlpha, disablePicker, ...admin } = {},
  ...overrides
}: Partial<ColorField>): GroupField {
  return createField(
    {
      name: 'color',
      type: 'group',
      label: 'Color',
      interfaceName: 'Color',
      validate: validateColor,

      admin: {
        components: {
          Cell: {
            path: '@peaks/cms-fields/components#ColorCellComponent',
          },
          Field: {
            clientProps: { allowAlpha, disablePicker },
            path: '@peaks/cms-fields/components#ColorFieldComponent',
          },
        },
        ...admin,
      },

      fields: [
        field.radio({
          name: 'type',
          label: 'Type',
          defaultValue: 'theme',
          options: [
            { label: '主题颜色', value: 'theme' },
            { label: '自定义', value: 'custom' },
          ],
        }),

        field.text({
          name: 'value',
          label: 'Value',
        }),
      ],
    },
    overrides,
  )
}
