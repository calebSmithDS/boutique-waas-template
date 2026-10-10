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
    structureTool(), 
    // visionTool(), 
    colorInput()],

  schema: {
    types: schemaTypes,
  },
})
