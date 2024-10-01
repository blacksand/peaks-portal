import { Icon } from '@iconify/react'
import { Fragment } from 'react'
import type { MarkOptional } from 'ts-essentials'

import { ClearButton } from '../../common/clear-button'
import type { IconFieldClient, IconFieldValue } from '../field/types'

export function IconPickerTrigger({
  isClearable,
  path,
  placeholder,
  readOnly,
  rtl,
  value,
  onClear,
}: {
  field: MarkOptional<IconFieldClient, 'type'>
  isClearable?: boolean
  path: string
  placeholder: string | undefined
  readOnly: boolean | undefined
  rtl: boolean | undefined
  value: IconFieldValue | undefined
  onClear: () => void
}) {
  return (
    <Fragment key={path}>
      <input
        id={`field-${path?.replace(/\./g, '__')}`}
        className={`
          h-[40px] flex-1 rounded-[var(--style-radius-s)] border border-solid
          border-[var(--theme-elevation-150)] bg-[var(--theme-input-bg)] pe-[40px] ps-[40px]
          text-[1rem] leading-[20px] outline-0
          [.field-type.color.error_&]:border-[var(--theme-error-400)]
          [.field-type.color.error_&]:bg-[var(--theme-error-100)]
          focus:border-[var(--theme-elevation-400)] focus:outline-0
        `}
        name={path}
        data-rtl={rtl}
        disabled={readOnly}
        placeholder={placeholder}
        readOnly
        type="text"
        value={value?.name ? `${value.collection}:${value.name}` : ''}
      />

      <div className="absolute inset-y-0 left-0 m-[8px] w-[24px] text-center">
        {value?.data ? (
          <Icon className="size-[16px]" icon={value.data} />
        ) : (
          <div className="size-full border border-solid border-[var(--theme-elevation-150)]" />
        )}
      </div>

      <ClearButton
        className="absolute inset-y-0 right-0 !m-[8px] !rounded-none"
        hidden={!isClearable}
        onClear={onClear}
      />
    </Fragment>
  )
}
