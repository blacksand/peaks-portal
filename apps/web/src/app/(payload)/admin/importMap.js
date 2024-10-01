import { AuditUiCell as AuditUiCell_0 } from '@peaks/payload-plugin-audit-fields/components'
import { AuditUiField as AuditUiField_1 } from '@peaks/payload-plugin-audit-fields/components'
import { SlugField as SlugField_2 } from '@peaks/cms-fields/components'
import { ColorCell as ColorCell_3 } from '@peaks/cms-fields/components'
import { ColorField as ColorField_4 } from '@peaks/cms-fields/components'
import { IconCell as IconCell_5 } from '@peaks/cms-fields/components'
import { IconField as IconField_6 } from '@peaks/cms-fields/components'
import { RichTextCell as RichTextCell_7 } from '@payloadcms/richtext-lexical/client'
import { RichTextField as RichTextField_8 } from '@payloadcms/richtext-lexical/client'
import { getGenerateComponentMap as getGenerateComponentMap_9 } from '@payloadcms/richtext-lexical/generateComponentMap'
import { FixedToolbarFeatureClient as FixedToolbarFeatureClient_10 } from '@payloadcms/richtext-lexical/client'
import { UploadFeatureClient as UploadFeatureClient_11 } from '@payloadcms/richtext-lexical/client'
import { InlineToolbarFeatureClient as InlineToolbarFeatureClient_12 } from '@payloadcms/richtext-lexical/client'
import { HorizontalRuleFeatureClient as HorizontalRuleFeatureClient_13 } from '@payloadcms/richtext-lexical/client'
import { BlockquoteFeatureClient as BlockquoteFeatureClient_14 } from '@payloadcms/richtext-lexical/client'
import { RelationshipFeatureClient as RelationshipFeatureClient_15 } from '@payloadcms/richtext-lexical/client'
import { LinkFeatureClient as LinkFeatureClient_16 } from '@payloadcms/richtext-lexical/client'
import { ChecklistFeatureClient as ChecklistFeatureClient_17 } from '@payloadcms/richtext-lexical/client'
import { OrderedListFeatureClient as OrderedListFeatureClient_18 } from '@payloadcms/richtext-lexical/client'
import { UnorderedListFeatureClient as UnorderedListFeatureClient_19 } from '@payloadcms/richtext-lexical/client'
import { IndentFeatureClient as IndentFeatureClient_20 } from '@payloadcms/richtext-lexical/client'
import { AlignFeatureClient as AlignFeatureClient_21 } from '@payloadcms/richtext-lexical/client'
import { HeadingFeatureClient as HeadingFeatureClient_22 } from '@payloadcms/richtext-lexical/client'
import { ParagraphFeatureClient as ParagraphFeatureClient_23 } from '@payloadcms/richtext-lexical/client'
import { InlineCodeFeatureClient as InlineCodeFeatureClient_24 } from '@payloadcms/richtext-lexical/client'
import { SuperscriptFeatureClient as SuperscriptFeatureClient_25 } from '@payloadcms/richtext-lexical/client'
import { SubscriptFeatureClient as SubscriptFeatureClient_26 } from '@payloadcms/richtext-lexical/client'
import { StrikethroughFeatureClient as StrikethroughFeatureClient_27 } from '@payloadcms/richtext-lexical/client'
import { UnderlineFeatureClient as UnderlineFeatureClient_28 } from '@payloadcms/richtext-lexical/client'
import { BoldFeatureClient as BoldFeatureClient_29 } from '@payloadcms/richtext-lexical/client'
import { ItalicFeatureClient as ItalicFeatureClient_30 } from '@payloadcms/richtext-lexical/client'
import { BlurhashCell as BlurhashCell_31 } from '@peaks/payload-plugin-blurhash/components'
import { BlurhashField as BlurhashField_32 } from '@peaks/payload-plugin-blurhash/components'
import { BrandLogo as BrandLogo_33 } from '@peaks/web-ui/admin'

export const importMap = {
  "@peaks/payload-plugin-audit-fields/components#AuditUiCell": AuditUiCell_0,
  "@peaks/payload-plugin-audit-fields/components#AuditUiField": AuditUiField_1,
  "@peaks/cms-fields/components#SlugField": SlugField_2,
  "@peaks/cms-fields/components#ColorCell": ColorCell_3,
  "@peaks/cms-fields/components#ColorField": ColorField_4,
  "@peaks/cms-fields/components#IconCell": IconCell_5,
  "@peaks/cms-fields/components#IconField": IconField_6,
  "@payloadcms/richtext-lexical/client#RichTextCell": RichTextCell_7,
  "@payloadcms/richtext-lexical/client#RichTextField": RichTextField_8,
  "@payloadcms/richtext-lexical/generateComponentMap#getGenerateComponentMap": getGenerateComponentMap_9,
  "@payloadcms/richtext-lexical/client#FixedToolbarFeatureClient": FixedToolbarFeatureClient_10,
  "@payloadcms/richtext-lexical/client#UploadFeatureClient": UploadFeatureClient_11,
  "@payloadcms/richtext-lexical/client#InlineToolbarFeatureClient": InlineToolbarFeatureClient_12,
  "@payloadcms/richtext-lexical/client#HorizontalRuleFeatureClient": HorizontalRuleFeatureClient_13,
  "@payloadcms/richtext-lexical/client#BlockquoteFeatureClient": BlockquoteFeatureClient_14,
  "@payloadcms/richtext-lexical/client#RelationshipFeatureClient": RelationshipFeatureClient_15,
  "@payloadcms/richtext-lexical/client#LinkFeatureClient": LinkFeatureClient_16,
  "@payloadcms/richtext-lexical/client#ChecklistFeatureClient": ChecklistFeatureClient_17,
  "@payloadcms/richtext-lexical/client#OrderedListFeatureClient": OrderedListFeatureClient_18,
  "@payloadcms/richtext-lexical/client#UnorderedListFeatureClient": UnorderedListFeatureClient_19,
  "@payloadcms/richtext-lexical/client#IndentFeatureClient": IndentFeatureClient_20,
  "@payloadcms/richtext-lexical/client#AlignFeatureClient": AlignFeatureClient_21,
  "@payloadcms/richtext-lexical/client#HeadingFeatureClient": HeadingFeatureClient_22,
  "@payloadcms/richtext-lexical/client#ParagraphFeatureClient": ParagraphFeatureClient_23,
  "@payloadcms/richtext-lexical/client#InlineCodeFeatureClient": InlineCodeFeatureClient_24,
  "@payloadcms/richtext-lexical/client#SuperscriptFeatureClient": SuperscriptFeatureClient_25,
  "@payloadcms/richtext-lexical/client#SubscriptFeatureClient": SubscriptFeatureClient_26,
  "@payloadcms/richtext-lexical/client#StrikethroughFeatureClient": StrikethroughFeatureClient_27,
  "@payloadcms/richtext-lexical/client#UnderlineFeatureClient": UnderlineFeatureClient_28,
  "@payloadcms/richtext-lexical/client#BoldFeatureClient": BoldFeatureClient_29,
  "@payloadcms/richtext-lexical/client#ItalicFeatureClient": ItalicFeatureClient_30,
  "@peaks/payload-plugin-blurhash/components#BlurhashCell": BlurhashCell_31,
  "@peaks/payload-plugin-blurhash/components#BlurhashField": BlurhashField_32,
  "@peaks/web-ui/admin#BrandLogo": BrandLogo_33
}
