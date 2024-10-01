import { useLocale, useTranslation } from '@payloadcms/ui'
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from 'lucide-react'

import { formatNumber } from '@peaks/common-utils'

export function IconPickerPagination({
  filtered,
  pageCount,
  pageIndex,
  pageSize,
  total,
  onPageChange,
}: {
  filtered: number
  pageCount: number
  pageIndex: number
  pageSize: number
  total: number
  onPageChange: (value: number) => void
}) {
  const locale = useLocale()
  const { t } = useTranslation()

  const totalInfo =
    filtered === total
      ? t('icon-field:totalIconsCount' as never, { total: formatNumber(total, { locale: locale.code }) })
      : t('icon-field:filteredIconsCount' as never, { filtered: formatNumber(filtered, { locale: locale.code }) })

  const currentBegin = pageIndex * pageSize + 1
  const currentEnd = Math.min(currentBegin + pageSize - 1, filtered)
  const currentInfo =
    filtered > 0
      ? t('icon-field:currentIconsCount' as never, {
        currentBegin: formatNumber(currentBegin, { locale: locale.code }),
        currentEnd: formatNumber(currentEnd, { locale: locale.code }),
      })
      : ''

  const iconsInfo = [totalInfo, currentInfo].filter(Boolean).join(', ')

  const pageInfo =
    pageCount === 0 ? t('icon-field:emptyContent' as never) : `${pageIndex + 1} / ${pageCount}`

  return (
    <div className="flex items-center gap-[8px] overflow-hidden">
      <div className="flex-1 whitespace-pre-line text-[var(--theme-elevation-800)]">{iconsInfo}</div>

      <div className="text-[var(--theme-elevation-800)]">{pageInfo}</div>

      <button
        className={`
          inline-flex size-[24px] items-center justify-center border border-solid
          border-[var(--theme-elevation-150)]
          disabled:cursor-not-allowed disabled:text-[var(--theme-elevation-500)]
        `}
        aria-label="first page"
        disabled={pageCount === 0 || pageIndex === 0}
        type="button"
        onClick={() => onPageChange(0)}
      >
        <ChevronFirst className="size-[16px]" />
      </button>
      <button
        className={`
          inline-flex size-[24px] items-center justify-center border border-solid
          border-[var(--theme-elevation-150)]
          disabled:cursor-not-allowed disabled:text-[var(--theme-elevation-500)]
        `}
        aria-label="previous page"
        disabled={pageIndex <= 0}
        type="button"
        onClick={() => onPageChange(pageIndex - 1)}
      >
        <ChevronLeft className="size-[16px]" />
      </button>

      <button
        className={`
          inline-flex size-[24px] items-center justify-center border border-solid
          border-[var(--theme-elevation-150)]
          disabled:cursor-not-allowed disabled:text-[var(--theme-elevation-500)]
        `}
        aria-label="next page"
        disabled={pageIndex >= pageCount - 1}
        type="button"
        onClick={() => onPageChange(pageIndex + 1)}
      >
        <ChevronRight className="size-[16px]" />
      </button>
      <button
        className={`
          inline-flex size-[24px] items-center justify-center border border-solid
          border-[var(--theme-elevation-150)]
          disabled:cursor-not-allowed disabled:text-[var(--theme-elevation-500)]
        `}
        aria-label="last page"
        disabled={pageCount === 0 || pageIndex === pageCount - 1}
        type="button"
        onClick={() => onPageChange(pageCount - 1)}
      >
        <ChevronLast className="size-[16px]" />
      </button>
    </div>
  )
}
