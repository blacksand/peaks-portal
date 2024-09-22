import type { LexicalElementNode, LexicalListItemNode, LexicalNode, LexicalTextNode } from './lexical-types'

/* eslint-disable perfectionist/sort-objects */
export const lexicalFormats = {
  IS_BOLD: 1,
  IS_ITALIC: 1 << 1,
  IS_STRIKETHROUGH: 1 << 2,
  IS_UNDERLINE: 1 << 3,
  IS_CODE: 1 << 4,
  IS_SUBSCRIPT: 1 << 5,
  IS_SUPERSCRIPT: 1 << 6,
  IS_HIGHLIGHT: 1 << 7,
}

/* eslint-enable perfectionist/sort-objects */

export function hasNestList(node: LexicalListItemNode) {
  return node.children?.some((child) => child.type === 'list')
}

export const textNodeTypes = ['text', 'tab']

export function isTextNode(node: { type: string }): node is LexicalTextNode {
  return textNodeTypes.includes(node.type)
}

export function isElementNode(node: LexicalNode): node is LexicalElementNode {
  return !isTextNode(node)
}

export function isEmptyNode(node: LexicalNode | undefined | null): boolean {
  return node
    ? isTextNode(node)
      ? node.text.trim().length === 0
      : node.children.every((child) => isEmptyNode(child))
    : true
}

const SUPPORTED_URL_PROTOCOLS = new Set([
  'http:',
  'https:',
  'mailto:',
  'sms:',
  'tel:',
])

export function sanitizeUrl(url: string): string {
  try {
    const parsedUrl = new URL(url ?? '')
    if (!SUPPORTED_URL_PROTOCOLS.has(parsedUrl.protocol)) {
      return 'about:blank'
    }
  }
  catch {
    return 'https://'
  }

  return url
}
