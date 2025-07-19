/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // If your main HTML file is directly in the project root
    "./src/**/*.{js,ts,jsx,tsx,html}", // Common pattern for files within a 'src' folder (adjust as per your project structure)
    // Add more paths if you have other directories or file types containing Tailwind classes
    // For example: "./public/**/*.html", if you have HTML files in a 'public' directory
  ],
  theme: {
    extend: {
      // You can extend Tailwind's default theme here (e.g., custom colors, fonts, spacing)
    },
  },
  plugins: [
    // Add any Tailwind CSS plugins here (e.g., require('@tailwindcss/forms'))
  ],
}
