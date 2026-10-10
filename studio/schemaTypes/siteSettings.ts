import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    {
      name: 'seo',
      title: 'SEO Settings',
    },
  ],
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'The main H1 text (e.g., "Professional Service You Can Trust.")',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      description: 'The supporting paragraph below the headline.',
    }),
    defineField({
      name: 'licenseNumber',
      title: 'License Number',
      type: 'string',
      description: 'e.g., PGE 123456',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'The main image displayed next to the text on the homepage.',
      options: {
        hotspot: true, // Allows the contractor to adjust the focal point
      },
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