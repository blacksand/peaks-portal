import type {
  ArrayField,
  BlocksField,
  CheckboxField,
  CodeField,
  CollapsibleField,
  DateField,
  EmailField,
  GroupField,
  JoinField,
  JSONField,
  NumberField,
  PointField,
  RadioField,
  RelationshipField,
  RichTextField,
  RowField,
  SelectField,
  TabsField,
  TextareaField,
  TextField,
  UIField,
  UploadField,
} from 'payload'

export interface Types {
  code: [CodeField]
  array: [ArrayField]
  blocks: [BlocksField]
  checkbox: [CheckboxField]
  collapsible: [CollapsibleField]
  date: [DateField]
  email: [EmailField]
  group: [GroupField]
  join: [JoinField]
  json: [JSONField]
  number: [NumberField]
  point: [PointField]
  radio: [RadioField]
  relationship: [RelationshipField]
  richText: [RichTextField]
  row: [RowField]
  select: [SelectField]
  tabs: [TabsField]
  text: [TextField]
  textarea: [TextareaField]
  ui: [UIField]
  upload: [UploadField]
}

export type FK = keyof Types
export type FT<K extends FK> = Types[K][0]
export type FP<K extends FK> = Omit<FT<K>, 'type'>

export type CP<K extends FK> = Types[K][1] extends undefined
  ? FP<K>
  : Types[K][1]

export type COP<K extends FK> = Types[K][1] extends undefined
  ? Partial<FP<K>>
  : Partial<FP<K>> & Types[K][1]
