import type { CollectionConfig } from 'payload'

import { access, ALL_ROLES, createLabels, DEFAULT_ROLES, field } from '@peaks/cms-utils'
import { slugs } from '@peaks/data-models'

export const users: CollectionConfig = {
  slug: slugs.users,
  labels: createLabels('用户'),

  admin: {
    defaultColumns: ['username', 'email', 'name', 'roles', 'createdAt'],
    group: '系统管理',
    listSearchableFields: ['username', 'email', 'name', 'roles'],
    useAsTitle: 'name',
  },

  auth: {
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: false,
      requireUsername: true,
    },
    tokenExpiration: 60 * 60 * 24 * 7,
    useAPIKey: true,
    verify: false,
  },

  custom: {
    auditFields: {
      position: 'bottom',
    },
  },

  access: {
    admin: access.allowUser({ roles: ['admin', 'contributor', 'editor', 'moderator'] }),
    create: access.allowAdmins(),
    delete: access.allowAdmins(),
    read: access.allowAdminsOrSelf('id'),
    update: access.allowAdminsOrSelf('id'),
  },
  hooks: {
    // beforeChange: [createStripeCustomer],
    // afterChange: [loginAfterCreate],
  },

  fields: [
    field.email({
      name: 'email',
      label: '邮箱',
      required: true,
      unique: true,
    }),

    field.text({
      name: 'username',
      label: '账号',
      required: true,
      saveToJWT: true,
      unique: true,
    }),

    field.text({ name: 'name', label: '显示名' }),

    field.select({
      name: 'roles',
      label: '角色',
      access: {
        create: access.allowAdmins(),
        update: access.allowAdmins(),
      },
      admin: {
        description: `新用户默认角色：${DEFAULT_ROLES.map(({ label }) => label).join(', ')}`,
      },
      defaultValue: DEFAULT_ROLES.map(({ name }) => name),
      hasMany: true,
      hooks: {
        // beforeChange: [protectRolesBeforeCreate],
      },
      options: ALL_ROLES.map(({ name: value, label }) => ({ label, value })),
      required: true,
      saveToJWT: true,
    }),

    // field.relationship({
    //   name: 'frontends',
    //   label: '关联的前端应用',
    //   access: {
    //     create: access.allowAdmins(),
    //     read: access.allowAdmins(),
    //     update: access.allowAdmins(),
    //   },
    //   admin: {
    //     description: '用户允许访问的前端应用',
    //   },
    //   hasMany: true,
    //   maxDepth: 0,
    //   relationTo: slugs.frontends,
    //   required: false,
    //   saveToJWT: true,
    // }),
  ],
}
