import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function upload(params: CP<'upload'>) {
  const { name, label, hasMany, ...options } = params

  return createField({
    ...options,
    name: name || 'media',
    type: 'upload',
    label: label ?? '媒体文件',
    hasMany: true,
  })
}
