import type { LayoutProps } from '../types'

export function MainLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
    </div>
  )
}
