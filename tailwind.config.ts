import type { Config } from 'tailwindcss'

const config : Config = {
  content : [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme : {
    extend : {
      backgroundImage : {
        'gradient-radial' : 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic' :
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  daisyui : {
    themes : [
      // {
      //   mytheme : {
      //     "primary" : "#008aff",
      //     "secondary" : "#c4b5fd",
      //     "accent" : "#f472b6",
      //     "neutral" : "#e5e7eb",
      //     "base-100" : "#e1ffe4",
      //     "info" : "#00ceff",
      //     "success" : "#00ca91",
      //     "warning" : "#ffa900",
      //     "error" : "#ff4c82",
      //   },
      // },
      // {
      //   mytheme2 : {
      //
      //     "primary" : "#67e8f9",
      //     "secondary" : "#f0abfc",
      //     "accent" : "#d946ef",
      //     "neutral" : "#e5e7eb",
      //     "base-100" : "#dcfce7",
      //     "info" : "#00ceff",
      //     "success" : "#00ca91",
      //     "warning" : "#ffa900",
      //     "error" : "#ff4c82",
      //
      //     "--rounded-box" : "1rem", // border radius rounded-box utility class, used in card and other large boxes
      //     "--rounded-btn" : "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
      //     "--rounded-badge" : "1.9rem", // border radius rounded-badge utility class, used in badges and similar
      //     "--animation-btn" : "0.25s", // duration of animation when you click on button
      //     "--animation-input" : "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
      //     "--btn-focus-scale" : "0.95", // scale transform of button when you focus on it
      //     "--border-btn" : "1px", // border width of buttons
      //     "--tab-border" : "1px", // border width of tabs
      //     "--tab-radius" : "0.5rem", // border radius of tabs
      //   },
      // },
      "light",
    ],
  },
  plugins : [require('daisyui')],
}
export default config
