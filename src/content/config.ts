import { z, defineCollection, reference } from "astro:content";

const blogs = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().max(60, {
      message: "Title must be 60 characters or less",
    }),
    description: z.string().max(160, {
      message: "Description must be 160 characters or less",
    }),
    image: z.string(),
    attributedImg: z.string().optional(),
    date: z.coerce.date(),
    author: z.string(),
    tags: z.array(z.string()).optional(),
    relatedPosts: z.array(reference("blogs")).optional(),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    link: z.string().optional(),
    overview: z.string(),
    date: z.date(),
    cover: z.string(),
    video: z.string().optional(),
  }),
});

export const collections = {
  blogs,
  projects,
};
