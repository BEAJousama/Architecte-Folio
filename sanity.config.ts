import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import { schema } from './sanity/schema'
import { structure } from './sanity/structure'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'LK Archi Studio',
  schema,
  plugins: [
    deskTool({
      structure,
    }),
    visionTool({ defaultApiVersion: '2024-06-12' }),
    vercelDeployTool(),
  ],
})
