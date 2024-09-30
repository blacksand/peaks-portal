import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'node:path'
import { buildConfig } from 'payload'
import type { Config } from 'payload'
import sharp from 'sharp'

import { stringToArray } from '@peaks/common-utils'
import { auditFieldsPlugin } from '@peaks/payload-plugin-audit-fields'
import { blurhashPlugin } from '@peaks/payload-plugin-blurhash'

import { categories } from './collections/categories'
import { frontends } from './collections/frontends'
import { media } from './collections/media'
import { pages } from './collections/pages'
import { tags } from './collections/tags'
import { users } from './collections/users'
import { cachedPayloadPlugin } from './config/cached-local-api'
import { editorConfig } from './config/editor-config'
import { i18nConfig } from './config/i18n-config'
import { livePreviewConfig } from './config/live-preview-config'
// import { stringToArray } from '@peaks/utils-common'

import { workspacePath } from '../workspace-path'

const brandTitle = process.env.PEAKS_BRAND_TITLE || undefined
const allowedCorsSites = stringToArray(process.env.PEAKS_CORS_SITES)

// if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URI) {
//   throw new Error('Missing PAYLOAD_SECRET or DATABASE_URI')
// }

const config = buildConfig({
  secret: process.env.PAYLOAD_SECRET!,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || undefined,

  db: process.env.DATABASE_URI?.startsWith('mongodb:')
    ? mongooseAdapter({ url: process.env.DATABASE_URI })
    : postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI } }),

  async onInit(payload) {
    payload.logger.info('Payload initialized')

    if (process.env.PAYLOAD_SEED === 'true') {
      // await seed(payload)
    }
    else {
      payload.logger.info('Payload skip seed')
    }
  },

  cookiePrefix: 'peaks-portal',
  cors: allowedCorsSites,
  csrf: allowedCorsSites,
  debug: process.env.NODE_ENV === 'development',
  i18n: i18nConfig,
  indexSortableFields: true,
  telemetry: false,

  defaultDepth: 1,
  maxDepth: 5,

  graphQL: {
    disablePlaygroundInProduction: true,
    schemaOutputFile: path.resolve(workspacePath, 'packages/data-models/cms-schema.graphql'),
  },
  typescript: {
    outputFile: path.resolve(
      workspacePath,
      'packages/data-models/src/payload-types.ts',
    ),
  },

  admin: {
    avatar: 'default',

    importMap: {
      baseDir: workspacePath,
    },

    components: {
      graphics: {
        Icon: {
          clientProps: {
            title: '',
          },
          path: '@peaks/web-ui/admin#BrandLogo',
        },
        Logo: {
          clientProps: {
            title: brandTitle,
          },
          path: '@peaks/web-ui/admin#BrandLogo',
        },
      },
      providers: [
        /* iconsProvider */
      ],
    },
    dateFormat: 'yyyy/MM/dd HH:mm:ss',
    livePreview: livePreviewConfig,
    meta: {
      icons: [{ sizes: '32x32', url: '/favicon.ico' }],
      titleSuffix: brandTitle ? ` - ${brandTitle}` : undefined,
    },
    user: users.slug,
  },

  collections: [
    // system
    frontends,
    users,

    // content
    categories,
    tags,
    pages,

    // resources
    media,
  ],
  globals: [
    // webSettings,
    // mobileSettings,
    // weixinSettings
  ],

  editor: editorConfig,
  plugins: [
    auditFieldsPlugin({
      usersSlug: users.slug as keyof Config['collections'],
    }),
    blurhashPlugin({
      generateDataUrl: false,
      generateSizes: true,
      showBlurhash: true,
    }),
    cachedPayloadPlugin,
    nestedDocsPlugin({
      breadcrumbsFieldSlug: 'breadcrumbs',
      collections: [categories.slug],
      generateLabel: (_, doc) => doc?.label as string,
      generateURL: (docs) => `/categories/${docs.map(({ slug }) => slug as string).join('/')}`,
      parentFieldSlug: 'parent',
    }),
    s3Storage({
      enabled: !!process.env.PEAKS_OSS_ENDPOINT,

      collections: {
        [media.slug]: {
          // disablePayloadAccessControl: true,
          // generateFileURL,
          prefix: media.slug,
        },
        // [stationAttachments.slug]: {
        //   disablePayloadAccessControl: true,
        //   generateFileURL,
        //   prefix: stationAttachments.slug,
        // },
      },

      bucket: process.env.PEAKS_OSS_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.PEAKS_OSS_ACCESS_KEY_ID!,
          secretAccessKey: process.env.PEAKS_OSS_ACCESS_KEY!,
        },

        endpoint: process.env.PEAKS_OSS_ENDPOINT,
        forcePathStyle: process.env.PEAKS_OSS_FORCE_PATH_STYLE === 'true',
        region: process.env.PEAKS_OSS_REGION,
      },
    }),
  ],
  sharp,
  upload: {
    // 避免中文文件名变为乱码
    defCharset: 'utf8',
    defParamCharset: 'utf8',
  },
})

// function generateFileURL({ collection, filename, prefix }: {
//   collection: CollectionConfig
//   filename: string
//   prefix?: string
//   size?: ImageSize
// }) {
//   return `${process.env.PEAKS_MEDIA_SERVER}/${prefix ?? collection.slug}/${filename}`
// }

export default config
