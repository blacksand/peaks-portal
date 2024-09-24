import type { CP } from '../types'
import { createField } from '../utils/create-field'
import { text } from './text'

export function array(params: CP<'array'>) {
  return createField<'array'>({
    ...params,
    type: 'array',
    fields:
      params.fields.length === 0
        ? [
            text({
              name: 'value',
              label: params.labels?.singular ?? '值',
            }),
          ]
        : params.fields,
  })
}
