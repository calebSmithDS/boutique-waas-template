// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { Redis } from "@upstash/redis";

// Initialize the Redis client. 
// Because this runs on the edge, we use the REST API version.
const redis = new Redis({
  url: import.meta.env.UPSTASH_REDIS_REST_URL,
  token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
});

export const onRequest = defineMiddleware(async (context, next) => {
  // 1. Are we running locally on localhost?
  if (import.meta.env.DEV) {
    // Just force the test tenant ID from your .env file
    context.locals.tenantId = import.meta.env.LOCAL_TEST_TENANT_ID;
    return next();
  }

  // 2. PRODUCTION LOGIC: If we are not in DEV, check Upstash Redis
  const host = new URL(context.request.url).host; 
  try {
    const tenantId = await redis.get<string>(host);
    context.locals.tenantId = tenantId || "tenant_not_found";
  } catch (error) {
    context.locals.tenantId = "tenant_error";
  }

  return next();
});