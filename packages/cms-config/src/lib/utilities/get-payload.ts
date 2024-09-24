import 'server-only'

import { getPayloadHMR } from '@payloadcms/next/utilities'

import { getCachedPayload } from '../config/cached-local-api'
import configPromise from '../payload-config'

export async function getPayload() {
  return getPayloadHMR({ config: configPromise })
}

export async function getPayloadWithCache() {
  const payload = await getPayloadHMR({ config: configPromise })
  return getCachedPayload(payload)
}
