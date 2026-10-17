// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server', // or 'hybrid' this enables server side rendering rather then storing static sites
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sanity({
    projectId: 'mc1571jp',
    dataset: 'production',
  })]
});