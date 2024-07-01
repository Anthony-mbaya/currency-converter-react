/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "bitcoin": "url('/images/bitcoin.avif')",
      },
    },
  },
  plugins: [],
}

