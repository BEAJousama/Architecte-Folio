import { defineField, defineType } from 'sanity'
import { FileText } from 'lucide-react'

export const page = defineType({
  name: 'page',
  title: 'Pages (Légales, etc.)',
  type: 'document',
  icon: FileText,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la page',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Identifiant URL (Slug)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Spécifique à la Page',
      type: 'seo',
    }),
  ],
})
