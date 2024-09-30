export interface AuditUIContentItem {
  name?: string
  title: string
}

export interface AuditUIContentProps {
  items: Array<AuditUIContentItem | undefined>
}
