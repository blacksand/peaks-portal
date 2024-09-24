import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import path from 'node:path'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { stringToArray } from '@peaks/common-utils'

import { categories } from './collections/categories'
import { media } from './collections/media'
import { users } from './collections/users'
import { cachedPayloadPlugin } from './config/cached-local-api'
import { editorConfig } from './config/editor-config'
import { i18nConfig } from './config/i18n-config'
import { livePreviewConfig } from './config/live-preview-config'
// import { auditFieldPlugin } from '@peaks/payload-plugin-audit'
// import { blurhashPlugin } from '@peaks/payload-plugin-blurhash'
// import { stringToArray } from '@peaks/utils-common'
// import { s3Storage } from '@payloadcms/storage-s3'

import { workspacePath } from '../workspace-path'

const brandTitle = process.env.PEAKS_BRAND_TITLE || undefined
const allowedCorsSites = stringToArray(process.env.PEAKS_CORS_SITES)

if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URI) {
  throw new Error('Missing PAYLOAD_SECRET or DATABASE_URI')
}

const config = buildConfig({
  secret: process.env.PAYLOAD_SECRET,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || undefined,

  db: mongooseAdapter({ url: process.env.DATABASE_URI }),

  // async onInit(payload) {
  //   payload.logger.info('Payload initialized')
  //
  //   if (process.env.PAYLOAD_SEED === 'true') {
  //     await seed(payload)
  //   }
  //   else {
  //     payload.logger.info('Payload skip seed')
  //   }
  // },

  cookiePrefix: 'peaks-portal',
  cors: allowedCorsSites,
  csrf: allowedCorsSites,
  debug: process.env.NODE_ENV === 'development',
  i18n: i18nConfig,
  indexSortableFields: true,
  telemetry: false,

  defaultDepth: 0,
  maxDepth: 5,

  graphQL: {
    disablePlaygroundInProduction: true,
    schemaOutputFile: path.resolve(workspacePath, 'packages/data-models/cms-schema.graphql'),
  },
  typescript: {
    declare: false,
    outputFile: path.resolve(workspacePath, 'packages/data-models/src/lib/cms-types/payload-types.ts'),
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
    users,
    // content
    categories,
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
    // auditFieldPlugin({
    //   usersSlug: users.slug as keyof Config['collections'],
    // }),
    // blurhashPlugin({
    //   generateDataUrl: false,
    //   generateSizes: true,
    //   showBlurhash: true,
    // }),
    cachedPayloadPlugin,
    nestedDocsPlugin({
      collections: [
        categories.slug,
      ],
      // parentFieldSlug: 'slug',
      // breadcrumbsFieldSlug: 'slug',
      // generateLabel: (_, doc) => doc?.label as string,
      generateURL: (docs) => docs.map(({ slug }) => slug as string).join('/'),
    }),
    // s3Storage({
    //   enabled: !!process.env.PEAKS_OSS_ENDPOINT,
    //
    //   collections: {
    //     [media.slug]: {
    //       disablePayloadAccessControl: true,
    //       generateFileURL,
    //       prefix: `peaks-fuel/${media.slug}`,
    //     },
    //     [stationAttachments.slug]: {
    //       disablePayloadAccessControl: true,
    //       generateFileURL,
    //       prefix: `peaks-fuel/${stationAttachments.slug}`,
    //     },
    //   },
    //
    //   bucket: process.env.PEAKS_OSS_BUCKET!,
    //   config: {
    //     credentials: {
    //       accessKeyId: process.env.PEAKS_OSS_ACCESS_KEY_ID!,
    //       secretAccessKey: process.env.PEAKS_OSS_ACCESS_KEY!,
    //     },
    //
    //     endpoint: process.env.PEAKS_OSS_ENDPOINT,
    //     forcePathStyle: false,
    //     region: process.env.PEAKS_OSS_REGION,
    //   },
    // }),
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
