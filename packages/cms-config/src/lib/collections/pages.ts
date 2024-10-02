import type { CollectionConfig } from 'payload'

import { colorField } from '@peaks/cms-fields/color'
import { frontendField, previewUrlField } from '@peaks/cms-fields/frontend'
import { slugField } from '@peaks/cms-fields/slug'
import { access, createLabels, field, withRow } from '@peaks/cms-utils'
import { groups, slugs } from '@peaks/data-models'
import type { Page } from '@peaks/data-models/payload-types'

import { generatePreviewPath } from '../config/live-preview-config'

export const pages: CollectionConfig = {
  slug: slugs.pages,
  labels: createLabels('网站页面'),
  access: {
    create: access.allowUser({ roles: ['admin', 'moderator'] }),
    delete: access.allowAdmins(),
    read: access.requireOne(
      // 用户可以查看关联的已发布页面
      access.requireAll(
        access.allowPublished(),
        access.allowFrontends<Page>('frontend'),
      ),
      // 普通管理员可以查看关联的草稿页面
      access.requireAll(
        access.allowUser({ roles: ['moderator'] }),
        access.allowFrontends<Page>('frontend'),
      ),
      // 超级管理员可以查看全部内容
      access.allowAdmins(),
    ),
    update: access.requireOne(
      access.allowAdmins(),
      access.requireAll(
        access.allowUser({ roles: ['moderator'] }),
        access.allowFrontends<Page>('frontend'),
      ),
    ),
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt', 'publishedAt'],
    group: groups.content,
    useAsTitle: 'title',

    livePreview: {
      url: generatePreviewPath(),
    },
    preview: (data) => {
      return generatePreviewPath({ collectionConfig: { slug: slugs.pages } })({ data })
    },
  },
  custom: {
    auditFields: {
      showInSidebar: true,
    },
  },
  hooks: {
    // beforeChange: [],
    // afterChange: [revalidatePage],
    // afterRead: [
    //   ({ query, req }) => {
    //     req.payload.logger.info({ msg: 'afterRead hook', query });
    //   },
    // ],
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },

  fields: [
    slugField({
      name: 'slug',
      label: 'Slug',
      fieldToUse: 'title',
    }),

    frontendField(),
    previewUrlField(),

    field.text({
      name: 'title',
      label: '标题',
      required: true,
    }),

    field.tabs({
      tabs: [
        {
          label: '样式与颜色',
          fields: [
            withRow([
              colorField({
                name: 'backgroundColor',
                label: '背景颜色',
              }),
              colorField({
                name: 'textColor',
                label: '文本颜色',
              }),
            ]),
          ],
        },
        {
          label: '移动端',
          fields: [
            field.group({
              name: 'navigationBar',
              label: '导航栏',
              fields: [
                withRow([
                  field.text({
                    name: 'title',
                    label: '导航栏标题',
                    admin: {
                      placeholder: '<使用页面标题>',
                      width: '50%',
                    },
                  }),

                  field.radio({
                    name: 'style',
                    label: '导航栏样式',
                    admin: {
                      description: '自定义导航可用于在导航栏背景显示横幅图片',
                      width: '50%',
                    },
                    defaultValue: 'default',
                    options: [
                      { label: '默认', value: 'default' },
                      { label: '自定义', value: 'custom' },
                    ],
                  }),
                ]),

                field.checkbox({
                  name: 'glassify',
                  label: '毛玻璃效果 (仅自定义导航或 H5页面)',
                }),

                field.checkbox({
                  name: 'showOnHero',
                  label: '显示在横幅之上 (仅自定义导航或 H5页面)',
                }),

                withRow([
                  colorField({
                    name: 'backgroundColor',
                    label: '背景颜色',
                    admin: {
                      allowAlpha: true,
                      width: '50%',
                    },
                  }),

                  field.radio({
                    name: 'textColor',
                    label: '文本颜色',
                    admin: {
                      width: '50%',
                    },
                    defaultValue: 'black',
                    options: [
                      { label: '黑色', value: 'black' },
                      { label: '白色', value: 'white' },
                    ],
                  }),
                ]),
              ],
            }),

            field.group({
              name: 'pullDownArea',
              label: '下拉刷新区域',
              fields: [
                withRow([
                  colorField({
                    name: 'backgroundColor',
                    label: '背景颜色',
                    admin: {
                      width: '50%',
                    },
                  }),

                  field.radio({
                    name: 'textStyle',
                    label: '文本样式',
                    admin: {
                      width: '50%',
                    },
                    defaultValue: 'dark',
                    options: [
                      { label: '深色文本', value: 'dark' },
                      { label: '浅色文本', value: 'light' },
                    ],
                  }),
                ]),
              ],
            }),
          ],
        },
        // {
        //   name: 'banner',
        //   label: '页面横幅',
        //   fields: [...bannerFields],
        //   interfaceName: 'PageHero',
        // },
        {
          label: '页面内容',
          fields: [
            field.blocks({
              name: 'blocks',
              label: '页面内容',
              labels: createLabels('页面块'),
              blocks: [
                // mediaBlock,
                // contentBlock,
                // tilesBlock,
                // dataContainerBlock,
              ],
              required: true,
            }),
          ],
        },
      ],
    }),
  ],
}
