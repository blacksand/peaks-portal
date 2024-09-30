import type { Config } from 'payload'

import type { BlurhashPluginOptions } from './types'
import { extendCollection } from './utils/extend-collection'

export function blurhashPlugin({
  generateDataUrl,
  generateSizes,
  includeCollections,
  showBlurhash,
}: Partial<BlurhashPluginOptions> = {}) {
  return (incomingConfig: Config): Config => {
    const collections = incomingConfig.collections?.map((collection) => {
      if (!collection.upload) {
        return collection
      }

      if (includeCollections && !includeCollections.includes(collection.slug)) {
        return collection
      }

      return extendCollection(collection, {
        generateDataUrl,
        generateSizes,
        showBlurhash,
      })
    })

    return { ...incomingConfig, collections }
  }
}
