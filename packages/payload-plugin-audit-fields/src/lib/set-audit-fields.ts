import type { AuditFieldsOptions } from './types'

export function setAuditFields(options: boolean | AuditFieldsOptions = {}) {
  return { auditFields: options === true ? {} : options }
}
