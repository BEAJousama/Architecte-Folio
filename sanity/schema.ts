import { type SchemaTypeDefinition } from 'sanity'

import { seo } from './schemas/objects/seo'
import { contactInfo } from './schemas/objects/contactInfo'

import { globalSettings } from './schemas/singletons/globalSettings'
import { homePage } from './schemas/singletons/homePage'
import { contactPage } from './schemas/singletons/contactPage'
import { aboutPage } from './schemas/singletons/aboutPage'

import { project } from './schemas/documents/project'
import { page } from './schemas/documents/page'
import { category } from './schemas/documents/category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    seo,
    contactInfo,
    // Singletons
    globalSettings,
    homePage,
    contactPage,
    aboutPage,
    // Documents
    project,
    category,
    page,
  ],
}
