import type { CollectionConfig } from 'payload'

import { access, createLabels, field } from '@peaks/cms-utils'
import { groups, slugs } from '@peaks/data-models'
import { setAuditFields } from '@peaks/payload-plugin-audit-fields'
import { setBlurhash } from '@peaks/payload-plugin-blurhash'

export const media: CollectionConfig = {
  slug: slugs.media,
  labels: createLabels('媒体文件'),
  defaultSort: '-createdAt',

  access: {
    create: access.allowUser(),
    delete: access.allowAdminsOrSelf('createdBy'),
    read: access.allowAnonymous(),
    update: access.allowAdminsOrSelf('createdBy'),
  },

  admin: {
    defaultColumns: ['filename', 'caption', 'mimeType', 'fileSize'],
    group: groups.resource,
    listSearchableFields: ['filename', 'caption', 'mimeType', 'createdBy'],
    useAsTitle: 'filename',
  },

  custom: {
    ...setBlurhash({ showBlurhash: true }),
    ...setAuditFields({ showInSidebar: true }),
  },

  upload: {
    adminThumbnail: 'thumbnail',
    imageSizes: [
      {
        name: 'thumbnail',
        fit: 'cover',
        height: 300,
        width: 400,
      },
      {
        name: 'mobile',
        fit: 'inside',
        height: undefined,
        width: 1024,
      },
      {
        name: 'desktop',
        fit: 'inside',
        height: undefined,
        width: 1560,
      },
    ],
    staticDir: `./upload/${slugs.media}`,
  },

  fields: [
    field.text({
      name: 'prefix',
      label: 'prefix',
      admin: {
        disabled: true,
      },
      defaultValue: slugs.media,
    }),

    field.text({
      name: 'caption',
      label: '图片标题',
    }),
  ],
}
