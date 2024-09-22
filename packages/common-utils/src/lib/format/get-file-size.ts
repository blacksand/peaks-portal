const kb = 1024
const mb = kb * kb

export function getFileSize(size: number | undefined | null): string {
  if (size == null) {
    return ''
  }

  return size < kb / 2 ? `${size}B` : size < mb / 2 ? `${(size / kb).toFixed(1)}K` : `${(size / mb).toFixed(1)}M`
}
