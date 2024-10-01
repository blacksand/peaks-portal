import type { Config } from 'payload'
import { zh } from 'payload/i18n/zh'
import { mergeDeep } from 'remeda'

import { iconFieldTranslations } from '@peaks/cms-fields/icon'

export const i18nConfig: Config['i18n'] = {
  fallbackLanguage: 'zh',
  supportedLanguages: { zh },
  translations: mergeDeep(
    {
      zh: {
        general: {
          created: '创建于',
          createNew: '新建',
          payloadSettings: '管理界面设置',
        },
      },
    },
    iconFieldTranslations,
  ),
}
