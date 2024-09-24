import { buildCachedPayload } from '@payload-enchants/cached-local-api'
import { revalidateTag, unstable_cache } from 'next/cache'

import { slugs } from '@peaks/data-models'

export const { cachedPayloadPlugin, getCachedPayload } = buildCachedPayload({
  // collections list to cache
  collections: [
    { slug: slugs.categories, findOneFields: ['slug'] },
    { slug: slugs.users, findOneFields: ['username'] },
  ],
  globals: [
    // { slug: 'header' },
  ],
  // Log when revalidation runs or operation cache HIT / SKIP
  loggerDebug: true,
  options: {},
  revalidateTag,
  unstable_cache,
})
