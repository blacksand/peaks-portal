import { getTranslation } from '@payloadcms/translations'
import { fieldBaseClass, FieldDescription, FieldError, FieldLabel, Popup, useTranslation } from '@payloadcms/ui'
import type { MappedComponent, StaticDescription, StaticLabel } from 'payload'
import type { CSSProperties } from 'react'
import type { MarkOptional } from 'ts-essentials'

import { cn } from '@peaks/common-utils'

import type { IconFieldClient, IconFieldValue } from '../field/types'
import './icon-input.css'
import { IconPicker } from './icon-picker'
import { IconPickerTrigger } from './icon-picker-trigger'

export interface IconInputProps {
  readonly name: string
  readonly label?: StaticLabel
  readonly className?: string
  readonly Description?: MappedComponent
  readonly description?: StaticDescription
  readonly descriptionProps?: Record<string, unknown>
  readonly Error?: MappedComponent
  readonly errorProps?: Record<string, unknown>
  readonly field: MarkOptional<IconFieldClient, 'type'>
  readonly isClearable?: boolean
  readonly Label?: MappedComponent
  readonly labelProps?: Record<string, unknown>
  readonly path: string
  readonly placeholder?: Record<string, string> | string
  readonly readOnly?: boolean
  readonly required?: boolean
  readonly rtl?: boolean
  readonly showError?: boolean
  readonly style?: CSSProperties
  readonly svgIcons?: Record<string, string> | undefined
  readonly value?: IconFieldValue
  readonly width?: CSSProperties['width']
  readonly onIconChange: (value: IconFieldValue | undefined) => void
}

export function IconInput({
  label,
  className,
  Description,
  description,
  descriptionProps,
  Error,
  errorProps,
  field,
  isClearable,
  Label,
  labelProps,
  path,
  placeholder,
  readOnly,
  required,
  rtl,
  showError,
  style,
  value,
  width,
  onIconChange,
}: IconInputProps) {
  const { i18n } = useTranslation()

  return (
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={cn(
        fieldBaseClass,
        'icon-field',
        className,
        showError && 'error',
        readOnly && 'read-only',
      )}
      style={{ ...style, width }}
    >
      <FieldLabel field={field} Label={Label} label={label} required={required} {...labelProps} />
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <div className={`${fieldBaseClass}__wrap`}>
        <FieldError CustomError={Error} field={field} path={path} {...errorProps} />

        <Popup
          button={(
            <IconPickerTrigger
              field={field}
              isClearable={isClearable}
              path={path}
              placeholder={getTranslation(placeholder ?? '', i18n) as string}
              readOnly={readOnly}
              rtl={rtl}
              value={value}
              onClear={() => onIconChange(undefined)}
            />
          )}
          buttonType="custom"
          disabled={readOnly}
          horizontalAlign="left"
          showScrollbar={false}
          size="fit-content"
          verticalAlign="bottom"
        >
          <IconPicker value={value} onIconChange={onIconChange} />
        </Popup>

        <FieldDescription
          Description={Description}
          description={description}
          field={field}
          {...descriptionProps}
        />
      </div>
    </div>
  )
}
