import baseConfig from '@extension/tailwindcss-config';
import type { Config } from 'tailwindcss/types/config';

export default {
  ...baseConfig,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
} as Config;
module.exports = {
  theme: {
    extend: {
      colors: {
        customOrange: {
          DEFAULT: '#FF5111', // 기본값
          500: '#FF5111', // 밝기 단계
        },
      },
    },
  },
  plugins: [],
};
