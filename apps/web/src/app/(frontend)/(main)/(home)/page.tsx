import type { Metadata } from 'next'

import { getAppConfig } from '@peaks/cms-config/utilities'
import type { PageProps } from '@peaks/web-ui'

export const dynamic = 'force-dynamic'

export default async function HomePage({ searchParams: _s }: PageProps) {
  return (
    <main className="col-span-full">
      Home Page
      {/* <div className="h-[1600px] rounded bg-blue-50 fluid-mt-base fluid-mx-base" /> */}
    </main>
  )
}

const brandTitle = process.env.BRAND_TITLE || '上山科技'

export async function generateMetadata(): Promise<Metadata> {
  const config = await getAppConfig()

  return {
    title: brandTitle,
    description: `${brandTitle}内容管理系统`,
    icons: { apple: '/apple-touch-icon.png', icon: '/favicon-32x32.png' },
    metadataBase: config.endpoints.server
      ? new URL(config.endpoints.server)
      : undefined,
  }
}
