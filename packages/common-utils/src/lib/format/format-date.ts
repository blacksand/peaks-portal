import { isDate } from 'remeda'

import type { FormatNumberOptions } from './format-number'

export function formatDate(
  value: Date | string | undefined | null,
  { defaultValue, locale, ...options }: FormatNumberOptions = {},
) {
  if (!value) {
    return defaultValue
  }

  const date = isDate(value) ? value : new Date(value)
  return date.toLocaleDateString(locale ?? 'zh-CN', options)
}
