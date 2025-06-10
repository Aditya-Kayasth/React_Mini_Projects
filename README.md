# React_Mini_Projects
These are the projects that I created while learning React JS


To install Tailwind into the vite + react app

# Step 1.

npm install -D tailwindcss@3
npx tailwindcss init


# Step 2.
// put in the Tailwind config file

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// put in index.css
@tailwind base;
@tailwind components;
@tailwind utilities;