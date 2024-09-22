import type { FormatNumberOptions } from './format-number'

export function formatCurrency(
  value: number,
  { locale, ...options }: FormatNumberOptions = {},
) {
  return value.toLocaleString(locale ?? 'zh-CN', {
    currency: 'CNY',
    style: 'currency',
    ...options,
  })
}
