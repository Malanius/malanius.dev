import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CATEGORIES } from './data/blogCategories';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(CATEGORIES),
    tags: z.array(z.string()).default([]),
  }),
});

const garden = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/garden' }),
  schema: z.object({
    title: z.string(),
    stage: z.enum(['seedling', 'budding', 'evergreen']),
    tags: z.array(z.string()).default([]),
    planted: z.coerce.date(),
    tended: z.coerce.date(),
  }),
});

export const collections = { blog, garden };
