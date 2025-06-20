import { defineDb, defineTable, column } from "astro:db";

// https://astro.build/db/config
const PageViews = defineTable({
  columns: {
    slug: column.text({ primaryKey: true }),
    views: column.number({ default: 1 }),
    last_viewed: column.date({ default: new Date() }),
  },
});

export default defineDb({
  tables: { PageViews },
});
