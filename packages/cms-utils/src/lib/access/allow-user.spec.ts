import type { AccessArgs, CollectionSlug, User } from 'payload'
import { describe, expect, it } from 'vitest'

import type { RoleName } from '../roles/types'
import { allowUser } from './allow-user'

describe('allowUser function', () => {
  const user = {
    id: '1',
    collection: 'users',
    roles: ['admin', 'editor'],
  } satisfies User

  const request = { req: { user } } as AccessArgs

  it('allows any user', () => {
    const allowAnyUser = allowUser({})
    const result = allowAnyUser(request)
    expect(result).toBe(true)
  })

  it('allows user with "admin" role', () => {
    const allowOnlyAdminUser = allowUser({ roles: ['admin'] })
    const result = allowOnlyAdminUser(request)
    expect(result).toBe(true)
  })

  it('allows user with "editor" role', () => {
    const allowOnlyEditorUser = allowUser({ roles: ['editor'] })
    const result = allowOnlyEditorUser(request)
    expect(result).toBe(true)
  })

  it('disallows user not from "admins" collection', () => {
    const allowOnlyUsersFromSpecificCollection = allowUser({ collection: 'admins' as CollectionSlug })
    const result = allowOnlyUsersFromSpecificCollection(request)
    expect(result).toBe(false)
  })

  it('disallows user without all required roles', () => {
    const allowOnlyUsersWithAllRoles = allowUser({
      requireAll: true,
      roles: ['admin', 'editor', 'subscriber'] as RoleName[],
    })
    const result = allowOnlyUsersWithAllRoles(request)
    expect(result).toBe(false)
  })
})
