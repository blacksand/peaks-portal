import type { GroupField, ImageSize } from 'payload'

import { createBlurDataUrlField } from './create-blur-data-url-field'
import { createBlurhashField } from './create-blurhash-field'

export function createBlurhashSizesField(
  sizes: ImageSize[],
  generateDataUrl?: boolean,
): GroupField {
  return {
    name: 'blurhashSizes',
    type: 'group',
    label: '模糊哈希尺寸',
    admin: {
      disableBulkEdit: true,
      disabled: true,
      disableListColumn: true,
      disableListFilter: true,
      readOnly: true,
    },

    fields: sizes.map((size) => ({
      name: size.name,
      type: 'group',
      fields: [
        createBlurhashField(),
        ...(generateDataUrl ? [createBlurDataUrlField()] : []),
      ],
    })),
  }
}
