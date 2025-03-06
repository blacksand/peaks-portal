import { presetWeapp } from 'unocss-preset-weapp'
import {transformerClass} from 'unocss-preset-weapp/transformer'
import { defineConfig, type Preset, type SourceCodeTransformer } from 'unocss'

console.log('unocss.config.ts', { env: process.env.TARO_ENV })

const config = defineConfig({
  content: {
    pipeline: {
      include: [/\.([jt]sx|css|html)($|\?)/],
      exclude: [],
    },
  },
  safelist: [
    'text-base'
  ],

  presets: [
    // presetUno(),

    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(
      {
        isH5: process.env.TARO_ENV === 'h5',
        platform: 'taro',
        taroWebpack: 'webpack5',
        designWidth: 750,
      }) as Preset,
  ],
  shortcuts: [
    {},
  ],

  transformers: [
    // https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass() as unknown as SourceCodeTransformer,
  ],
})

export default config
