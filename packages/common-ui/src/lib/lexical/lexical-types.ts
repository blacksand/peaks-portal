import type { JSX } from 'react'
import type { Merge } from 'ts-essentials'

// import type { BlockSizing, LinkTo, Media, MediaSettings } from '@peaks/data'

export type LexicalNode = LexicalElementNode | LexicalTextNode

export interface SerializedLexicalNode {
  type: string
  version: number
}

export type TextFormatType =
  | 'bold'
  | 'underline'
  | 'strikethrough'
  | 'italic'
  | 'highlight'
  | 'code'
  | 'subscript'
  | 'superscript'

export type ElementFormatType =
  | 'left'
  | 'start'
  | 'center'
  | 'right'
  | 'end'
  | 'justify'
  | ''

export type LexicalElementNode = Merge<
  SerializedLexicalNode,
  {
    children: LexicalNode[]
    direction: 'ltr' | 'rtl' | null
    format: ElementFormatType
    indent: number
  }
>

export type TextModeType = 'normal' | 'token' | 'segmented'

export type LexicalTextNode = Merge<
  SerializedLexicalNode,
  {
    type: 'text' | 'tab'
    detail: number
    format: number
    mode: TextModeType
    style: string
    text: string
  }
>

export type ListType = 'number' | 'bullet' | 'check'
export type ListNodeTagType = 'ul' | 'ol'
export type LexicalListNode = Merge<
  {
    type: 'list'
    listType: ListType
    start: number
    tag: ListNodeTagType
  },
  LexicalElementNode
>

export type LexicalListItemNode = Merge<
  {
    type: 'listitem'
    checked: boolean | undefined
    value: number
  },
  LexicalElementNode
>

export type LexicalHeadingNode = Merge<
  {
    type: 'heading'
    tag: string
  },
  LexicalElementNode
>

export type LexicalHtmlTagNode = Merge<
  { tag: keyof JSX.IntrinsicElements },
  LexicalElementNode
>

export type LexicalLinkNode = Merge<
  {
    type: 'link' | 'autolink'
    // fields: LinkTo
    fields: {
      doc?: {
        relationTo?: string | null
        value?: string | null
      } | null
      linkType?: 'custom' | 'internal' | null
      newTab?: boolean | null
      text?: string | null
      url?: string | null
    }
  },
  LexicalElementNode
>

// export type LexicalUploadNode = Merge<
//   {
//     type: 'upload';
//     fields: {
//       sizing: BlockSizing;
//       mediaSettings: MediaSettings;
//     };
//     relationTo: string;
//     value: Media;
//   },
//   LexicalElementNode
// >;

export type LexicalRootNode = Merge<LexicalElementNode, { type: 'root' }>
