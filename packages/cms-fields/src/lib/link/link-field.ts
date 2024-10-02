import type { FilterOptions, GroupField } from 'payload'
import { isPlainObject } from 'remeda'

import { field, withRow } from '@peaks/cms-utils'
import { slugs } from '@peaks/data-models'
import type { Page } from '@peaks/data-models/payload-types'

import { validateUrl } from '../utils/validate-url'

export function linkField(overrides?: Partial<GroupField>): GroupField {
  return field.group(
    {
      name: 'linkTo',
      label: '链接',
      interfaceName: 'LinkTo',

      fields: [
        withRow([
          field.text({
            name: 'text',
            label: '要显示的文本',
            required: true,
          }),

          field.radio({
            name: 'linkType',
            label: '链接类型',
            admin: {
              description: '选择输入一个自定义的文本URL或链接到另一个文档',
            },
            defaultValue: 'custom',
            options: [
              { label: '自定义URL', value: 'custom' },
              { label: '内部链接', value: 'internal' },
            ],
            required: true,
          }),
        ]),

        field.text({
          name: 'url',
          label: '链接网址',
          admin: {
            condition: (_, siblingData) => siblingData?.linkType !== 'internal',
          },
          required: true,
          validate: validateUrl,
        }),

        field.relationship({
          name: 'doc',
          label: '选择要链接的文档',
          admin: {
            condition: (_, siblingData) => siblingData?.linkType === 'internal',
          },
          filterOptions: (({ data, relationTo }) => {
            if (relationTo !== slugs.pages) {
              return true
            }

            const frontendId = isPlainObject(data)
              ? typeof data.frontend === 'string'
                ? data.frontend
                : data.frontend.id
              : null

            const published = {
              or: [
                { _status: { exists: false } },
                { _status: { equals: 'published' } },
              ],
            }

            const sameFrontend = {
              or: [
                { frontend: { exists: false } },
                { frontend: { equals: frontendId } },
              ],
            }

            return frontendId ? { and: [sameFrontend, published] } : published
          }) as FilterOptions<Page>,

          maxDepth: 0,
          relationTo: [
            slugs.pages,
            slugs.tags,
            slugs.categories,
          ],
          required: true,
        }),

        field.checkbox({
          name: 'newTab',
          label: '在新标签页中打开',
        }),
      ],
    },
    overrides,
  )
}
