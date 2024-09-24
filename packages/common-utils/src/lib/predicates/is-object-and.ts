import { isObject } from './is-object'

/**
 * 判断给定的目标是否是 object，且满足给定的断言函数
 * @param value - 要判断的对象
 * @param predicate - 断言函数
 * @returns 如果目标是对象且满足断言函数返回 true，则返回 true
 */
export function isObjectAnd<T, P extends T = any>( // eslint-disable-line ts/no-explicit-any
  value: T | P,
  predicate: (target: T) => boolean,
): value is T {
  // 如果 value 是一个对象，并且 predicate 返回 true，那么返回 true
  return isObject<T>(value) && predicate(value)
}
