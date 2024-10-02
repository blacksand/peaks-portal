import type { CollectionConfig, GlobalConfig, LivePreviewConfig } from 'payload'
import { isString } from 'remeda'

export const livePreviewConfig: LivePreviewConfig = {
  breakpoints: [
    { name: 'mobile', label: '手机', height: 734, width: 390 },
    { name: 'tablet', label: '平板', height: 1024, width: 768 },
    { name: 'desktop', label: '桌面', height: 900, width: 1440 },
  ],
  // url: generatePreviewUrl(),
}

interface GeneratePreviewPathArgs {
  collectionConfig?: Pick<CollectionConfig, 'slug'>
  data: Record<string, unknown>
  globalConfig?: Pick<GlobalConfig, 'slug'>
}

export function generatePreviewPath(overrides: Partial<GeneratePreviewPathArgs> = {}) {
  return ({
    collectionConfig = overrides.collectionConfig,
    data = overrides.data ?? {},
    globalConfig = overrides.globalConfig,
  }: GeneratePreviewPathArgs) => {
    const urlBase = isString(data.previewUrl) ? data.previewUrl : ''
    if (!urlBase) {
      return ''
    }

    const type = collectionConfig?.slug ?? globalConfig?.slug
    const slug = data.slug

    if (!isString(type) || !isString(slug)) {
      return ''
    }

    return `${urlBase}?type=${encodeURIComponent(type)}&slug=${encodeURIComponent(slug)}`
  }
}
