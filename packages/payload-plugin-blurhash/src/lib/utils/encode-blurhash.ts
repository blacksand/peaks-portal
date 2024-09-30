import { encode } from 'blurhash'
import type { Payload } from 'payload'
import sharp from 'sharp'
import type { ResizeOptions } from 'sharp'

export async function encodeBlurhash(
  payload: Payload,
  buffer: Buffer,
  options?: ResizeOptions,
) {
  const { fit = 'inside', height = 32, width = 32 } = options ?? {}

  const blurhash = await sharp(buffer)
    .raw()
    .ensureAlpha()
    .resize({ ...options, fit, height, width })
    .toBuffer({ resolveWithObject: true })
    .then(({ data, info }) =>
      encode(new Uint8ClampedArray(data), info.width, info.height, 4, 4),
    )
    .catch((error: unknown) => {
      payload.logger.error('blurhash generation failed', error)
      return null
    })

  const blurDataUrl = await sharp(buffer)
    .resize(8, 8, { fit: 'inside' })
    .toFormat('png')
    .modulate({
      brightness: 1,
      saturation: 1.2,
    })
    .removeAlpha()
    .rotate()
    .normalise()
    .toBuffer({ resolveWithObject: true })
    .then(
      ({ data, info }) =>
        `data:image/${info.format};base64,${data.toString('base64')}`,
    )
    .catch((error: unknown) => {
      payload.logger.error('base64 generation failed', error)
      return null
    })

  return { blurDataUrl, blurhash }
}
