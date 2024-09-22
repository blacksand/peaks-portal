declare module '@eslint/eslintrc' {
  class FlatCompat {
    extends: (plugin: string) => Linter.Config[]
  }
}

declare module 'eslint-plugin-promise' {
  import type { ESLint } from 'eslint'

  const plugin: ESLint.Plugin
  export default plugin
}

declare module 'eslint-plugin-jsx-a11y' {
  import type { ESLint } from 'eslint'

  const plugin: ESLint.Plugin
  export default plugin
}

declare module 'eslint-plugin-tailwindcss'{
  import type { ESLint } from 'eslint'

  const plugin: ESLint.Plugin
  export default plugin
}
