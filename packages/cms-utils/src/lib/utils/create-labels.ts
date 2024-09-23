import type { Labels } from 'payload'

export function createLabels(singular: string, plural?: string): Labels {
  return {
    plural: plural ?? singular,
    singular,
  }
}
