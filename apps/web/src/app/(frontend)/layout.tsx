import type { Metadata, Viewport } from 'next'
import type { PropsWithChildren } from 'react'

import { getAppConfig } from '@peaks/cms-config/utilities'
// import { Toaster } from '@peaks/ui-common/components/sonner'
// import type { PropsWithParallelRoute } from '@peaks/web-ui'

import { RootProviders } from '../../lib/providers/root-providers'
import './global.css'

export default async function FrontendLayout({ children }: PropsWithChildren) {
  const appConfig = await getAppConfig()

  return (
    <html className="text-[16px]" lang="zh-Hans" suppressHydrationWarning>
      <body className="bg-background font-sans text-sm antialiased">
        <RootProviders config={appConfig}>
          {/* <Toaster /> */}
          {/* {auth} */}
          {children}
        </RootProviders>
      </body>
    </html>
  )
}

// TODO: 由数据库读取网页 meta
export const metadata: Metadata = {
  title: process.env.BRAND_TITLE ?? '上山科技',
  // description: '',
  icons: { apple: '/apple-touch-icon.png', icon: '/favicon-32x32.png' },
  metadataBase: process.env.NEXT_PUBLIC_SERVER_URL ? new URL(process.env.NEXT_PUBLIC_SERVER_URL) : undefined,
}

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  viewportFit: 'cover',
  width: 'device-width',
}
