import type { TextField } from 'payload'

export function createBlurDataUrlField(): TextField {
  return {
    name: 'blurDataUrl',
    type: 'text',
    label: '模糊 DataUrl',
    admin: {
      components: {
        Field: false,
      },
      hidden: true,
    },
  }
}
