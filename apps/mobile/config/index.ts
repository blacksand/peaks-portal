import { defineConfig } from '@tarojs/cli'
import type { UserConfigExport } from '@tarojs/cli'
import { createSwcRegister, getModuleDefaultExport } from '@tarojs/helper'

import developmentConfig from './dev'
import productionConfig from './prod'

export default defineConfig<'webpack5'>(async (merge) => {
  createSwcRegister({ only: [(path: string) => path.includes('@unocss')] })
  const UnoCSS = getModuleDefaultExport(await import('@unocss/webpack').then((m) => m.default))

  const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: 'mobile',

    compiler: {
      type: 'webpack5',
      prebundle: {
        enable: false,
      },
    },
    date: '2024-10-2',
    framework: 'react',
    outputRoot: `dist/${process.env.TARO_ENV}`,
    plugins: [],
    sourceRoot: 'src',

    designWidth: 750,
    deviceRatio: {
      375: 2,
      640: 2.34 / 2,
      750: 1,
      828: 1.81 / 2,
    },

    cache: {
      enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    copy: {
      options: {},
      patterns: [],
    },
    defineConstants: {},
    h5: {
      publicPath: '/',
      staticDirectory: 'static',

      output: {
        chunkFilename: 'js/[name].[chunkhash:8].js',
        filename: 'js/[name].[hash:8].js',
      },

      miniCssExtractPluginOption: {
        chunkFilename: 'css/[name].[chunkhash].css',
        filename: 'css/[name].[hash].css',
        ignoreOrder: true,
      },
      postcss: {
        autoprefixer: {
          config: {},
          enable: true,
        },
        cssModules: {
          config: {
            generateScopedName: '[name]__[local]___[hash:base64:5]',
            namingPattern: 'module', // 转换模式，取值为 global/module
          },
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
      },
      webpackChain: (chain) => {
        chain.plugin('unocss').use(UnoCSS())
      },
    },
    mini: {
      postcss: {
        cssModules: {
          config: {
            generateScopedName: '[name]__[local]___[hash:base64:5]',
            namingPattern: 'module', // 转换模式，取值为 global/module
          },
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
        pxtransform: {
          config: {},
          enable: true,
        },
      },
      webpackChain: (chain) => {
        chain.plugin('unocss').use(UnoCSS())
      },
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
      },
    },
  }

  return merge({}, baseConfig, process.env.NODE_ENV === 'development' ? developmentConfig : productionConfig)
})
