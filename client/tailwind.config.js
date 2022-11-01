const colors = require("tailwindcss");
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    
    colors: {
      white: "#fff",
      orange: "#ffa83d",
      primary: {
        10: "#f0fdf4",
        20: "#dcfce7",
        50: "#636be0",
        100: "#515ad2",
        200: "#4851c7",
        300: "#4049be",
        400: "#3942b7",
        500: "#313bb6",
        600: "#2b36b2",
        700: "#222eb2",
        800: "#166534",
        900 :"#14532d",
        950 :"#00a85561"
      },
      secondary: {
        10: "#fef2f2",
        20: "#fccfcf",
        50: "#fdb9b9",
        100: "#ffb0b0",
        200: "#ffa6a6",
        300: "#fa9292",
        400: "#ff8080",
        500: "#ff7373",
        600: "#ff6a6a",
        700: "#ff6565",
        800: "#ff5858",
        900: "#ff4f4f",
      },
      red: {
        100: "#ff6363",
        200: "#ff5454",
        300: "#ff4242",
        400: "#ff2f2f",
        500: "#ff1d1d",
      },
      dark: {
        5: "#f3f5f6",
        10: "#f1f1f1",
        50: "#e5e5e5",
        100: "#dcdcdc",
        200: "#adadad",
        300: "#868686",
        400: "#8d8d8d",
        500: "#6c6c6c",
        600: "#676767",
        700: "rgba(80,80,80,0.54)",
        800: "#343434",
        900: "#252525",
      },
      light: {
        5: "#858585",
        10: "#919191",
        50: "#9b9b9b",
        100: "#a9a9a9",
        200: "#b4b4b4",
        300: "#bebebe",
        400: "#c7c7c7",
        500: "#d7d7d7",
        600: "#e3e3e3",
        700: "#efefef",
        800: "#f6f6f6",
        900: "#fcfcfc",
      },
      gray: {
        50: "#f9fafb",
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      }
    },
    extend: {
        boxShadow: {
			1: "0 3px 20px -10px #3942b7ab"
        }
    },
  },
  variant: [],
  plugins: [],
  corePlugins: {
    container: false,
  },
}

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}
