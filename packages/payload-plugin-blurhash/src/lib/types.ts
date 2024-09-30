import type { CollectionConfig } from 'payload'

import type { BlurhashField } from './fields/types'

export interface CollectionConfigWithBlurhash extends CollectionConfig {
  custom?: {
    blurhash?: boolean | Partial<BlurhashField>
  }
}

export interface BlurhashPluginOptions {
  generateDataUrl?: boolean
  generateSizes?: boolean
  includeCollections?: string[]
  showBlurhash?: boolean
}
