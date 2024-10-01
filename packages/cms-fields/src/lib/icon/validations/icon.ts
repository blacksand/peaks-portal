import { json } from 'payload/shared'
import { isEmpty, isNot, isPlainObject, isTruthy } from 'remeda'

const isNotEmpty = isNot(isEmpty)

export const icon: typeof json = (
  value,
  options,
) => {
  if (isTruthy(value)) {
    if (!isPlainObject(value)) {
      return 'icon must be an object'
    }

    if (isNotEmpty(value) && (!value.name || !value.data || !value.collection)) {
      return 'icon is invalid'
    }

    return true
  }

  return json(value, options)
}
