/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                recursive: "'Recursive Variable', 'Vazirmatn Variable'",
                openSans: "'Open Sans Variable', 'Vazirmatn Variable'",
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/container-queries'),
    ],
};