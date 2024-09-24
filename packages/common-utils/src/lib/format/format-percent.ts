import type { FormatNumberOptions } from './format-number'

export function formatPercent(
  value: number,
  { locale, ...options }: FormatNumberOptions = {},
) {
  return value.toLocaleString(locale ?? 'zh-CN', {
    style: 'percent',
    ...options,
  })
}
