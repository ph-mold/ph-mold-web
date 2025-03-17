/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: "var(--noto_sans_kr), sans-serif",
      },
      colors: {
        background: "var(--pm-background)",
        foreground: "var(--pm-foreground)",
        signature: "var(--pm-signature)",
        signature2: "var(--pm-signature2)",
        signature3: "var(--pm-signature3)",
        signature4: "var(--pm-signature4)",
      },
    },
  },
  plugins: [],
};
