// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Gehostet unter https://twoace.github.io/security-portfolio/.
// Bei eigener Domain entfällt `base`.
export default defineConfig({
  site: 'https://twoace.de',
  //base: '/security-portfolio',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
