declare module '*.svg' {
  import type { FC, SVGAttributes } from 'react'

  const content: string
  export const ReactComponent: FC<SVGAttributes<SVGElement>>
  export default content
}
