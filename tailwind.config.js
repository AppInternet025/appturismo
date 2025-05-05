// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // Mantenlo si tuvieras pages también
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}', // ¡IMPORTANTE! Añadir 'app'
    ],
    theme: {
      extend: {
        // Puedes añadir extensiones aquí si las necesitas
      },
    },
    plugins: [
      require('@tailwindcss/forms'), // Añade el plugin si lo instalaste
    ],
  }