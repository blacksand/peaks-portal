import type { RuleDefinitions } from '../utils/types.js'

const key = 'spacing'

export const positionRules: RuleDefinitions = {
  'bottom': { key, properties: ['bottom'] },
  'inset': { key, properties: ['inset'] },
  'inset-x': { key, properties: ['left', 'right'] },
  'inset-y': { key, properties: ['top', 'bottom'] },
  'left': { key, properties: ['left'] },
  'right': { key, properties: ['right'] },
  'top': { key, properties: ['top'] },
}
