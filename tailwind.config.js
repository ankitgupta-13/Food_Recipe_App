/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderColor: {
        "custom-gray": "#d9d9d9",
        "custom-green": "#71B1A1",
      },
      textColor: {
        "custom-green": "#71b1a1",
        "custom-light-gray": "#a9a9a9",
        "custom-dark-gray": "#484848",
      },
      backgroundColor: {
        "custom-green": "#129575",
        "custom-gray": "#d9d9d9",
      },
      fontSize: {
        xxs: "8px",
      },
      boxShadow: {
        "custom-light": "0px 0px 20px 0px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
