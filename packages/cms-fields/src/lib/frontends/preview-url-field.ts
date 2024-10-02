import type { TextField } from 'payload'

import { field } from '@peaks/cms-utils'

import { populatePreviewUrl } from './hooks/populate-preview-url'

export function previewUrlField(): TextField {
  return field.text({
    name: 'previewUrl',
    label: '预览链接',
    admin: {
      hidden: true,
    },
    hooks: {
      afterRead: [populatePreviewUrl('frontend')],
    },
    virtual: true,
  })
}
