const baseConfig = require('@extension/tailwindcss-config'); // 기본 설정 가져오기

module.exports = {
  ...baseConfig, // baseConfig 설정 확장
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], // Tailwind가 적용될 파일 경로
  theme: {
    extend: {
      colors: {
        customOrange: {
          DEFAULT: '#FF5111', // 사용자 정의 색상 기본값
          500: '#FF5111', // 밝기 단계
        },
      },
    },
  },
  plugins: [],
};
