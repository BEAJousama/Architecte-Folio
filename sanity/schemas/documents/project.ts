import { defineField, defineType } from 'sanity'
import { Building2 } from 'lucide-react'

export const project = defineType({
  name: 'project',
  title: 'Projets',
  type: 'document',
  icon: Building2,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre du Projet',
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
      name: 'category',
      title: 'Catégorie',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Sélectionnez la catégorie du projet',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Localisation',
      type: 'string',
      description: 'Ex: Casablanca, Maroc',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Année',
      type: 'string',
      description: 'Ex: 2025',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Image de couverture',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie d\'images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Les images additionnelles pour la page de détail du projet.',
    }),
    defineField({
      name: 'description',
      title: 'Description détaillée',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Spécifique au Projet',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'coverImage',
    },
  },
})
