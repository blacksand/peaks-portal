import type { FluidPluginOptions } from './types.js'

export const defaultOptions: FluidPluginOptions = {
  prefix: 'fluid-',

  maxWidth: 1440,
  minWidth: 320,
  remBase: 16,

  /* eslint-disable perfectionist/sort-objects */
  ranges: {
    text: {
      'xs': ['xs', 'xs'],
      'sm': ['xs', 'sm'],
      'base': ['sm', 'base'],
      'lg': ['base', 'lg'],
      'xl': ['lg', 'xl'],
      '2xl': ['xl', '2xl'],
      '3xl': ['2xl', '3xl'],
      '4xl': ['3xl', '4xl'],
      '5xl': ['4xl', '5xl'],
      '6xl': ['5xl', '6xl'],
      '7xl': ['6xl', '7xl'],
      '8xl': ['7xl', '8xl'],
      '9xl': ['8xl', '9xl'],
    },
    spacing: {
      '3xs': ['4px', '4px'],
      '2xs': ['7px', '8px'],
      'xs': ['11px', '12px'],
      'sm': ['14px', '16px'],
      'md': ['21px', '24px'],
      'lg': ['28px', '32px'],
      'xl': ['42px', '48px'],
      '2xl': ['56px', '64px'],
      '3xl': ['84px', '96px'],
      // one-up pairs
      '3xs-2xs': ['4px', '8px'],
      '2xs-xs': ['7px', '12px'],
      'xs-sm': ['11px', '16px'],
      'sm-md': ['14px', '24px'],
      'md-lg': ['21px', '32px'],
      'lg-xl': ['28px', '48px'],
      'xl-2xl': ['42px', '64px'],
      '2xl-3xl': ['56px', '96px'],
      // for gird gap, sm to lg
      'base': ['14px', '32px'],
      // top navigator bar height
      'navbar': ['56px', '64px'],
    },
  },

  logger: undefined,
  showComments: false,
}
