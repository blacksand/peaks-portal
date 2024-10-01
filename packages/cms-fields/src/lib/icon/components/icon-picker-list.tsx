import { Icon as ReactIcon } from '@iconify/react'
import { useEffect, useMemo, useState } from 'react'

import type { Icon, IconCollection } from '../field/types'
import { IconPickerPagination } from './icon-picker-pagination'

const pageSize = 100

export function IconPickerList({
  collection,
  icons,
  onIconChange,
}: {
  collection: IconCollection
  icons: Icon[]
  onIconChange: (icon: Icon) => void
}) {
  const [pageIndex, setPageIndex] = useState(0)

  // eslint-disable-next-line react-hooks-extra/no-direct-set-state-in-use-effect
  useEffect(() => setPageIndex(0), [icons])

  const pageCount = Math.ceil(icons.length / pageSize)
  if (pageIndex >= pageCount && pageCount > 0) {
    setPageIndex(pageCount - 1)
  }

  const pagedIcons = useMemo(
    () => icons.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
    [icons, pageIndex],
  )

  return (
    <div className="p-4">
      <IconPickerPagination
        filtered={icons.length}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageSize={pageSize}
        total={collection.total ?? 0}
        onPageChange={setPageIndex}
      />

      <div className="mt-8 grid grid-cols-fill gap-6 [--grid-cols-min-width:2rem]">
        {pagedIcons.map((icon) => (
          <button
            key={icon.name}
            className={`
              group inline-flex cursor-pointer flex-col items-center justify-center overflow-hidden
              rounded-sm border-none text-[var(--theme-elevation-600)] transition-transform
              hover:text-[var(--theme-elevation-900)]
            `}
            type="button"
            onClick={() => onIconChange(icon)}
          >
            <ReactIcon
              className="size-8 group-hover:scale-125"
              icon={icon.data}
            />
          </button>
        ))}
      </div>
    </div>
  )
}
