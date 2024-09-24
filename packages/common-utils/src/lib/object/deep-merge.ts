import type { Dictionary } from 'ts-essentials'

import { isArray } from '../predicates/is-array'
import { isObject } from '../predicates/is-object'

function canMerge(value: unknown): value is Dictionary<unknown> {
  return isObject(value) && !isArray(value)
}

/**
 * 深度合并两个对象。
 *
 * @param target - 目标对象，将被合并到的对象。
 * @param source - 源对象，将被合并的对象。
 * @returns - 合并后的对象。
 */
export function deepMerge<T, R>(target: T, source: R): T & R {
  // 如果目标对象不能合并（不是对象或者是数组），则直接返回源对象。
  if (!canMerge(target)) {
    return (
      isArray(source) ? [...source] : isObject(source) ? { ...source } : source
    ) as T & R
  }

  const output = { ...target } as Dictionary<unknown>

  if (canMerge(source)) {
    for (const [key, value] of Object.entries(source)) {
      output[key] = canMerge(value)
        ? key in target
          ? deepMerge(target[key], value)
          : deepMerge({}, value)
        : value
    }
  }

  return output as T & R
}
