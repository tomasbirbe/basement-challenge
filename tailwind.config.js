module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      grotesque: ["Basement Grotesque"],
    },
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      width: {
        overflow: "300wh",
        440: "440px",
      },
      height: {
        580: "580px",
        header: "365px",
        footer: "486px",
      },
      colors: {
        "starter-gradient": "#1D1D1D",
        "ending-gradient": "rgba(21, 21, 21, 0)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
