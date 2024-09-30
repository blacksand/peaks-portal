import type { Access, AccessArgs, Where } from 'payload'

export function requireOne(...access: readonly Access[]): Access {
  return async (args: AccessArgs) => {
    const allResult = await Promise.all(access.map((exec) => exec(args)))
    const where: Where[] = []

    for (const result of allResult) {
      if (result === true) {
        return true
      }

      if (result !== false) {
        where.push(result)
      }
    }

    return where.length === 0 ? false : where.length === 1 ? where[0]! : { or: where }
  }
}
