import type { CollectionConfig } from 'payload'

import { slugField } from '@peaks/cms-fields/slug'
import { access, createLabels, field, withRow } from '@peaks/cms-utils'
import { groups, slugs } from '@peaks/data-models'

export const tags: CollectionConfig = {
  slug: slugs.tags,
  labels: createLabels('标签'),

  access: {
    create: access.allowUser({ roles: ['admin', 'moderator'] }),
    delete: access.allowAdmins(),
    read: access.allowAnonymous(),
    update: access.allowUser({ roles: ['admin', 'moderator'] }),
  },
  admin: {
    defaultColumns: ['label', 'slug', 'color'],
    group: groups.content,
    listSearchableFields: ['label', 'slug', 'color'],
    useAsTitle: 'label',
  },

  fields: [
    withRow([
      field.text({
        name: 'label',
        label: '标签名',
        admin: { width: '50%' },
        required: true,
        unique: true,
      }),

      // iconField({
      //   name: 'icon',
      //   admin: { width: '50%' },
      //   custom: {
      //     placeholder: '<选择图标>',
      //     placeholderSearch: '过滤图标...',
      //     placeholderSelect: '选择图标集',
      //   },
      // }),
    ]),

    slugField({
      name: 'slug',
      admin: { position: 'sidebar' },
      fieldToUse: 'label',
      index: true,
      unique: true,
    }),

    field.richText({
      name: 'description',
      label: '标签描述',
      admin: {
        // elements: ['ul', 'ol', 'link', 'blockquote'],
        // leaves: ['bold', 'italic', 'underline'],
      },
    }),

    // colorField({
    //   name: 'defaultColor',
    //   label: '默认颜色',
    //   admin: {
    //     position: 'sidebar',
    //   },
    //   custom: {
    //     disableHexInput: true,
    //   },
    // }),
    //
    // colorField({
    //   name: 'darkThemeColor',
    //   label: '深色主题时颜色',
    //   admin: { position: 'sidebar' },
    // }),
  ],
}
