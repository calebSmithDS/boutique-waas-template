// src/lib/sanity.ts
export async function getLayoutAndHomeData(tenantId: string) {
  const query = `
    query GetData($tenantId: String!) {
      allTenant(where: { tenantId: { eq: $tenantId } }) {
        businessName
        primaryColor { hex }
        logo { asset { url } }
        heroHeadline
        heroSubheadline
        heroImage { asset { url } }
        publicPhone
        contactEmail
      }
      allService(where: { tenantId: { eq: $tenantId } }) {
        title
        shortDescription
        slug { current }
        mainImage { asset { url } }
      }
      allReview(where: { tenantId: { eq: $tenantId } }) {
        authorName
        rating
        text
        source
      }
    }
  `;

  const res = await fetch('https://mc1571jp.apicdn.sanity.io/v2025-09-19/graphql/production/default', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { tenantId } }),
  });

  const json = await res.json();
  const tenant = json?.data?.allTenant?.[0] || {};
  
  return {
    tenant,
    services: json?.data?.allService || [],
    reviews: json?.data?.allReview || [],
  };
}