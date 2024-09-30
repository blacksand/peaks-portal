/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */

import { RootLayout } from '@payloadcms/next/layouts'

import './custom.css'
import './payload-css' // must be after the custom.css

/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

import type { ReactNode } from 'react'

import configPromise from '@peaks/cms-config'

import { importMap } from './admin/importMap'

interface Args {
  children: ReactNode
}

function Layout({ children }: Args) {
  return (
    <RootLayout config={configPromise} importMap={importMap}>
      {children}
    </RootLayout>
  )
}

export default Layout
