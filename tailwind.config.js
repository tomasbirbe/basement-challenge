module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      grotesque: ["Basement Grotesque"],
    },
    extend: {
      dropShadow: {
        "cart-title": "0px 0px 10px white",
      },
      fontSize: {
        "cart-title": "111px",
        "8.5xl": ["6.5rem", 1],
      },
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
        fit: "fit-content",
      },
      height: {
        580: "580px",
        header: "365px",
        footer: "486px",
        fit: "fit-content",
        min: "min-content",
        max: "max-content",
      },
      colors: {
        "starter-gradient": "#1D1D1D",
        "ending-gradient": "rgba(21, 21, 21, 0)",
      },
      outline: {
        custom: "1px solid #ffffff",
      },
      spacing: {
        asterisk: "29rem",
        asterisk2: "34rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
