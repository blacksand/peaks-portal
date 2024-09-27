import { isString } from '@peaks/common-utils'

import { regex } from './regex'

function slug(value: string, maintainCase = false) {
  return (maintainCase ? value : value.toLowerCase())
    .replaceAll(regex, '')
    .replaceAll(/\s+/g, '-')
}

export function generateSlug(value: unknown, maintainCase = false) {
  return isString(value) ? slug(value, maintainCase) : ''
}
