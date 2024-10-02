import type { CollectionConfig } from 'payload'

import { linkField } from '@peaks/cms-fields/link'
import { access, createLabels, field } from '@peaks/cms-utils'
import { groups, slugs } from '@peaks/data-models'

// import { revalidateFrontend } from '../hooks/revalidate-frontend';

export const frontends: CollectionConfig = {
  slug: slugs.frontends,
  labels: createLabels('客户端应用'),

  admin: {
    defaultColumns: ['name', 'displayName', 'frontendURL', 'createdAt'],
    group: groups.system,
    listSearchableFields: ['name', 'displayName'],
    useAsTitle: 'displayName',
  },

  access: {
    create: access.allowAdmins(),
    delete: access.allowAdmins(),
    read: access.allowAdminsOrFrontends('id'),
    update: access.allowAdmins(),
  },

  // hooks: {
  //   afterChange: [revalidateFrontend],
  // },

  fields: [
    field.row({
      fields: [
        field.text({
          name: 'name',
          label: '名称',
          admin: { width: '50%' },
          index: true,
          required: true,
          unique: true,
        }),

        field.text({
          name: 'displayName',
          label: '显示名称',
          admin: { width: '50%' },
          required: true,
        }),
      ],
    }),

    field.text({
      name: 'frontendURL',
      label: '前端应用网址',
      required: true,
    }),

    field.text({
      name: 'previewUrl',
      label: '预览页面网址',
      // required: true,
    }),

    field.array({
      name: 'menus',
      label: '导航链接',
      labels: createLabels('链接'),
      fields: linkField().fields,
      interfaceName: 'NavigationMenu',
    }),
  ],
}
