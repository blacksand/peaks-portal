import type { FieldHook, TypeWithID } from 'payload'

import type { Perhaps } from '@peaks/common-utils'
import type { Frontend } from '@peaks/data-models/payload-types'

export function populateFrontend(): FieldHook<TypeWithID, Perhaps<string | Frontend>, unknown> {
  return ({ operation, req: { user }, value }) => {
    if (value != null || (operation !== 'create' && operation !== 'update')) {
      return value
    }

    if (user?.frontends?.length) {
      return user.frontends[0]
    }

    throw new Error('无法确定关联的前端应用')
  }
}
