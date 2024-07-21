/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderColor: {
        "custom-gray": "#d9d9d9",
      },
      textColor: {
        "custom-green": "#71b1a1",
      },
      backgroundColor: {
        "custom-green": "#129575",
      },
    },
  },
  plugins: [],
};
