/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        textShow: "up 0.3s cubic-bezier(0.85, 0, 0.15, 1) 0.9s forwards",
        circleShow: "circle 0.3s cubic-bezier(0.85, 0, 0.15, 1) 0.3s forwards",
        peopleShow: "people 0.3s ease-in 0.6s forwards",
        comment01Show:
          "comment01 0.8s cubic-bezier(0.85, 0, 0.15, 1) 0.9s forwards",
      },
      keyframes: {
        slide: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
        up: {
          "0%": {
            transform: "translateY(10px)",
            opacity: 0,
          },
          "100%": {
            transform: "translateY(0)",
            opacity: 1,
          },
        },
        circle: {
          "0%": {
            width: 0,
            height: 0,
          },
          "100%": {
            width: "130px",
            height: "30px",
            border: "2px solid #333",
            transform: "translate(0, 0)",
          },
        },
        people: {
          "0%": {
            opacity: 0,
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        comment01: {
          "0%": {
            opacity: 0,
            transform: "scale(0.5) translateX(-15%)",
          },
          "100%": {
            opacity: 1,
            transform: "scale(1) translateX(-15%)",
          },
        },
      },
    },
  },
  plugins: [],
};
