'use client'

import { FieldDescription, FieldLabel, Popup, useField, useFieldProps, withCondition } from '@payloadcms/ui'
import type { JSONField, JSONFieldClientProps, Validate } from 'payload'
import { useCallback } from 'react'

import { cn } from '@peaks/common-utils'

import { ColorPicker } from './color-picker'
import { ColorPickerTrigger } from './color-picker-trigger'
import type { ColorFieldValue } from './types'

export type ColorFieldComponentProps = JSONFieldClientProps & {
  allowAlpha?: boolean
  disablePicker?: boolean
  required?: boolean
}

const fieldBaseClass = 'field-type'
const baseClass = 'color'

function ColorFieldComponent({
  allowAlpha,
  descriptionProps,
  disablePicker,
  errorProps,
  field,
  labelProps,
  readOnly,
  required,
  validate,
}: ColorFieldComponentProps) {
  const readOnlyFromProps = readOnly || field.admin?.readOnly

  const { path: pathFromContext, readOnly: readOnlyFromContext } = useFieldProps()
  const { _path: pathFromProps } = field

  const memoizedValidate = useCallback<Validate<ColorFieldValue, unknown, unknown, JSONField>>(
    (value, options) => {
      if (typeof validate === 'function') {
        return validate(value, { ...options })
      }
      return true
    },
    [validate],
  )

  const { formInitializing, formProcessing, path, setValue, showError, value } = useField<ColorFieldValue>({
    path: pathFromContext ?? pathFromProps ?? field.name,
    validate: memoizedValidate as Validate,
  })

  const disabled = readOnlyFromProps || readOnlyFromContext || formProcessing || formInitializing

  // const typeField = useFormFields(([fields]) =>
  //   isObject(fields) && fieldToUse in fields
  //     ? fields[fieldToUse as keyof typeof fields]
  //     : undefined,
  // )

  return (
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={cn(
        fieldBaseClass,
        baseClass,
        field.admin?.className,
        showError && 'error',
        readOnly && 'read-only',
      )}
      style={{ ...field.admin?.style, width: field.admin?.width }}
    >
      <FieldLabel
        field={field}
        Label={field.admin?.components?.Label}
        label={field.label}
        required={required}
        {...labelProps}
      />
      <Popup
        className="[&_.popup-button]:flex-1"
        button={(
          <ColorPickerTrigger
            errorProps={errorProps}
            field={field}
            path={path}
            placeholder="..."
            readOnly={readOnly}
            value={value}
            onClear={() => setValue(undefined)}
          />
        )}
        buttonType="custom"
        disabled={disabled}
        horizontalAlign="left"
        showScrollbar={false}
        size="fit-content"
        verticalAlign="bottom"
      >
        <ColorPicker allowAlpha={allowAlpha} disablePicker={disablePicker} value={value} onColorChange={setValue} />
      </Popup>
      <FieldDescription
        Description={field.admin?.components?.Description}
        description={field.admin?.description}
        field={field}
        {...descriptionProps}
      />
    </div>
  )
}

export const ColorField = withCondition(ColorFieldComponent)
