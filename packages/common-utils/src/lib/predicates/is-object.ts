export function isObject<T>(
  value: T | undefined | null,
): value is T & object & Record<string, unknown> {
  return value != null && !Array.isArray(value) && typeof value === 'object'
}
