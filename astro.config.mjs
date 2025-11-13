// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';


// https://astro.build/config
export default defineConfig({
  integrations: [preact()],
  vite: {
    server: {
      watch: {
        usePolling: true, // Force le polling pour détecter les changements
      },
      hmr: {
        overlay: true, // Affiche les erreurs
      },
    },
  },
});
