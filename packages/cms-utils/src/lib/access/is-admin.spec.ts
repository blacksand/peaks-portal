import type { User } from 'payload'

import { isAdmin } from './is-admin'

describe('isAdmin function', () => {
  it('should return false if user or user.collection is undefined', () => {
    const user: Partial<User> = {}
    const result = isAdmin(user as User)
    expect(result).toBe(false)
  })

  it('should return false if user.roles is empty', () => {
    const user: Partial<User> = {
      collection: 'users',
      roles: [],
    }
    const result = isAdmin(user as User)
    expect(result).toBe(false)
  })

  it('should return true if user has admin role', () => {
    const user: Partial<User> = {
      collection: 'users',
      roles: ['admin'],
    }
    const result = isAdmin(user as User)
    expect(result).toBe(true)
  })
})
