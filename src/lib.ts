import { getCollection, type CollectionEntry } from 'astro:content';

export type Kind = 'writeups' | 'projects' | 'notes';
export type AnyEntry = CollectionEntry<Kind>;

/** Alle veröffentlichten Einträge einer Sammlung, neueste zuerst. Drafts nur im Dev-Modus. */
export async function getPublished<K extends Kind>(kind: K): Promise<CollectionEntry<K>[]> {
  const entries = await getCollection(kind, ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getAllEntries(): Promise<AnyEntry[]> {
  const all = [
    ...(await getPublished('writeups')),
    ...(await getPublished('projects')),
    ...(await getPublished('notes')),
  ];
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Pfad mit base-Prefix, damit Links auch unter /security-portfolio/ funktionieren. */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export function entryUrl(entry: AnyEntry): string {
  return url(`${entry.collection}/${entry.id}/`);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('de-DE', { year: 'numeric', month: '2-digit', day: '2-digit' });
}

export function slugifyTag(tag: string): string {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const kindLabel: Record<Kind, string> = {
  writeups: 'Writeup',
  projects: 'Projekt',
  notes: 'Notiz',
};
