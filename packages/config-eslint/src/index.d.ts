import type { OptionsConfig } from '@antfu/eslint-config'
import type { FlatConfigComposer } from 'eslint-flat-config-utils'

export interface ExtraOptions {
  a11y?: boolean | undefined
  allowDefaultProject?: string[] | undefined
  next?: boolean | undefined
  projectRoot?: string | undefined
  tailwindcss?: string | boolean | undefined
}

export function eslintConfig(inputOptions?: OptionsConfig & ExtraOptions): FlatConfigComposer

export { type OptionsConfig } from '@antfu/eslint-config'
export function getTsconfigPath(projectRoot: string | undefined): string

export function getProjectRoot(fileURL: string | undefined): string
