import baseConfig from '@extension/tailwindcss-config';
import type { Config } from 'tailwindcss/types/config';

export default {
  ...baseConfig,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'dm-serif': ['"DM Serif Text"', 'serif'], // DM Serif Text 폰트 추가
        lobster: ['Lobster', 'cursive'], // Lobster 폰트 추가
      },
    },
  },
} as Config;
