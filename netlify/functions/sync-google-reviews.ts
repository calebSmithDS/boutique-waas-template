import type { Config } from "@netlify/functions";
import { createClient } from "@sanity/client";

// Initialize the Sanity client with write permissions
const sanity = createClient({
  projectId: 'mc1571jp', // Your actual project ID
  dataset: 'production',
  apiVersion: '2023-10-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // Must be false for writing data
});

export default async (req: Request) => {
  console.log("Starting weekly Google Review sync...");

  try {
    // 1. Find all tenants that have a Google Place ID configured
    const tenants = await sanity.fetch(
      `*[_type == "tenant" && defined(googlePlaceId)]{ tenantId, googlePlaceId }`
    );

    for (const tenant of tenants) {
      console.log(`Fetching reviews for tenant: ${tenant.tenantId}`);

      // 2. Hit the Google Places API
      const googleRes = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${tenant.googlePlaceId}&fields=reviews&key=${process.env.GOOGLE_PLACES_API_KEY}`
      );
      const googleData = await googleRes.json();

      if (!googleData.result?.reviews) continue;

      // 3. Filter for only 4 and 5 star reviews
      const topReviews = googleData.result.reviews.filter((r: any) => r.rating >= 4);

      for (const review of topReviews) {
        // 4. Check if we already imported this specific review to prevent duplicates
        const existingReview = await sanity.fetch(
          `*[_type == "review" && googleReviewId == $id][0]`,
          { id: review.author_url || review.time.toString() } // Fallback ID if Google omits it
        );

        if (!existingReview) {
          // 5. Create a new review document in Sanity
          await sanity.create({
            _type: 'review',
            tenantId: tenant.tenantId,
            source: 'google',
            authorName: review.author_name,
            rating: review.rating,
            text: review.text,
            googleReviewId: review.author_url || review.time.toString(),
          });
          console.log(`Created new review for ${review.author_name}`);
        }
      }
    }

    return new Response("Sync complete", { status: 200 });

  } catch (error) {
    console.error("Cron job failed:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

// Netlify configuration to run this automatically
export const config: Config = {
  schedule: "@weekly", // Runs once a week at midnight Sunday UTC
};