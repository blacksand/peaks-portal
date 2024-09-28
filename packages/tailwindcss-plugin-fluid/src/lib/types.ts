export type Range = [string | number, string | number]

export interface FluidPluginOptions {
  prefix: string

  extendMaxWidth?: number
  extendMinWidth?: number
  maxWidth: number
  minWidth: number
  remBase: number

  ranges: Record<string, Record<string, Range>>

  logger: {
    error: (...args: unknown[]) => void
    log: (...args: unknown[]) => void
    warn: (...args: unknown[]) => void
  } | undefined

  showComments: boolean
}
