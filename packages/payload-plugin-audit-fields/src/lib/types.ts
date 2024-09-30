import type { CollectionConfig } from 'payload'

import type { Config } from '@peaks/data-models/payload-types'

export interface AuditFieldsOptions {
  addCreatedBy?: boolean
  addUpdatedBy?: boolean
  position?: 'top' | 'bottom'
  showInSidebar?: boolean
  usersSlug?: keyof Config['collections']
}

export interface CollectionConfigAuditFields extends CollectionConfig {
  custom?: {
    auditFields?: boolean | AuditFieldsOptions
  }
}

export interface AuditFieldPluginOptions {
  ignoreCollections?: Array<keyof Config['collections']>
  usersSlug?: keyof Config['collections']
}
