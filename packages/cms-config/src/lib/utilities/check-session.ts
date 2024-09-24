import { redirect } from 'next/navigation'
import type { CollectionSlug } from 'payload'

import { getCurrentUrl } from './get-current-url'
import { getSession } from './get-session'

type PermissionOperator = 'create' | 'read' | 'update' | 'delete'

interface RequirePermission {
  collection: CollectionSlug
  operator: PermissionOperator
}

export async function checkSession(permissions?: RequirePermission[], requireAll = true) {
  const session = await getSession()
  const currentUrl = getCurrentUrl()

  if (!session.permissions || !session.user) {
    redirect(`/login?returnUrl=${currentUrl}`)
  }

  if (!permissions?.length) {
    return
  }

  for (const { collection, operator = 'read' } of permissions) {
    if (!collection || !operator) {
      throw new Error(`Invalid permission: ${collection}.${operator}`)
    }

    const operatorPermission = session.permissions.collections[collection]?.[operator]
    if (!operatorPermission || typeof operatorPermission.permission !== 'boolean') {
      throw new Error(`Invalid permission: ${collection}.${operator}`)
    }

    const { permission } = operatorPermission
    if (requireAll && !permission) {
      redirect(`/login?returnUrl=${currentUrl}`)
    }

    if (permission && !requireAll) {
      return
    }
  }
}
