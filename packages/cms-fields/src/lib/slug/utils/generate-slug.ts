import { isString } from '@peaks/common-utils'

import { regex } from './regex'

function slug(value: string, maintainCase = false) {
  return (maintainCase ? value.toLowerCase() : value)
    .replaceAll(regex, '')
    .replaceAll(' ', '-')
}

export function generateSlug(value: unknown) {
  return isString(value) ? slug(value) : ''
}
