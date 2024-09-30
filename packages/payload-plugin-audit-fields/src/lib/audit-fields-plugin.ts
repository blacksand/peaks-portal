import type { Config } from 'payload'

import type { AuditFieldsPluginOptions } from './types'
import { extendAuditFields } from './utils/extend-audit-fields'

const defaultIgnoreCollections = ['payload-preferences', 'payload-migrations']

export function auditFieldsPlugin({
  ignoreCollections,
  usersSlug,
}: Partial<AuditFieldsPluginOptions> = {}) {
  const collectionsToIgnore = new Set([
    ...defaultIgnoreCollections,
    ...ignoreCollections ?? [],
  ])

  return (incomingConfig: Config): Config => {
    const collections = incomingConfig.collections?.map((collection) =>
      collectionsToIgnore.has(collection.slug)
        ? collection
        : extendAuditFields(collection, usersSlug),
    )

    return { ...incomingConfig, collections }
  }
}
