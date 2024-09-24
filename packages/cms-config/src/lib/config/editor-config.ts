import { FixedToolbarFeature, lexicalEditor, UploadFeature } from '@payloadcms/richtext-lexical'

import { field } from '@peaks/cms-utils'

import { media } from '../collections/media'

export const editorConfig = lexicalEditor({
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    UploadFeature({
      collections: {
        [media.slug]: {
          fields: [
            // blockSizingField(), mediaSettingsField()
            field.text({
              name: 'caption',
              label: '图片描述',
            }),
          ],
        },
      },
    }),
    FixedToolbarFeature(),
  ],
})
