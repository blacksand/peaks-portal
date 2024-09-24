import { cache } from 'react'

import type { LocalApiClient } from '@peaks/data-access'

import { getPayload, getPayloadWithCache } from './get-payload'
import { getSession } from './get-session'

async function makeLocalClient(): Promise<LocalApiClient> {
  const payload = await getPayload()
  const cachedPayload = await getPayloadWithCache()

  const depth = 0
  const { user } = await getSession()

  return {
    auth: (params) => payload.auth(params),

    count: (params) => cachedPayload.count({ depth, overrideAccess: false, user, ...params }),

    create: (params) => payload.create({ overrideAccess: false, user, ...params }),

    find: (params) => cachedPayload.find({ depth, overrideAccess: false, user, ...params }),

    findByID: (params) =>
      // @ts-expect-error return doc or null when disableErrors and not found
      cachedPayload.findByID({ depth, overrideAccess: false, user, ...params }),

    findGlobal: (params) =>
      cachedPayload.findGlobal({ depth, overrideAccess: false, user, ...params }),

    findOne: (params) => cachedPayload.findOne({ depth, overrideAccess: false, user, ...params }),

    update: ({ id, where = {}, ...params }) => {
      return id
        ? payload.update({ id, overrideAccess: false, user, ...params })
        : payload.update({ overrideAccess: false, user, where, ...params })
    },

    updateGlobal: (params) => payload.findGlobal({ overrideAccess: false, user, ...params }),
  }
}

export const getLocalClient = cache(makeLocalClient)
