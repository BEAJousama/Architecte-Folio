import { defineField, defineType } from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'Paramètres SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Titre',
      type: 'string',
      description: 'Titre de la page pour les moteurs de recherche (idéalement entre 50 et 60 caractères).',
      validation: (Rule) => Rule.max(60).warning('Le titre est un peu long pour le SEO.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description de la page pour les moteurs de recherche (idéalement entre 150 et 160 caractères).',
      validation: (Rule) => Rule.max(160).warning('La description est un peu longue pour le SEO.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Image de partage (Réseaux Sociaux)',
      type: 'image',
      description: 'Image affichée lors du partage du lien sur les réseaux sociaux.',
      options: {
        hotspot: true,
      },
    }),
  ],
})
