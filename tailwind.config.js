/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // "Obsidian & Editorial" Palette
        obsidian: "#09090b", // Richer black
        vapor: "#f4f4f5",    // Concrete/paper white
        concrete: "#e4e4e7", // Borders
        
        primary: {
          DEFAULT: "#09090b", // Primary action is always obsidian
          hover: "#27272a",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#3b82f6", // Electric Blue
          foreground: "#ffffff",
        }
      },
      borderRadius: {
        // "Sharp" Design System
        none: '0px',
        sm: '0px',
        DEFAULT: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '9999px', // Only for badges/avatars
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      letterSpacing: {
        tightest: '-0.05em',
        widest: '0.1em', // For labels
      },
    },
  },
  plugins: [],
}
