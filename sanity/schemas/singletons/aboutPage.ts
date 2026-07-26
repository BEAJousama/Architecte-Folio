import { defineField, defineType } from 'sanity'
import { Info } from 'lucide-react'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Page À Propos',
  type: 'document',
  icon: Info,
  fields: [
    defineField({
      name: 'hero',
      title: 'Section Héro',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Titre Principal', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Sous-titre', type: 'string' }),
      ],
    }),
    defineField({
      name: 'philosophy',
      title: 'Philosophie',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'En-tête', type: 'string' }),
        defineField({ name: 'text', title: 'Texte de Philosophie', type: 'text', rows: 4 }),
        defineField({ name: 'image', title: 'Image de Philosophie', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'manifesto',
      title: 'Manifeste',
      type: 'object',
      fields: [
        defineField({ name: 'block1', title: 'Bloc de Texte 1', type: 'text', rows: 2 }),
        defineField({ name: 'image1', title: 'Image Interlude 1', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'block2', title: 'Bloc de Texte 2', type: 'text', rows: 2 }),
        defineField({ name: 'image2', title: 'Image Interlude 2', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'block3', title: 'Bloc de Texte 3', type: 'text', rows: 2 }),
      ],
    }),
    defineField({
      name: 'teamHeading',
      title: 'Titre Section Équipe',
      type: 'string',
    }),
    defineField({
      name: 'team',
      title: 'Notre Équipe',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Nom', type: 'string' }),
            defineField({ name: 'role', title: 'Rôle', type: 'string' }),
            defineField({ name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } }),
          ],
        },
      ],
    }),
    defineField({
      name: 'closingStatement',
      title: 'Phrase de Clôture',
      type: 'string',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Page À Propos',
      }
    },
  },
})
