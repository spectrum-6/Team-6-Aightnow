import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "main-image": "url('/images/main_background.jpg')",
            },
            boxShadow: {
                login: "0 0 10px 5px rgba(203, 203, 203, 0.25)",
            },
            dropShadow: {
                fab: "0 0 20px rgba(24, 37, 76, 0.5)",
            },
            colors: {
                navy: {
                    50: "#E6E9EF",
                    100: "#C0C8D9",
                    200: "#98A5BF",
                    300: "#7282A5",
                    400: "#546894",
                    500: "#364F84",
                    600: "#30487C",
                    700: "#283E70",
                    800: "#213564",
                    900: "#18254C",
                },
                blue: {
                    50: "#E1F5FD",
                    100: "#B2E6FA",
                    200: "#80D5F7",
                    300: "#4CC5F4",
                    400: "#1CB8F3",
                    500: "#00ACF2",
                    600: "#009EE3",
                    700: "#008BD0",
                    800: "#0079BC",
                    900: "#005A9B",
                },
                grayscale: {
                    100: "#F5F5F5",
                    200: "#E9E9E9",
                    300: "#C5C5C5",
                    400: "#9F9F9F",
                    500: "#7D7D7D",
                    600: "#575757",
                    700: "#454545",
                    800: "#282828",
                    900: "#121212",
                },
                warning: {
                    100: "#FF294F",
                },
                success: {
                    100: "#1FCE65",
                },
            },
        },
    },
    plugins: [],
};
export default config;
