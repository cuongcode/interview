/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
      },
      fontSize: {
        h1: '58px',
        h2: '48px',
        h3: '40px',
        h4: '32px',
        h5: '24px',
        p1: '20px',
        p2: '18px',
        p3: '16px',
        p4: '14px',
        p5: '12px',
        p6: '10px',
      },
      colors: {
        background: {
          black: '#161616',
          gray: '#252525',
          bluedark:  '#151742',
          bluelight: '#1C1E4A',
        },
        primary: {
          100: '#186ADE',
          80: '#3D8DF5',
          60: '#75B1FF',
          40: '#D0DBFF',
          20: '#F5F8FE',
        },
        secondary: {
          100: '#6B6B6B',
          80: '#8D8D8D',
          60: '#A8A8A8',
          40: '#CACACA',
          20: '#E3E3E3',
        },
        success: {
          100: '#077D55',
          80: '#16A163',
          60: '#43C478',
          40: '#BAEDBC',
          20: '#DDF6DE',
        },
        warning: {
          100: '#CF5B16',
          80: '#EF743C',
          60: '#FC9162',
        },
        error: {
          100: '#D91F11',
          80: '#FA5343',
          60: '#FC9086',
          40: '#F3BEBE',
          20: '#F9DEDE',
        },
      }
    },
  },
  plugins: [],
}

