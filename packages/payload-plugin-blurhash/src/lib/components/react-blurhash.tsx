'use client'

import { Blurhash } from 'react-blurhash'

interface ReactBlurhashProps {
  className?: string
  hash: string
  height?: number
  width?: number
}

export function ReactBlurhash({
  className,
  hash,
  height,
  width,
}: ReactBlurhashProps) {
  return (
    <Blurhash className={className} hash={hash} height={height} width={width} />
  )
}
