import { slugs } from '@peaks/data-models'

import { ADMIN_ROLE_NAMES } from '../roles/app-roles'
import { allowUser } from './allow-user'

export function allowAdmins() {
  return allowUser({ collection: slugs.users, roles: ADMIN_ROLE_NAMES })
}
