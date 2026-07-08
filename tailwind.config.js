/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        forest:   '#0B3D2E',
        energy:   '#2ECC71',
        verdecl:  '#A3E4A9',
        petrol:   '#1F3A5F',
        turquesa: '#1ABC9C',
        solar:    '#F4D03F',
        carbon:   '#2C2C2C',
        gris:     '#D5D8DC',
        cream:    '#F7F4EF',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter:   ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(11,61,46,.10), 0 1px 4px rgba(0,0,0,.05)',
        lift: '0 12px 40px rgba(11,61,46,.18), 0 2px 8px rgba(0,0,0,.07)',
      },
    },
  },
  plugins: [],
}
