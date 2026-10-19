import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { colorInput } from '@sanity/color-input'
import { schemaTypes } from './schemaTypes'

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
                        
                        // 1. Edit the Core Tenant Configuration (replaces site & theme settings)
                        S.listItem()
                          .title('Tenant Configuration')
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

                        // 3. Filtered Reviews List (replaces testimonials)
                        S.listItem()
                          .title('Reviews')
                          .child(
                            S.documentList()
                              .title('Reviews')
                              .filter('_type == "review" && tenantId == *[_type == "tenant" && _id == $parentId][0].tenantId')
                              .params({ parentId: documentId.replace('drafts.', '') })
                              .initialValueTemplates([
                                S.initialValueTemplateItem('review-by-tenant', { parentId: documentId })
                              ])
                          )
                          
                      ])
                  )
              )
          ])
    }),
    colorInput()
  ],

  schema: {
    types: schemaTypes,
    
    // Auto-tagging templates for the new schemas
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
      
      // Template for Reviews
      {
        id: 'review-by-tenant',
        title: 'Review',
        schemaType: 'review',
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