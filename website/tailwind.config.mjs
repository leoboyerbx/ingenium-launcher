/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat Variable', ...defaultTheme.fontFamily.sans]
            }
        },
    },
    plugins: [require('daisyui'),

    iconsPlugin({
        // Select the icon collections you want to use
        // You can also ignore this option to automatically discover all individual icon packages you have installed
        // If you install @iconify/json, you should explicitly specify the collections you want to use, like this:
        // collections: getIconCollections(["mdi", "lucide"]),
        // If you want to use all icons from @iconify/json, you can do this:
        // collections: getIconCollections("all"),
        // and the more recommended way is to use `dynamicIconsPlugin`, see below.
    }),
    ],
    daisyui: {
        themes: [
            {
                light: {
                    ...require("daisyui/src/theming/themes")["sunset"],
                    // primary: "#D7D414",
                    // secondary: "#9A2314",
                },
            }
        ]
    }
}
