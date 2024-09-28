import { FieldError } from '@payloadcms/ui'
import type { FieldErrorClientProps } from 'payload'
import type { MouseEvent } from 'react'

import { ClearButton } from '../../common/clear-button'
import type { ColorFieldClient } from './types'

export function ColorPickerTrigger({
  errorProps,
  field,
  path,
  readOnly,
  value,
  onClear,
}: {
  errorProps?: FieldErrorClientProps<ColorFieldClient>
  field: ColorFieldClient
  path: string
  readOnly?: boolean | undefined
  value?: string
  onClear?: () => void
}) {
  const handleClear = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    onClear?.()
  }

  return (
    <div className="relative flex h-[40px] w-full items-center">
      <FieldError field={field} path={path} {...errorProps} />

      <input
        id={`field-${path.replaceAll('.', '__')}`}
        className={`
          h-[40px] flex-1 rounded-[var(--style-radius-s)] border border-solid
          border-[var(--theme-elevation-150)] bg-[var(--theme-input-bg)] pe-[40px] ps-[40px]
          text-[1rem] leading-[20px] outline-0
          [.field-type.color.error_&]:border-[var(--theme-error-400)]
          [.field-type.color.error_&]:bg-[var(--theme-error-100)]
          active:border-[var(--theme-elevation-400)]
        `}
        name={path}
        // ref={inputRef}
        // data-rtl={rtl}
        disabled={readOnly}
        // placeholder={getTranslation(placeholder ?? '', i18n)}
        readOnly
        type="text"
        value={JSON.stringify(value)}
      />

      <div
        className={`
          absolute inset-y-0 left-0 m-[8px] size-[24px] border border-solid
          border-[var(--theme-elevation-600)]
        `}
        // style={{ background: cssColor }}
      />

      <ClearButton
        className="absolute inset-y-0 right-0 !m-[8px] !rounded-none"
        // hidden={!isClearable || !isValid}
        onClear={handleClear}
      />
    </div>
  )
}
