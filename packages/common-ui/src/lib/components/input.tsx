import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

import { cn } from '@peaks/common-utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  asChild?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, asChild, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'input'

    return (
      <Comp
        ref={ref}
        className={cn(
          `
            flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
            ring-offset-background
            disabled:cursor-not-allowed disabled:opacity-50
            file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
            focus-visible:ring-offset-2
            placeholder:text-muted-foreground
          `,
          className,
        )}
        type={type}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
