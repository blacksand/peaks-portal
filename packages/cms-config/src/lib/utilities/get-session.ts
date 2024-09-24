import 'server-only'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import { headers } from 'next/headers'
import type { Permissions, TypedUser } from 'payload'
import { extractJWT } from 'payload'
import { cache } from 'react'

import config from '../payload-config'

export interface ServerSession {
  permissions: Permissions
  token: string | undefined
  user: TypedUser | null | undefined
}

async function makeSession(): Promise<ServerSession> {
  const payload = await getPayloadHMR({ config })
  const token = extractJWT({ headers: headers(), payload }) ?? undefined

  const { permissions, user } = await payload.auth({ headers: headers() })
  return { permissions, token, user }
}

export const getSession = cache(makeSession)
