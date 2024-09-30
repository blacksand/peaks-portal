import type { JSONFieldClient } from 'payload'
import type { MarkOptional } from 'ts-essentials'

export interface ColorFieldValue {
  type: 'theme' | 'custom'
  alpha?: boolean
  color?: string
  darkColor?: string
  darkMode?: boolean
  themeColor?: string
}

export type ColorFieldClient = MarkOptional<JSONFieldClient, 'type'>
