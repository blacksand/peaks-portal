import { allowAdmins } from './allow-admins'
import { allowFrontends } from './allow-frontends'
import { requireOne } from './require-one'

export function allowAdminsOrFrontends(fieldName: string) {
  return requireOne(
    allowAdmins(),
    allowFrontends(fieldName),
  )
}
