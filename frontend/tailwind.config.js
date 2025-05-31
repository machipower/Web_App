/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",           // 如果你有 index.html
    "./src/**/*.{js,ts,jsx,tsx}", // 所有 src 底下的 React 檔案
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
