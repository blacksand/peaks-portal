import { cache } from 'react'

import type { LocalApiClient } from '@peaks/data-access'

import { getPayload, getPayloadWithCache } from './get-payload'
import { getSession } from './get-session'

async function makeLocalClient(): Promise<LocalApiClient> {
  const payload = await getPayload()
  const cachedPayload = await getPayloadWithCache()

  const depth = 0
  const overrideAccess = false
  const { user } = await getSession()

  return {
    auth: (params) => payload.auth(params),

    count: (params) => cachedPayload.count({ depth, overrideAccess, user, ...params }),

    create: (params) => payload.create({ overrideAccess, user, ...params }),

    find: (params) => cachedPayload.find({ depth, overrideAccess, user, ...params }),

    // @ts-expect-error return doc or null if disableErrors and not found
    findByID: (params) => cachedPayload.findByID({ depth, overrideAccess, user, ...params }),

    findGlobal: (params) => cachedPayload.findGlobal({ depth, overrideAccess, user, ...params }),

    findOne: (params) => cachedPayload.findOne({ depth, overrideAccess, user, ...params }),

    update: ({ id, where = { id: { exists: false } }, ...params }) =>
      id
        ? payload.update({ id, overrideAccess, user, ...params })
        : payload.update({ overrideAccess, user, where, ...params }),

    updateGlobal: (params) => payload.findGlobal({ overrideAccess, user, ...params }),
  }
}

export const getLocalClient = cache(makeLocalClient)
