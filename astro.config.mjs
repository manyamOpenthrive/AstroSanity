import { defineConfig } from 'astro/config';
import sanity from "astro-sanity";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    integrations: [sanity({
        projectId: "gpv58soz",
        dataset: "production",
        apiVersion: 'v2022-03-07',
        useCdn: false,
        studioBasePath: '/studio' // If you want to access the Studio on a route
    }), tailwind()]
});