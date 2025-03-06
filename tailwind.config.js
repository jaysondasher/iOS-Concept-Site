/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'ios-bg': '#f2f2f7',
                'ios-widget-bg': 'rgba(255, 255, 255, 0.8)',
                'ios-icon-shadow': 'rgba(0, 0, 0, 0.1)',
            },
            boxShadow: {
                'ios-icon': '0 4px 8px rgba(0, 0, 0, 0.1)',
                'ios-widget': '0 2px 10px rgba(0, 0, 0, 0.05)',
            },
            borderRadius: {
                'ios-icon': '22%',
                'ios-widget': '20px',
            },
        },
    },
    plugins: [],
} 