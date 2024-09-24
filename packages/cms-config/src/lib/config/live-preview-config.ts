import type { LivePreviewConfig } from 'payload'

export const livePreviewConfig: LivePreviewConfig = {
  breakpoints: [
    { name: 'mobile', label: '手机', height: 734, width: 390 },
    { name: 'tablet', label: '平板', height: 1024, width: 768 },
    { name: 'desktop', label: '桌面', height: 900, width: 1440 },
  ],
  // collections: [pages.slug],
  // url: generatePreviewUrl(),
}
