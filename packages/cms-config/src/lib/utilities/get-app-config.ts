import { cache } from 'react'

import { slugs } from '@peaks/data-models'
import type { AppConfig } from '@peaks/data-models'
import type { Config } from '@peaks/data-models/payload-types'

import configPromise from '../payload-config'

export const getAppConfig = cache(async () => {
  const config = await configPromise
  const { admin, routes, serverURL } = config

  return {
    admin: {
      user: (admin.user ?? slugs.users) as keyof Config['auth'],
    },

    title: admin.meta.title,

    endpoints: {
      admin: `${serverURL}${routes.admin}`,
      api: `${serverURL}${routes.api}`,
      graphql: `${serverURL}${routes.api}${routes.graphQL}`,
      server: serverURL,
      upload: `${serverURL}/upload`,
    },

    fetchParams: {
      // next 服务端的 fetch 不会携带证书, 如果需要用户信息使用 JWT token header
      credentials: 'omit',
      headers: {
        'Accept-Language': 'zh',
        'Content-Type': 'application/json',
      },
    },
  } satisfies AppConfig
})
