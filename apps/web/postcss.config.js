export default {
  plugins: {
    // 1. first
    tailwindcss: {
      config: './tailwind.config.js',
    },
    // 2. after tailwind
    autoprefixer: {},
  },
}
