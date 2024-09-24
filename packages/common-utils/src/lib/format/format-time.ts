import type { FormatNumberOptions } from './format-number'

export function formatTime(
  value: Date,
  { locale, ...options }: FormatNumberOptions = {},
) {
  return value.toLocaleTimeString(locale ?? 'zh-CN', options)
}
