export function isNotExists(value: unknown): value is undefined | null {
  return value === undefined || value === null
}
