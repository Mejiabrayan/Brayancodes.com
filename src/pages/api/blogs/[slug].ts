import type { APIRoute } from "astro";
import { db, PageViews, eq, sql } from "astro:db";

// Rate limiting setup
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours
const MAX_REQUESTS = 10; // Maximum requests per IP per slug per window
const requestMap = new Map();

// Set this endpoint to be server-side rendered

export const GET: APIRoute = async ({ params, request }) => {
  try {
    const slug = params.slug;
    if (!slug) {
      return new Response(JSON.stringify({ error: "Slug is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get client IP
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    const key = `${ip}:${slug}`;
    const now = Date.now();

    // Rate limiting check
    const requestData = requestMap.get(key) || { count: 0, timestamp: now };
    if (now - requestData.timestamp > RATE_LIMIT_WINDOW) {
      requestData.count = 1;
      requestData.timestamp = now;
    } else if (requestData.count >= MAX_REQUESTS) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(RATE_LIMIT_WINDOW / 1000),
        },
      });
    } else {
      requestData.count++;
    }
    requestMap.set(key, requestData);

    // Get view count using the query builder
    const result = await db
      .select()
      .from(PageViews)
      .where(eq(PageViews.slug, `blog:${slug}`));
    const views = result[0]?.views ?? 0;

    return new Response(JSON.stringify({ views }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, must-revalidate",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error: any) {
    console.error("Error handling view count:", error);
    console.error(
      "Error details:",
      JSON.stringify({
        error: error.message,
        stack: error.stack,
        params: params,
        env: {
          hasUrl: Boolean(process.env.ASTRO_DB_REMOTE_URL),
          hasToken: Boolean(process.env.ASTRO_DB_APP_TOKEN),
        },
      }),
    );
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const slug = params.slug;
    if (!slug) {
      return new Response(JSON.stringify({ error: "Slug is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Add 'blog:' prefix to differentiate from project posts
    const blogSlug = `blog:${slug}`;

    // Increment view count using the query builder
    await db
      .insert(PageViews)
      .values({
        slug: blogSlug,
        views: 1,
        last_viewed: new Date(),
      })
      .onConflictDoUpdate({
        target: PageViews.slug,
        set: {
          views: sql`${PageViews.views} + 1`,
          last_viewed: new Date(),
        },
      });

    // Get updated count
    const result = await db
      .select()
      .from(PageViews)
      .where(eq(PageViews.slug, blogSlug));
    const views = result[0]?.views ?? 0;

    return new Response(JSON.stringify({ views }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, must-revalidate",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error: any) {
    console.error("Error handling view count:", error);
    console.error(
      "Error details:",
      JSON.stringify({
        error: error.message,
        stack: error.stack,
        params: params,
        env: {
          hasUrl: Boolean(process.env.ASTRO_DB_REMOTE_URL),
          hasToken: Boolean(process.env.ASTRO_DB_APP_TOKEN),
        },
      }),
    );
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

// Handle OPTIONS requests for CORS
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
};
