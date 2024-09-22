/**
 * eslint-config-node
 * @returns {[import('eslint').Linter.Config]} Array of eslint flat config
 */
export function node() {
  return [
    {
      name: 'peaks/node/rules',
      rules: {
        'node/prefer-global/buffer': ['error', 'always'],
        'node/prefer-global/process': ['error', 'always'],
        'node/prefer-node-protocol': 'error',
      },
    },
  ]
}
