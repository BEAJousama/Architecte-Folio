import { defineField, defineType } from 'sanity'
import { Mail } from 'lucide-react'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Page Contact',
  type: 'document',
  icon: Mail,
  fields: [
    defineField({
      name: 'heading',
      title: 'Gros Titre',
      type: 'string',
      description: 'Ex: LET\'S',
    }),
    defineField({
      name: 'subheading',
      title: 'Sous-titre (Italique)',
      type: 'string',
      description: 'Ex: TALK.',
    }),
    defineField({
      name: 'overrideContact',
      title: 'Remplacer les infos de contact ?',
      type: 'boolean',
      description: 'Activer pour définir des informations spécifiques à cette page, sinon les paramètres globaux seront utilisés.',
      initialValue: false,
    }),
    defineField({
      name: 'contactInfo',
      title: 'Informations spécifiques',
      type: 'contactInfo',
      hidden: ({ document }) => !document?.overrideContact,
    }),
    defineField({
      name: 'seo',
      title: 'SEO de la page Contact',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Page Contact',
      }
    },
  },
})
