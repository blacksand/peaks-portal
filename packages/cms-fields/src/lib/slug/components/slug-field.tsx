'use client'

import { TextInput, useConfig, useField, useFieldProps, useFormFields, useLocale, withCondition } from '@payloadcms/ui'
import { isFieldRTL } from '@payloadcms/ui/fields/shared'
import type { MappedComponent, TextField, TextFieldClientProps, Validate } from 'payload'
import { useCallback, useEffect, useMemo } from 'react'
import type { ChangeEvent } from 'react'

import { cn, isObject } from '@peaks/common-utils'

import { ClearButton } from '../../common/clear-button'
import { generateSlug } from '../utils/generate-slug'

export type SlugFieldComponentProps = TextFieldClientProps & {
  autoUpdate?: boolean
  fieldToUse: string
}

function SlugFieldComponent(props: SlugFieldComponentProps) {
  const { autoUpdate, field, fieldToUse, inputRef, readOnly, validate } = props
  const readOnlyFromProps = readOnly || field.admin?.readOnly

  const { path: pathFromContext, readOnly: readOnlyFromContext } = useFieldProps()
  const locale = useLocale()

  const { config: { localization } } = useConfig()

  const isRTL = isFieldRTL({
    fieldLocalized: !!field.localized,
    fieldRTL: !!field.admin?.rtl,
    locale,
    localizationConfig: localization || undefined,
  })

  const { _path: pathFromProps, maxLength, minLength, required } = field

  const memoizedValidate = useCallback<Validate<string, unknown, unknown, TextField>>(
    (value, options) => {
      if (typeof validate === 'function') {
        return validate(value, { ...options, maxLength, minLength, required })
      }
      return true
    },
    [validate, minLength, maxLength, required],
  )

  const { formInitializing, formProcessing, path, setValue, showError, value } = useField<string>({
    path: pathFromContext ?? pathFromProps ?? field.name,
    validate: memoizedValidate as Validate,
  })

  const disabled = readOnlyFromProps || readOnlyFromContext || formProcessing || formInitializing

  const fromField = useFormFields(([fields]) =>
    isObject(fields) && fieldToUse in fields
      ? fields[fieldToUse as keyof typeof fields]
      : undefined,
  )

  const slugPlaceholder = useMemo(
    () => (fromField?.value ? generateSlug(fromField?.value) : ''),
    [fromField?.value],
  )

  const afterInput = useMemo<MappedComponent[]>(() => [
    ...field.admin?.components?.afterInput ?? [],
    {
      type: 'client',
      Component: ClearButton,
      props: {
        hidden: !value,
        onClear: () => setValue(''),
      },
    },
  ], [field.admin?.components?.afterInput, setValue, value])

  useEffect(() => {
    if (autoUpdate && slugPlaceholder) {
      setValue(slugPlaceholder)
    }
  }, [autoUpdate, setValue, slugPlaceholder])

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <TextInput
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={cn(field.admin?.className, 'slug-field', 'has-clear')}
      afterInput={afterInput}
      beforeInput={field.admin?.components?.beforeInput}
      Description={field.admin?.components?.Description}
      description={field.admin?.description}
      Error={field.admin?.components?.Error}
      field={field}
      inputRef={inputRef}
      Label={field?.admin?.components?.Label}
      path={path}
      placeholder={slugPlaceholder || field.admin?.placeholder as string}
      readOnly={disabled}
      required={required}
      rtl={isRTL}
      showError={showError}
      style={field?.admin?.style}
      value={value}
      width={field.admin?.width}
      onChange={handleOnChange}
    />
  )
}

export const SlugField = withCondition(SlugFieldComponent)
