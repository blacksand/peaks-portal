import type { Field } from 'payload'
import type { MarkRequired } from 'ts-essentials'

import type { AuditFieldsOptions } from '../types'
import { createdByField } from './created-by-field'
import { uiField } from './ui-field'
import { updatedByField } from './updated-by-field'

export function auditFields({
  addCreatedBy = true,
  addUpdatedBy = true,
  showInSidebar = false,
  usersSlug,
}: MarkRequired<AuditFieldsOptions, 'usersSlug'>) {
  return [
    ...addCreatedBy || addUpdatedBy ? uiField(showInSidebar) : [],
    ...addCreatedBy ? createdByField(usersSlug) : [],
    ...addUpdatedBy ? updatedByField(usersSlug) : [],
  ] as Field[]
}
