import type { Access, AccessArgs, Where } from 'payload'

export function requireAll(...access: readonly Access[]): Access {
  return async (args: AccessArgs) => {
    const allResult = await Promise.all(access.map((exec) => exec(args)))
    const where: Where[] = []

    for (const result of allResult) {
      if (result === false) {
        return false
      }

      if (result !== true) {
        where.push(result)
      }
    }

    return where.length === 0 ? true : where.length === 1 ? where[0]! : { and: where }
  }
}
