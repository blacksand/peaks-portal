import { headers } from 'next/headers'

export function getCurrentUrl() {
  const headersList = headers()
  const url = headersList.get('x-invoke-path') ?? '/'
  return encodeURIComponent(url)
}
