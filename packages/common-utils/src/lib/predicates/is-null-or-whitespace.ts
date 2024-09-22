import { isWhitespace } from './is-whitespace'

export function isNullOrWhitespace(value: string | null | undefined) {
  return value == null || isWhitespace(value)
}
