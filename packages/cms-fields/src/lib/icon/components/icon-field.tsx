'use client'

import { useConfig, useField, useFieldProps, useLocale, withCondition } from '@payloadcms/ui'
import { isFieldRTL } from '@payloadcms/ui/fields/shared'
import type { Validate } from 'payload'
import { useCallback } from 'react'

import type { IconFieldClientProps, IconFieldValue } from '../field/types'
import { icon } from '../validations/icon'
import { IconInput } from './icon-input'

function IconFieldComponent({
  field,
  field: { name, label, _path: pathFromProps, admin, localized, required },
  placeholder,
  readOnly: readOnlyFromTopProps,
  rtl,
  svgIcons,
  validate = icon as Validate,
}: Readonly<IconFieldClientProps>) {
  const { className, description, readOnly: readOnlyFromAdmin, style, width } = admin ?? {}
  const readOnlyFromProps = readOnlyFromTopProps ?? readOnlyFromAdmin
  const locale = useLocale()

  const { config: { localization } } = useConfig()
  const isRTL = isFieldRTL({
    fieldLocalized: localized ?? false,
    fieldRTL: rtl ?? false,
    locale,
    localizationConfig: localization || undefined,
  })

  const memoizedValidate = useCallback<Validate>(
    (value, options) =>
      validate(value, { ...options, required }),
    [validate, required],
  )

  const { path: pathFromContext, readOnly: readOnlyFromContext } = useFieldProps()
  const { formInitializing, formProcessing, path, setValue, showError, value } = useField<IconFieldValue>({
    path: pathFromContext ?? pathFromProps ?? name,
    validate: memoizedValidate,
  })

  const disabled = readOnlyFromProps || readOnlyFromContext || formProcessing || formInitializing

  const handleChange = (newValue: IconFieldValue | undefined) => {
    setValue(newValue ?? {})
  }

  return (
    <IconInput
      className={className}
      name={name}
      Description={field?.admin?.components?.Description}
      description={description}
      Error={field?.admin?.components?.Error}
      field={field}
      isClearable={!disabled}
      Label={field?.admin?.components?.Label}
      label={label}
      path={path}
      placeholder={placeholder}
      readOnly={disabled}
      required={required}
      rtl={isRTL}
      showError={showError}
      style={style}
      svgIcons={svgIcons}
      value={value}
      width={width}
      onIconChange={handleChange}
    />
  )
}

export const IconField = withCondition(IconFieldComponent)
