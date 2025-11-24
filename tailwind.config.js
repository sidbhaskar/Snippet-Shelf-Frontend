/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                secondary: 'var(--bg-secondary)',
                accent: 'var(--accent)',
                muted: 'var(--text-secondary)',
                error: 'var(--error)',
            }
        },
    },
    plugins: [],
}
