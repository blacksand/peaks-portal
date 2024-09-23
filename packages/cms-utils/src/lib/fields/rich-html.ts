import { lexicalHTML } from '@payloadcms/richtext-lexical'

type LexicalHTMLParams = Parameters<typeof lexicalHTML>

export type RichHtmlField = LexicalHTMLParams[1] & {
  richTextField: string
}

export function richHtml({ richTextField, ...options }: RichHtmlField) {
  return lexicalHTML(richTextField, {
    ...options,
    name: options.name || `${richTextField}Html`,
  })
}
