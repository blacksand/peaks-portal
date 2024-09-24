/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import { generatePageMetadata, RootPage } from '@payloadcms/next/views'
import type { Metadata } from 'next'

import config from '@peaks/cms-config'

import { importMap } from '../importMap'

interface Args {
  params: {
    segments: string[]
  }
  searchParams: Record<string, string | string[]>
}

export function generateMetadata({ params, searchParams }: Args): Promise<Metadata> {
  return generatePageMetadata({ config, params, searchParams })
}

function Page({ params, searchParams }: Args) {
  return RootPage({ config, importMap, params, searchParams })
}

export default Page
