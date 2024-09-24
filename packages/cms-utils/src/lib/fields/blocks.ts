import type { CP } from '../types'
import { createField } from '../utils/create-field'

export function blocks(overrides: CP<'blocks'>) {
  return createField({ ...overrides, type: 'blocks' })
}
