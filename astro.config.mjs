// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: an deinen GitHub-Namen / dein Repo anpassen.
// Für https://<user>.github.io/security-portfolio/ ist `base` nötig.
// Mit eigener Domain oder Repo "<user>.github.io": base entfernen.
export default defineConfig({
  site: 'https://twoace.github.io',
  base: '/security-portfolio',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark' },
  },
});
