import { allowAdmins } from './allow-admins'
import { allowAdminsOrFrontends } from './allow-admins-or-frontends'
import { allowAdminsOrSelf } from './allow-admins-or-self'
import { allowAnonymous } from './allow-anonymous'
import { allowFrontends } from './allow-frontends'
import { allowPublished } from './allow-published'
import { allowUser } from './allow-user'
import { requireAll } from './require-all'
import { requireOne } from './require-one'

export const access = {
  allowAdmins,
  allowAdminsOrFrontends,
  allowAdminsOrSelf,
  allowAnonymous,
  allowFrontends,
  allowPublished,
  allowUser,
  requireAll,
  requireOne,
}
