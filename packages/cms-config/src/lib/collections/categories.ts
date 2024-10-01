import { createBreadcrumbsField, createParentField } from '@payloadcms/plugin-nested-docs'
import type { CollectionConfig } from 'payload'

import { colorField } from '@peaks/cms-fields/color'
import { iconField } from '@peaks/cms-fields/icon'
import { access, createLabels, field, withRow } from '@peaks/cms-utils'
import { groups, slugs } from '@peaks/data-models'
// import { iconField } from '@peaks-cms/field-icon';
import { slugField } from '@peaks/cms-fields/slug'

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
    group: groups.content,
    useAsTitle: 'label',
  },
  fields: [
    withRow([
      field.text({
        name: 'label',
        label: '栏目名',
        required: true,
      }),

      slugField({
        name: 'slug',
        label: '网址后缀',
        fieldToUse: 'label',
        unique: true,
      }),
    ]),

    createParentField(slugs.categories, {
      name: 'parent',
      label: '上级栏目',
      admin: {
        position: 'sidebar',
      },
    }),

    createBreadcrumbsField(slugs.categories, {
      name: 'breadcrumbs',
      label: '栏目层级',
      labels: createLabels('层级'),
      admin: {
        position: 'sidebar',
      },
    }),

    withRow([
      colorField({
        name: 'color',
        label: '主题颜色',
        admin: {
          allowAlpha: true,
          disablePicker: false,
          width: '50%',
        },
      }),

      iconField({
        name: 'icon',
        label: '主题图标',
        admin: { width: '50%' },
      }),
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
