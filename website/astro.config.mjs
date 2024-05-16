import tailwind from "@astrojs/tailwind";
import { defineConfig } from 'astro/config';

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), vue()]
});