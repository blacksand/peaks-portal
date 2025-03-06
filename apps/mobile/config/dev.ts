import type { UserConfigExport } from '@tarojs/cli'

export default {
  h5: {},
  logger: {
    quiet: false,
    stats: true,
  },
  mini: {},
} satisfies UserConfigExport<'webpack5'>
