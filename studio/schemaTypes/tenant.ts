import { defineType, defineField } from 'sanity';

export const tenant = defineType({
  name: 'tenant',
  title: 'Tenant Configuration',
  type: 'document',
  groups: [
    { name: 'admin', title: 'Admin & Status' },
    { name: 'branding', title: 'Branding & Content' },
    { name: 'contact', title: 'Contact & Leads' },
    { name: 'integrations', title: 'Integrations' },
    { name: 'ai', title: 'AI Receptionist' },
  ],
  fields: [
    // --- ADMIN ---
    defineField({
      name: 'tenantId',
      title: 'Tenant ID',
      type: 'string',
      group: 'admin',
      validation: (Rule) => Rule.required(),
      // readOnly: true, // Uncomment this once you automate client creation
    }),
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      group: 'admin',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Account Active',
      description: 'Toggle off to instantly disable the website and AI receptionist.',
      type: 'boolean',
      group: 'admin',
      initialValue: true,
    }),

    // --- BRANDING ---
    defineField({
      name: 'primaryColor',
      title: 'Primary Brand Color',
      type: 'color', // Requires @sanity/color-input plugin
      group: 'branding',
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      group: 'branding',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      group: 'branding',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      group: 'branding',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      group: 'branding',
      options: { hotspot: true },
    }),

    // --- CONTACT & LEADS ---
    defineField({
      name: 'contactEmail',
      title: 'Lead Routing Email',
      description: 'Where website form submissions will be sent.',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'publicPhone',
      title: 'Public Phone Number',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'serviceArea',
      title: 'Service Area',
      description: 'e.g., "Adelaide Hills". Used by the AI to reject out-of-bounds leads.',
      type: 'string',
      group: 'contact',
    }),

    // --- INTEGRATIONS ---
    defineField({
      name: 'googlePlaceId',
      title: 'Google Place ID',
      description: 'Required to auto-fetch Google Reviews.',
      type: 'string',
      group: 'integrations',
    }),
    defineField({
      name: 'twilioForwardingNumber',
      title: 'Twilio Forwarding Number',
      description: 'The internal Twilio number assigned to this client.',
      type: 'string',
      group: 'integrations',
    }),

    // --- AI RECEPTIONIST ---
    defineField({
      name: 'businessHours',
      title: 'Business Hours Logic',
      description: 'Tell the AI when the business is open vs on emergency after-hours rates.',
      type: 'text',
      group: 'ai',
    }),
    defineField({
      name: 'aiCustomInstructions',
      title: 'Custom AI Instructions',
      description: 'Specific rules for this client. e.g., "Never quote exact prices over the phone."',
      type: 'text',
      group: 'ai',
    }),
  ],
  preview: {
    select: {
      title: 'businessName',
      subtitle: 'tenantId',
      media: 'logo',
    },
  },
});