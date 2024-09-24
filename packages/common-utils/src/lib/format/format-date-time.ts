import { isDate } from 'remeda'

import type { FormatNumberOptions } from './format-number'

export function formatDateTime(
  value: Date | string | undefined | null,
  { defaultValue, locale, ...options }: FormatNumberOptions = {},
) {
  if (!value) {
    return defaultValue
  }

  const date = isDate(value) ? value : new Date(value)
  return date.toLocaleString(locale ?? 'zh-CN', options)
}
