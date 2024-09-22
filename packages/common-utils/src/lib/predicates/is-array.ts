export function isArray<T>(value: unknown): value is T[] {
  // 如果 value 是一个数组，那么返回 true
  return Array.isArray(value)
}
