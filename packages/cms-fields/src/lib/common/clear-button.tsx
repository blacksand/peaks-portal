import { Button } from '@payloadcms/ui'
import type { JSX, MouseEvent } from 'react'

import { cn } from '@peaks/common-utils'

import './clear-button.css'

export interface ClearButtonProps {
  className?: string
  hidden?: boolean
  icon?: () => JSX.Element
  onClear?: (event: MouseEvent) => void
}

const baseClass = 'clear-button'

export function ClearButton({
  className,
  hidden,
  onClear,
}: ClearButtonProps) {
  return (
    <div className="clear-button__wrap">
      <Button
        className={cn(baseClass, className, hidden && 'hidden')}
        aria-hidden
        buttonStyle="icon-label"
        icon="x"
        iconStyle="without-border"
        round={false}
        type="button"
        onClick={onClear}
      />
    </div>
  )
}
