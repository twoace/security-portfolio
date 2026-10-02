import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Felder, die alle Einträge gemeinsam haben
const base = {
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
};

// Writeups: TryHackMe-Räume, CTFs, HackTheBox ...
const writeups = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writeups' }),
  schema: z.object({
    ...base,
    platform: z.enum(['TryHackMe', 'HackTheBox', 'CTF', 'Other']),
    difficulty: z.enum(['Info', 'Easy', 'Medium', 'Hard', 'Insane']).optional(),
    roomUrl: z.url().optional(),
  }),
});

// Projekte: Homelab, Tools, Skripte, Analysen
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    ...base,
    status: z.enum(['geplant', 'in Arbeit', 'abgeschlossen']),
    stack: z.array(z.string()).default([]),
    repo: z.url().optional(),
    featured: z.boolean().default(false),
  }),
});

// Notes: Lernnotizen aus Weiterbildung, Büchern, Kursen
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    ...base,
    source: z.string().optional(), // z.B. "Weiterbildung Modul 3", "THM Pre-Security"
  }),
});

export const collections = { writeups, projects, notes };
