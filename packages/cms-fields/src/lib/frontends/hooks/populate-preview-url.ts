import type { FieldHook, TypeWithID } from 'payload'

import { isObject } from '@peaks/common-utils'
import type { Perhaps } from '@peaks/common-utils'
import { slugs } from '@peaks/data-models'
import type { Frontend } from '@peaks/data-models/payload-types'

export function populatePreviewUrl<
  T extends TypeWithID & Record<K, Frontend | string | undefined>,
  K extends string,
>(fieldName: K): FieldHook<T, Perhaps<string>, T> {
  return async ({ req, siblingData }) => {
    const frontendOrID = siblingData[fieldName]

    if (!frontendOrID) {
      return undefined
    }

    if (isObject(frontendOrID)) {
      return frontendOrID.previewURL
    }

    const frontend = await req.payload.findByID({
      id: frontendOrID as string,
      collection: slugs.frontends,
      req,
    })

    return frontend?.previewURL
  }
}
