import { defineType, defineField } from 'sanity';

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'tenantId',
      title: 'Tenant ID',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'text',
      title: 'Review Text',
      type: 'text',
    }),
    defineField({
      name: 'source',
      title: 'Review Source',
      type: 'string',
      options: {
        list: [
          { title: 'Manual Upload', value: 'manual' },
          { title: 'Google Maps', value: 'google' },
          { title: 'Facebook', value: 'facebook' },
        ],
        layout: 'radio',
      },
      initialValue: 'manual',
    }),
    defineField({
      name: 'googleReviewId',
      title: 'Google Review ID',
      type: 'string',
      description: 'Used by the backend to prevent duplicate imports.',
      hidden: ({ document }) => document?.source !== 'google',
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'rating',
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title,
        subtitle: `${subtitle} Stars`,
      };
    },
  },
});