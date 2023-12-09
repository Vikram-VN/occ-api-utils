/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        navy: "#0B2447",
        occ: "#231f20",
      },
      screens: {
        phone: "640px",
        // => @media (min-width: 640px) { ... }

        tablet: "768px",
        // => @media (min-width: 768px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }

        tv: "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
