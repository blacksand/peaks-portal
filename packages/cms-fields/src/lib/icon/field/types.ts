import type { IconifyIcon, IconifyInfo, IconifyJSONPackageExports, IconifyMetaData } from '@iconify/types'
import type { JSONField, JSONFieldClient, JSONFieldClientProps } from 'payload'

export interface IconFieldCustom {
  placeholder?: Record<string, string> | string
  rtl?: boolean
  svgIcons?: Record<string, string>
}

export interface IconField extends JSONField {
  custom?: IconFieldCustom
}

export interface IconFieldValue {
  name: string
  collection?: string
  data: IconifyIcon
  provider?: string
}

export type IconFieldClient = JSONFieldClient & IconFieldCustom

export type IconFieldClientProps = JSONFieldClientProps & IconFieldCustom

export interface Icon {
  name: string
  data: IconifyIcon
}

export interface LoadedCollection {
  icons: Icon[]
  metadata: IconifyMetaData
}

export interface IconCollection extends IconifyInfo {
  load: () => Promise<IconifyJSONPackageExports>
  prefix: string
}
