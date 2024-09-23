import type { PropsWithChildren, ReactNode } from 'react'

export interface LayoutProps extends PropsWithChildren {
  readonly params?: Record<string, string | string[]>
}

export type PropsWithParallelRoute<R extends string> = LayoutProps & { [key in R]: ReactNode }

export interface PageProps<T = never> {
  readonly params: T
  readonly searchParams: Record<string, string | string[]>
}

export interface PageProps<T = never> {
  readonly params: T
  readonly searchParams: Record<string, string | string[]>
}
