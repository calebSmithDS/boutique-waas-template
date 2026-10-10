import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    defineField({
      name: 'authorName',
      title: 'Customer Name',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location / Suburb',
      type: 'string',
      description: 'e.g., Blackwood, SA',
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'text',
    }),
  ],
})