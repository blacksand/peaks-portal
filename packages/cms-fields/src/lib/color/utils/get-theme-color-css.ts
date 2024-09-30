export function getThemeColorCss(color: string) {
  switch (color) {
    case 'unset':
    case 'transparent':
    case 'currentColor': {
      return color
    }
    default: {
      return `hsl(var(--${color}))`
    }
  }
}
