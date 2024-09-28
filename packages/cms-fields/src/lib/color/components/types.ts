import type { GroupFieldClient } from 'payload'
import type { MarkOptional } from 'ts-essentials'

export interface ColorFieldValue {
  type: 'theme' | 'custom'
  value?: string
}

export type ColorFieldClient = MarkOptional<GroupFieldClient, 'type'>
