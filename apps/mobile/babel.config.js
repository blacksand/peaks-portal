// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  presets: [
    [
      'taro',
      {
        compiler: 'webpack5',
        framework: 'react',
        ts: true,
      },
    ],
  ],
}
