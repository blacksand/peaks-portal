import type { CollectionBeforeChangeHook } from 'payload'
import { isImage } from 'payload/shared'
import { entries, fromEntries, map, pipe } from 'remeda'

import { encodeBlurhash } from '../utils/encode-blurhash'

interface MediaData {
  mimeType?: string | null
}

interface UploadFile {
  data: Buffer
}

function isObject<T>(value: unknown): value is T {
  return typeof value === 'object' && value !== null
}

export function beforeChangeHook(): CollectionBeforeChangeHook {
  return async ({ data, operation, req }) => {
    if (
      !['create', 'update'].includes(operation) ||
      !isObject<UploadFile>(req.file) ||
      !isObject<MediaData>(data) ||
      !isImage(data.mimeType ?? '')
    ) {
      return data
    }

    try {
      const { payloadUploadSizes: sizes } = req
      const { blurDataUrl, blurhash } = await encodeBlurhash(
        req.payload,
        req.file.data,
      )

      if (!sizes) {
        return { ...data, blurDataUrl, blurhash }
      }

      const sizesWithBlurhash = (await Promise.all(
        pipe(
          entries(sizes),
          map(([name, buffer]) =>
            encodeBlurhash(req.payload, buffer).then((hash) => [name, hash]),
          ),
        ),
      )) as Array<[string, { blurDataUrl?: string, blurhash?: string }]>

      const blurhashSizes = fromEntries(sizesWithBlurhash)
      return { ...data, blurDataUrl, blurhash, blurhashSizes }
    }
    catch (reason) {
      req.payload.logger.error(reason)

      return data
    }
  }
}
