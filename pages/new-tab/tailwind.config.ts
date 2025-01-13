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
      height: {
        'vh-25': '25vh', // 25%의 뷰포트 높이
        'vh-50': '50vh', // 50%의 뷰포트 높이
        'vh-75': '75vh', // 75%의 뷰포트 높이
        'vh-100': '100vh', // 100%의 뷰포트 높이
        '1124px': '1124px',
        '856px': '856px',
        '864px': '864px',
      },
      width: {
        '552px': '800px',
      },
    },
  },
} as Config;
