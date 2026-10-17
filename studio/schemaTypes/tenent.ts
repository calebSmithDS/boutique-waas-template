// schemaTypes/tenant.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'tenant',
  title: 'Tenant Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'tenantId',
      title: 'Tenant ID',
      type: 'string',
      description: 'The unique ID used for routing (e.g., tenant_production)',
    }),
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Lead Email Address',
      type: 'string',
    })
  ]
})