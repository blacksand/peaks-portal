import type { CollectionConfig } from 'payload'

import { slugs } from '@peaks/data-models'
// import { colorField } from '@peaks-cms/field-color';
import { access, createLabels, field, withRow } from '@peaks/cms-utils'
// import { iconField } from '@peaks-cms/field-icon';
// import { slugField } from '@peaks-cms/field-slug';

export const categories: CollectionConfig = {
  slug: slugs.categories,
  labels: createLabels('栏目类别'),
  access: {
    create: access.allowUser({ roles: ['admin', 'moderator'] }),
    delete: access.allowAdmins(),
    read: access.allowAnonymous(),
    update: access.allowUser({ roles: ['admin', 'moderator'] }),
  },
  admin: {
    defaultColumns: ['label', 'color', 'slug', 'createdAt'],
    group: '内容管理',
    useAsTitle: 'label',
  },
  fields: [
    withRow([
      field.text({
        name: 'label',
        label: '栏目名',
        required: true,
      }),

      // slugField({
      field.text({
        name: 'slug',
        unique: true,
        // fromField: 'label',
      }),
    ]),

    withRow([
      // colorField({
      //   name: 'color',
      //   label: '主题颜色',
      //   admin: { width: '50%' },
      // }),
      //
      // iconField({
      //   name: 'icon',
      //   label: '主题图标',
      //   admin: { width: '50%' },
      // }),
    ]),

    field.richText({
      name: 'description',
      label: '栏目描述',
      admin: {
        // elements: ['ul', 'ol', 'link', 'blockquote'],
        // leaves: ['bold', 'italic', 'underline'],
      },
    }),
  ],
}
