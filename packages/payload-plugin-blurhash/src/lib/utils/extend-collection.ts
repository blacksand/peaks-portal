import type { Field } from 'payload'

// import { BlurhashField } from '../components/blurhash-field'
import { createBlurDataUrlField } from '../fields/create-blur-data-url-field'
import { createBlurhashField } from '../fields/create-blurhash-field'
import { createBlurhashSizesField } from '../fields/create-blurhash-sizes-field'
import { beforeChangeHook } from '../hooks/before-change-hook'
import type { BlurhashPluginOptions, CollectionConfigWithBlurhash } from '../types'

const BlurhashField = '/src/lib/components/BlurhashField'

export function extendCollection(
  collection: CollectionConfigWithBlurhash,
  { generateDataUrl, generateSizes, showBlurhash }: BlurhashPluginOptions = {},
) {
  if (!collection.upload) {
    return collection
  }

  const { blurhash } = collection.custom ?? {}

  if (blurhash === false) {
    return collection
  }

  const fieldConfig =
    blurhash && typeof blurhash === 'object'
      ? { ...blurhash }
      : { showBlurhash }

  let hasBlurhashField = false

  const fields = collection.fields.map((field) => {
    if (!('name' in field) || field.name !== 'blurhash') {
      return field
    }

    if (field.name === 'blurhash') {
      hasBlurhashField = true
    }

    if ('Field' in (field.admin?.components ?? {})) {
      return field
    }

    const admin = { ...field.admin } as NonNullable<Field['admin']>
    admin.components = { ...admin.components, Field: BlurhashField }

    return { ...field, admin } as Field
  })

  if (!hasBlurhashField) {
    fields.push(createBlurhashField(fieldConfig))
    if (generateDataUrl) {
      fields.push(createBlurDataUrlField())
    }
  }

  if (
    generateSizes &&
    typeof collection.upload === 'object' &&
    collection.upload.imageSizes?.length
  ) {
    fields.push(
      createBlurhashSizesField(collection.upload.imageSizes, generateDataUrl),
    )
  }

  const hooks = { ...collection.hooks }
  hooks.beforeChange = [...(hooks.beforeChange ?? []), beforeChangeHook()]

  return { ...collection, fields, hooks }
}
