import type { Field } from 'payload'
import type { MarkRequired } from 'ts-essentials'

import { auditFields } from '../fields/audit-fields'
import type { AuditFieldsOptions, CollectionConfigAuditFields } from '../types'

const defaultOptions: AuditFieldsOptions = {
  addCreatedBy: true,
  addUpdatedBy: true,
  position: 'bottom',
  showInSidebar: false,
  usersSlug: 'users',
}

function getOptions(
  usersSlug: string | undefined,
  incomingOptions: boolean | AuditFieldsOptions | undefined,
) {
  if (incomingOptions === false) {
    return false
  }

  return {
    ...defaultOptions,
    ...incomingOptions === true ? {} : incomingOptions,
    ...usersSlug ? { usersSlug } : {},
  } as MarkRequired<AuditFieldsOptions, 'usersSlug'>
}

export function extendAuditFields(
  config: CollectionConfigAuditFields,
  usersSlug?: string,
): CollectionConfigAuditFields {
  const options = getOptions(usersSlug, config.custom?.auditFields)

  if (!options) {
    return config
  }

  const fields: Field[] =
    options.position === 'bottom'
      ? [...config.fields, ...auditFields(options)]
      : [...auditFields(options), ...config.fields]

  return {
    ...config,
    ...'timestamps' in config ? {} : { timestamps: true },
    fields,
  }
}
