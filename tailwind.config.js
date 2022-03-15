module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      grotesque: ["Basement Grotesque"],
    },
    extend: {
      width: {
        overflow: "300wh",
        440: "440px",
      },
      height: {
        580: "580px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
