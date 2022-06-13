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
        50: "#bbf7d0",
        100: "#86efac",
        200: "#25e386",
        300: "#30d586",
        400: "#17BB6A",
        500: "#0bad5f",
        600: "#16a34a",
        700: "#15803d",
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
        05: "#f3f5f6",
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
