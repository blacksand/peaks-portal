export interface FormatNumberOptions extends Intl.NumberFormatOptions {
  defaultValue?: string
  locale?: string
}

export function formatNumber(
  value: number | undefined | null,
  { defaultValue, locale, ...options }: FormatNumberOptions = {},
) {
  if (value == null || Number.isNaN(value)) {
    return defaultValue
  }

  return value.toLocaleString(locale ?? 'zh-CN', options)
}
