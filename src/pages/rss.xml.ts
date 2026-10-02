import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { entryUrl, getAllEntries } from '../lib';

export async function GET(context: APIContext) {
  const entries = await getAllEntries();
  return rss({
    title: 'security-portfolio',
    description: 'Writeups, Projekte und Lernnotizen auf dem Weg in die Cybersecurity.',
    site: context.site!,
    items: entries.map((e) => ({
      title: e.data.title,
      description: e.data.description,
      pubDate: e.data.date,
      link: entryUrl(e),
    })),
  });
}
