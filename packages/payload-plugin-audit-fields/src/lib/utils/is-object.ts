export function isObject<T>(
  value: T | undefined | null,
): value is T & object & Record<string, unknown> {
  // 如果 value 是一个对象，那么返回 true
  return typeof value === 'object' && value !== null
}
