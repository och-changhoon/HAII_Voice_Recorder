module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        play: "url('../public/images/play.gif')",
        stop: "url('../public/images/play.png')",
      },
      fontFamily: {
        pretendard: [
          'Apple SD Gothic Neo',
          'Pretendard Variable',
          'Pretendard',
          'Roboto',
          'Noto Sans KR',
          'Segoe UI',
          'Malgun Gothic',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
        ],
      },
    },
  },
  plugins: [],
};
