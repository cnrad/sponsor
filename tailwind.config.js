module.exports = {
    mode: "jit",
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                default: [
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Helvetica",
                    "Arial",
                    "sans-serif",
                    "Apple Color Emoji",
                    "Segoe UI Emoji",
                ],
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
