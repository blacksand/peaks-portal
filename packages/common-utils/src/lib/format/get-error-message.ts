import { isObjectAnd } from '../predicates/is-object-and'
import { isString } from '../predicates/is-string'

export function getErrorMessage(error: unknown, defaultMessage?: string) {
  if (isString(error)) {
    return error
  }

  if (
    error instanceof Error ||
    isObjectAnd<Error>(error, (reason) => isString(reason.message))
  ) {
    return error.message
  }

  return defaultMessage ?? '未知错误'
}
