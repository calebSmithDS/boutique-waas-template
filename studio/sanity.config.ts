import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
// import {visionTool} from '@sanity/vision'
import { colorInput } from '@sanity/color-input'
import {schemaTypes} from './schemaTypes'
import { CustomLogo } from './logo'

export default defineConfig({
  name: 'default',
  title: 'WaaS Content Portal',

  projectId: 'mc1571jp',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Agency Dashboard')
          .items([
            S.listItem()
              .title('Clients')
              .child(
                S.documentTypeList('tenant')
                  .title('All Clients')
                  .child((documentId) =>
                    S.list()
                      .title('Client Content')
                      .items([
                        // 1. Main Tenant Profile
                        S.listItem()
                          .title('Tenant Settings')
                          .child(
                            S.document()
                              .documentId(documentId)
                              .schemaType('tenant')
                          ),
                        
                        // 2. Filtered Services List
                        S.listItem()
                          .title('Services')
                          .child(
                            S.documentList()
                              .title('Services')
                              .filter('_type == "service" && tenantId == *[_type == "tenant" && _id == $parentId][0].tenantId')
                              .params({ parentId: documentId.replace('drafts.', '') })
                              .initialValueTemplates([
                                S.initialValueTemplateItem('service-by-tenant', { parentId: documentId })
                              ])
                          ),

                        // 3. Filtered Testimonials List
                        S.listItem()
                          .title('Testimonials')
                          .child(
                            S.documentList()
                              .title('Testimonials')
                              .filter('_type == "testimonial" && tenantId == *[_type == "tenant" && _id == $parentId][0].tenantId')
                              .params({ parentId: documentId.replace('drafts.', '') })
                              .initialValueTemplates([
                                S.initialValueTemplateItem('testimonial-by-tenant', { parentId: documentId })
                              ])
                          ),

                        // 4. Filtered Site Settings List
                        S.listItem()
                          .title('Site Settings')
                          .child(
                            S.documentList()
                              .title('Site Settings')
                              .filter('_type == "siteSettings" && tenantId == *[_type == "tenant" && _id == $parentId][0].tenantId')
                              .params({ parentId: documentId.replace('drafts.', '') })
                              .initialValueTemplates([
                                S.initialValueTemplateItem('siteSettings-by-tenant', { parentId: documentId })
                              ])
                          ),

                        // 5. Filtered Theme Settings List
                        S.listItem()
                          .title('Theme Settings')
                          .child(
                            S.documentList()
                              .title('Theme Settings')
                              .filter('_type == "themeSettings" && tenantId == *[_type == "tenant" && _id == $parentId][0].tenantId')
                              .params({ parentId: documentId.replace('drafts.', '') })
                              .initialValueTemplates([
                                S.initialValueTemplateItem('themeSettings-by-tenant', { parentId: documentId })
                              ])
                          )
                      ])
                  )
              )
          ])
    }),
    // visionTool(), 
    colorInput()],

  schema: {
    types: schemaTypes,
    // 1. Define the custom templates
   templates: (prev) => [
      ...prev,
      
      // Template for Services
      {
        id: 'service-by-tenant',
        title: 'Service',
        schemaType: 'service',
        parameters: [{ name: 'parentId', type: 'string' }],
        value: async (params: { parentId: string }, context: any) => {
          const client = context.getClient({ apiVersion: '2023-10-01' });
          const parentDoc = await client.fetch(`*[_id == $id][0]`, { id: params.parentId.replace('drafts.', '') });
          return { tenantId: parentDoc.tenantId };
        }
      },
      
      // Template for Testimonials
      {
        id: 'testimonial-by-tenant',
        title: 'Testimonial',
        schemaType: 'testimonial',
        parameters: [{ name: 'parentId', type: 'string' }],
        value: async (params: { parentId: string }, context: any) => {
          const client = context.getClient({ apiVersion: '2023-10-01' });
          const parentDoc = await client.fetch(`*[_id == $id][0]`, { id: params.parentId.replace('drafts.', '') });
          return { tenantId: parentDoc.tenantId };
        }
      },

      // Template for Site Settings
      {
        id: 'siteSettings-by-tenant',
        title: 'Site Settings',
        schemaType: 'siteSettings',
        parameters: [{ name: 'parentId', type: 'string' }],
        value: async (params: { parentId: string }, context: any) => {
          const client = context.getClient({ apiVersion: '2023-10-01' });
          const parentDoc = await client.fetch(`*[_id == $id][0]`, { id: params.parentId.replace('drafts.', '') });
          return { tenantId: parentDoc.tenantId };
        }
      },

      // Template for Theme Settings
      {
        id: 'themeSettings-by-tenant',
        title: 'Theme Settings',
        schemaType: 'themeSettings',
        parameters: [{ name: 'parentId', type: 'string' }],
        value: async (params: { parentId: string }, context: any) => {
          const client = context.getClient({ apiVersion: '2023-10-01' });
          const parentDoc = await client.fetch(`*[_id == $id][0]`, { id: params.parentId.replace('drafts.', '') });
          return { tenantId: parentDoc.tenantId };
        }
      }
      
    ]
  },
})
