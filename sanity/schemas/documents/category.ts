import { defineField, defineType } from 'sanity'
import { Tags } from 'lucide-react'

export const category = defineType({
  name: 'category',
  title: 'Catégories',
  type: 'document',
  icon: Tags,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la Catégorie',
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
      name: 'description',
      title: 'Description (Optionnelle)',
      type: 'text',
    }),
  ],
})
