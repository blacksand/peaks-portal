import type { BlurhashField } from './types'

export function createBlurhashField({
  admin,
  showBlurhash,
  ...overrides
}: Partial<BlurhashField> = {}) {
  const Cell = showBlurhash ? '@peaks/payload-plugin-blurhash/components#BlurhashCell' : undefined
  const Field = showBlurhash ? '@peaks/payload-plugin-blurhash/components#BlurhashField' : undefined

  return {
    name: 'blurhash',
    type: 'text',
    label: '模糊哈希',
    admin: {
      ...admin,
      components: {
        Cell,
        Field,
        ...admin?.components,
      },
      disableBulkEdit: true,
      disableListFilter: true,
      position: showBlurhash ? 'sidebar' : undefined,
      readOnly: true,
    },
    ...overrides,
  } as BlurhashField
}
