import './audit-ui-content.scss'
import type { AuditUIContentProps } from './types'

const baseClass = 'audit-ui'

export function AuditUiContent({ items }: AuditUIContentProps) {
  return (
    <div className={`field-type ui ${baseClass}`}>
      <ul>
        {items.map((item) =>
          item ? (
            <li key={item.title} className={`${baseClass}__item`}>
              <div className={`${baseClass}__label`}>
                {item.title}
              </div>
              <div className={`${baseClass}__value`}>{item.name || '-'}</div>
            </li>
          ) : null,
        )}
      </ul>
    </div>
  )
}
