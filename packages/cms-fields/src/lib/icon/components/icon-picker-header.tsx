import { ReactSelect, useTranslation } from '@payloadcms/ui'
import type { OptionObject } from 'payload'
import { useMemo } from 'react'
import { entries, groupBy, map, pipe } from 'remeda'

import { ClearButton } from '../../common/clear-button'
import type { IconCollection } from '../field/types'

export interface IconPickerHeaderProps {
  collections: IconCollection[]
  isLoading: boolean
  rtl: boolean | undefined
  searchTerm: string
  selected: string | undefined
  onCollectionChange: (prefix: string) => void
  onSearchTermChange: (value: string) => void
}

export function IconPickerHeader({
  collections,
  isLoading,
  rtl,
  searchTerm,
  selected,
  onCollectionChange,
  onSearchTermChange,
}: IconPickerHeaderProps) {
  const { t } = useTranslation()
  const searchPlaceholder = t('icon-field:search' as never)

  const collectionOptions = useMemo(() => {
    return pipe(
      collections,
      groupBy(({ category }) => category || 'Custom'),
      entries(),
      map(([category, items]) => ({
        label: category,
        options: items.map(({ name, prefix }) => ({ label: name, value: prefix })),
      })),
    )
  }, [collections])

  const selectedOption = useMemo(() => {
    for (const group of collectionOptions) {
      for (const option of group.options) {
        if (option.value === selected) {
          return option
        }
      }
    }

    return undefined
  }, [collectionOptions, selected])

  const handleCollectionChange = ({ value }: OptionObject) => {
    onCollectionChange(value)
  }

  return (
    <div className="flex w-full flex-wrap items-center gap-4">
      <ReactSelect
        className="flex-1"
        isClearable={false}
        isCreatable={false}
        isLoading={isLoading}
        isMulti={false}
        options={collectionOptions}
        showError={false}
        value={selectedOption}
        // @ts-expect-error bad type
        onChange={handleCollectionChange}
      />

      <div className="relative flex-1">
        <input
          className={`
            h-[40px] w-full rounded-[var(--style-radius-s)] border border-solid
            border-[var(--theme-elevation-150)] bg-[var(--theme-input-bg)] pe-[40px] ps-[16px]
            text-[1rem] leading-[20px] outline-0
            [.field-type.color.error_&]:border-[var(--theme-error-400)]
            [.field-type.color.error_&]:bg-[var(--theme-error-100)]
            focus:border-[var(--theme-elevation-400)] focus:outline-0
          `}
          data-rtl={rtl}
          placeholder={searchPlaceholder}
          type="text"
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
        />

        <ClearButton
          className="absolute inset-y-0 right-0 !m-[8px] !rounded-none"
          hidden={!searchTerm}
          onClear={() => onSearchTermChange('')}
        />
      </div>
    </div>
  )
}
