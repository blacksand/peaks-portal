import type { ClientSession } from '@peaks/data-models'

import type { ServerSession } from './get-session'

export function makeClientSession(session: ServerSession): ClientSession {
  const { permissions, token, user } = session
  if (!user) {
    return { isLoggedIn: false, permissions }
  }

  const { id, name, username, roles } = user
  return { isLoggedIn: true, permissions, token, user: { id, name, username, roles } }
}
