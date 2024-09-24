import type { Config } from 'payload'
import { zh } from 'payload/i18n/zh'

export const i18nConfig: Config['i18n'] = {
  fallbackLanguage: 'zh',
  supportedLanguages: { zh },
  translations: {
    zh: {
      general: {
        created: '创建于',
        createNew: '新建',
        payloadSettings: '管理界面设置',
      },
    },
  },
}
