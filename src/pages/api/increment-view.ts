import type { APIRoute } from "astro";
import { db, PageViews, sql } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return new Response("Missing slug", { status: 400 });
    }

    const result = await db
      .insert(PageViews)
      .values({ slug, views: 1 })
      .onConflictDoUpdate({
        target: PageViews.slug,
        set: {
          views: sql`views + 1`,
          last_viewed: sql`CURRENT_TIMESTAMP`,
        },
      })
      .returning()
      .get();

    return new Response(JSON.stringify({ views: result?.views ?? 1 }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to increment view:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
