export default {
  extends: ['@commitlint/config-nx-scopes'],
  ignores: [(message) => /^wip\b/i.test(message)],
}
