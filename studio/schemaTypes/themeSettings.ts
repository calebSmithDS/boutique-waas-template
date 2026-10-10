import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'themeSettings',
  title: 'Theme & Branding',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      description: 'Upload the primary business logo (PNG or SVG preferred).',
      options: {
        hotspot: true, // Allows the client to crop/adjust the logo inside Sanity
      },
    }),
    defineField({
      name: 'primaryColor',
      title: 'Primary Brand Color',
      type: 'color',
      description: 'This color will be applied to buttons, icons, and highlights.',
    }),
    defineField({
      name: 'fontFamily',
      title: 'Global Font Style',
      type: 'string',
      description: 'Select the typographic feel of the website.',
      options: {
        list: [
          { title: 'Industrial & Heavy (Inter)', value: 'Inter' },
          { title: 'Classic & Clean (Roboto)', value: 'Roboto' },
          { title: 'Modern & Round (Outfit)', value: 'Outfit' },
        ],
        layout: 'radio', // Renders as clear radio buttons instead of a hidden dropdown
      },
      initialValue: 'Inter',
    }),
    defineField({
      name: 'buttonShape',
      title: 'Button & Card Shape',
      type: 'string',
      description: 'Choose how sharp or rounded the interactive elements should be.',
      options: {
        list: [
          { title: 'Sharp & Aggressive', value: 'rounded-none' },
          { title: 'Slight Curve (Standard)', value: 'rounded-md' },
          { title: 'Pill Shape (Friendly)', value: 'rounded-full' },
        ],
        layout: 'radio',
      },
      initialValue: 'rounded-md',
    }),
  ],
})