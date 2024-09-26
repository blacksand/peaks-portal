// @ts-check

import { composePlugins, withNx } from '@nx/next'
import withPayload from '@payloadcms/next/withPayload'

const mediaPatterns = (process.env.PEAKS_MEDIA_SERVERS ?? '')
  .split(';')
  .map((server) => server.split(':'))
  .filter((props) => props.length >= 2)
  .map(([protocol, host, port]) => ({ hostname: host?.slice(2) ?? '', port, protocol }))

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 */
const nextConfig = {
  nx: { svgr: true },
  output: 'standalone',
  reactStrictMode: true,

  images: {
    // @ts-expect-error TS2322
    remotePatterns: mediaPatterns,
    unoptimized: true,
  },

  serverExternalPackages: [
    '@payload-enchants/cached-local-api',
    '@payloadcms/db-mongodb',
    '@payloadcms/db-postgres',
    '@payloadcms/drizzle',
    '@payloadcms/graphql',
    '@payloadcms/plugin-cloud-storage',
    '@payloadcms/translations',
    '@payloadcms/plugin-nested-docs',
    '@payloadcms/storage-s3',
    'fast-blurhash',
    'loglevel',
    'loglevel-plugin-prefix',
    'payload',
  ],

  experimental: {
    optimizePackageImports: [
      '@payloadcms/next',
      '@payloadcms/richtext-lexical',
      '@payloadcms/ui',
      'remeda',
      ...(process.env.NODE_ENV === 'production'
        ? [
            '@peaks/cms-config',
            '@peaks/data-access',
            '@peaks/data-models',
            '@peaks/common-ui',
            '@peaks/web-ui',
            '@peaks/cms-utils',
            '@peaks/common-utils',
          ]
        : []),
    ],
    reactCompiler: true,
    // 启用后会出现需要提供 list key 的警告信息
    // ppr: 'incremental',
    typedRoutes: true,
  },
}

const plugins = [withNx, withPayload]

export default composePlugins(...plugins)(nextConfig)
