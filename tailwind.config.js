/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  plugins: [],
  theme: {
    extend: {
      animation: {
        circleShow: 'circle 0.3s cubic-bezier(0.85, 0, 0.15, 1) 0.3s forwards',
        comment01Show: 'comment01 0.8s cubic-bezier(0.85, 0, 0.15, 1) 0.9s forwards',
        peopleShow: 'people 0.3s ease-in 0.6s forwards',
        textShow: 'up 0.3s cubic-bezier(0.85, 0, 0.15, 1) 0.9s forwards',
      },
      keyframes: {
        circle: {
          '0%': {
            height: 0,
            width: 0,
          },
          '100%': {
            border: '2px solid #333',
            height: '30px',
            transform: 'translate(50%, 50%)',
            width: '130px',
          },
        },
        comment01: {
          '0%': {
            opacity: 0,
            transform: 'scale(0.5) translateX(-15%)',
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1) translateX(-15%)',
          },
        },
        people: {
          '0%': {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        slide: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        up: {
          '0%': {
            opacity: 0,
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
}
