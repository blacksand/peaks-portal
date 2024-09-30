import { useMemo } from 'react'
import type { CSSProperties } from 'react'

import type { ColorFieldValue } from '../components/types'
import { getThemeColorCss } from './get-theme-color-css'

export function useBackgroundColor(value: ColorFieldValue | undefined | null) {
  const { type, color, darkColor, darkMode, themeColor } = value ?? {}

  return useMemo(() => {
    let name = ''
    let className = ''
    const style: CSSProperties & Record<string, string | undefined> = {}

    if (type === 'custom' && color) {
      if (darkMode) {
        style['--peaks-background'] = color
        style['--peaks-dark-background'] = darkColor
        name = `${color}, ${darkColor}`
        className = 'bg-[var(--peaks-background)] dark:bg-[var(--peaks-dark-background)]'
      }
      else {
        name = color
        style.backgroundColor = color
      }
    }
    else if (type === 'theme' && themeColor) {
      name = themeColor
      style.backgroundColor = getThemeColorCss(themeColor)
    }

    return { name, className, style }
  }, [color, darkColor, darkMode, themeColor, type])
}
