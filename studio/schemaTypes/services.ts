import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  groups: [
    {
      name: 'seo',
      title: 'SEO Settings',
    },
  ],
  fields: [
    defineField({
      name: 'tenantId',
      title: 'Tenant ID',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Service Title',
      type: 'string',
      description: 'e.g., Blocked Drains',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'Click Generate to automatically create the URL link (e.g., blocked-drains)',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'description',
      title: 'Full Page Description',
      type: 'text',
      description: 'The detailed text that will appear on this specific SEO service page.',
    }),
    // Add to both siteSettings.ts and service.ts
    defineField({
      name: 'seoTitle',
      title: 'SEO Title (Meta Title)',
      type: 'string',
      description: 'The title that appears in Google Search results. Keep under 60 characters.',
      group: 'seo', // Optional: You can create a tab in Sanity to keep this organized
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description (Meta Description)',
      type: 'text',
      description: 'The short summary that appears under the link in Google. Keep under 160 characters.',
      group: 'seo',
    }),
  ],
})