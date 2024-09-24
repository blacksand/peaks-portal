import { GLOB_MARKDOWN_CODE, GLOB_SRC_EXT, GLOB_TS, GLOB_TSX } from '@antfu/eslint-config'
import path from 'node:path'

/**
 *  配置 typescript 规则
 *  @param {{allowDefaultProject?: string[], tsconfigPath?: string}} options input options
 *  @returns {[import('eslint').Linter.Config]} Array of eslint flat config
 */
export function typescript(options = {}) {
  const { allowDefaultProject = ['./*.js'], tsconfigPath } = options
  const typeAware = !!tsconfigPath

  return [
    {
      name: 'peaks/typescript/rules',
      files: [GLOB_TS, GLOB_TSX],
      rules: {
        'ts/adjacent-overload-signatures': 'error',
        'ts/array-type': ['error', { default: 'array-simple' }],
        'ts/consistent-generic-constructors': 'error',
        'ts/consistent-indexed-object-style': 'error',
        'ts/consistent-type-assertions': 'error',
        'ts/consistent-type-imports': 'error',
        'ts/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
            allowFunctionsWithoutTypeParameters: true,
            allowHigherOrderFunctions: true,
            allowIIFEs: true,
            allowTypedFunctionExpressions: true,
          },
        ],
        'ts/no-confusing-non-null-assertion': 'error',
        'ts/no-explicit-any': 'error',
        'ts/no-inferrable-types': 'error',
        'ts/no-magic-numbers': [
          'error',
          {
            ignore: [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 24, 30, 50, 60, 90, 100, 500, 1000],
            ignoreArrayIndexes: true,
            ignoreDefaultValues: true,
            ignoreEnums: true,
            ignoreNumericLiteralTypes: true,
            ignoreReadonlyClassProperties: true,
            ignoreTypeIndexes: true,
          },
        ],
        'ts/no-shadow': 'error',
        'ts/no-unused-vars': [
          'error',
          {
            args: 'after-used',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            ignoreRestSiblings: true,
            varsIgnorePattern: '^_',
          },
        ],
        'ts/prefer-function-type': 'error',
        'ts/unified-signatures': 'error',

        // 关闭重复规则
        'no-shadow': 'off',
        'unused-imports/no-unused-vars': 'off',

        // deprecated
        'ts/no-empty-interface': 'off',
      },
    },
    ...(typeAware
      ? [
          {
            name: 'peaks/typescript/rules-type-aware',
            files: [GLOB_TS, GLOB_TSX],
            ignores: [GLOB_MARKDOWN_CODE],
            languageOptions: {
              parserOptions: {
                projectService: {
                  allowDefaultProject,
                  defaultProject: path.basename(tsconfigPath),
                },
                tsconfigRootDir: path.dirname(tsconfigPath),
              },
            },
            rules: {
              'ts/consistent-type-exports': [
                'error',
                {
                  fixMixedExportsWithInlineTypeSpecifier: true,
                },
              ],
              // 'ts/naming-convention': [
              //   'error',
              //   {
              //     selector: 'variable',
              //     format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
              //   },
              //   {
              //     selector: 'function',
              //     format: ['camelCase', 'PascalCase'],
              //   },
              //   {
              //     selector: 'typeLike',
              //     format: ['PascalCase'],
              //   },
              // ],
              // 'ts/no-base-to-string': 'error',
              // 不能使用箭头函数简写语法
              // 'ts/no-confusing-void-expression': 'error',
              // 'ts/no-duplicate-type-constituents': 'error',
              // 'ts/no-meaningless-void-operator': 'error',
              // 'ts/no-redundant-type-constituents': 'error',
              // 'ts/no-unnecessary-boolean-literal-compare': 'error',
              // 'ts/no-unnecessary-condition': 'error',
              // 'ts/no-unnecessary-template-expression': 'error',
              // 'ts/no-unnecessary-type-arguments': 'error',
              // 'ts/no-unnecessary-type-parameters': 'error',
              // 'ts/no-unsafe-unary-minus': 'error',
              'ts/non-nullable-type-assertion-style': 'error',
              // 'ts/only-throw-error': 'error',
              // 'ts/prefer-find': 'error',
              'ts/prefer-for-of': 'error',
              'ts/prefer-includes': 'error',
              'ts/prefer-nullish-coalescing': ['error', { ignorePrimitives: { string: true } }],
              'ts/prefer-optional-chain': 'error',
              'ts/prefer-promise-reject-errors': 'error',
              // 'ts/prefer-readonly': 'error',
              'ts/prefer-reduce-type-parameter': 'error',
              'ts/prefer-regexp-exec': 'error',
              // 'ts/prefer-string-starts-ends-with': 'error',
              // 会误报错误
              'ts/promise-function-async': 'off',

              'require-await': 'off',
              'ts/require-await': 'error',

              // 太严格了
              'ts/strict-boolean-expressions': [
                'off',
                {
                  allowNullableBoolean: true,
                  allowNullableEnum: true,
                  allowNullableNumber: true,
                  allowNullableObject: true,
                  allowNullableString: true,
                  allowNumber: true,
                  allowString: true,
                },
              ],

              // 'ts/use-unknown-in-catch-callback-variable': 'error',
            },
          },
        ]
      : []),
    {
      name: 'peaks/typescript/disables/test',
      files: ['**/*.{spec,test}.ts?(x)', GLOB_MARKDOWN_CODE],
      languageOptions: {
        parserOptions: {
          projectService: {},
          tsconfigRootDir: undefined,
        },
      },
      rules: {
        'eslint-comments/no-unlimited-disable': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unassigned-import': 'off',
        'ts/no-explicit-any': 'off',
        'ts/no-magic-numbers': 'off',
        'ts/no-unused-vars': 'off',
        ...(typeAware
          ? {
              'ts/no-unsafe-argument': 'off',
              'ts/no-unsafe-assignment': 'off',
              'ts/no-unsafe-call': 'off',
              'ts/no-unsafe-member-access': 'off',
              'ts/no-unsafe-return': 'off',
              'ts/require-await': 'off',
              'ts/strict-boolean-expressions': 'off',
            }
          : {}),
      },
    },
    {
      name: 'peaks/typescript/disables/tsx',
      files: [`**/*.${GLOB_TSX}`],
      rules: {
        'ts/explicit-function-return-type': 'off',
      },
    },
    {
      name: 'peaks/typescript/disables/dts',
      files: ['**/*.d.?({c,m})ts?(x)'],
      rules: {
        'ts/no-explicit-any': 'off',
        'ts/no-unused-vars': 'off',
      },
    },
    {
      name: 'peaks/typescript/disables/generated-files',
      files: [`**/*.generated.${GLOB_SRC_EXT}`, '**/payload-types.ts'],
      rules: {
        'antfu/top-level-function': 'off',
        'eslint-comments/no-unlimited-disable': 'off',

        'perfectionist/sort-imports': 'off',
        'perfectionist/sort-interfaces': 'off',
        'perfectionist/sort-jsx-props': 'off',
        'perfectionist/sort-named-imports': 'off',
        'perfectionist/sort-object-types': 'off',
        'perfectionist/sort-objects': 'off',

        'ts/ban-tslint-comment': 'off',
        'ts/explicit-function-return-type': 'off',
        'ts/naming-convention': 'off',
        'ts/no-unsafe-argument': 'off',
        'ts/no-unsafe-assignment': 'off',
        'ts/no-unsafe-member-access': 'off',
        'ts/no-unsafe-return': 'off',
        'ts/prefer-nullish-coalescing': 'off',

        'unicorn/no-abusive-eslint-disable': 'off',
        'unicorn/prevent-abbreviations': 'off',
      },
    },
  ]
}
