import type { JSX } from 'react'

import type {
  LexicalHtmlTagNode,
  LexicalNode,
  LexicalRootNode,
} from './lexical-types'

export interface NodeInfo {
  deepestLevel: number
  key: string
  level: number
  needRender: boolean
}

export interface LexicalRootProps {
  className?: string
  node: LexicalRootNode | undefined | null
  noRichText?: boolean | null
}

export interface LexicalComponentProps<T extends LexicalNode = LexicalNode> {
  infoMap: Map<LexicalNode, NodeInfo>
  node: T
}

export interface LexicalHtmlTagProps
  extends LexicalComponentProps<LexicalHtmlTagNode> {
  tag?: keyof JSX.IntrinsicElements
}
