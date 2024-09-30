import type { UIField } from 'payload'

export function uiField(showInSidebar?: boolean) {
  return [
    {
      name: 'audit',
      type: 'ui',
      label: '审计',
      admin: {
        components: {
          Cell: '@peaks/payload-plugin-audit-fields/components#AuditUiCell',
          Field: '@peaks/payload-plugin-audit-fields/components#AuditUiField',
        },
        position: showInSidebar ? 'sidebar' : undefined,
      },
    } satisfies UIField,
  ]
}
