import { defineField, defineType } from 'sanity'
import { Home } from 'lucide-react'

export const homePage = defineType({
  name: 'homePage',
  title: 'Page d\'Accueil',
  type: 'document',
  icon: Home,
  fields: [
    defineField({
      name: 'hero',
      title: 'Section Héro',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'title',
          title: 'Grand Titre',
          type: 'string',
          description: 'Ex: Façonner l\'espace.',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Sous-titre (Italique)',
          type: 'string',
          description: 'Ex: Sublimer la matière.',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'image',
          title: 'Image de fond',
          type: 'image',
          options: { hotspot: true },
          description: 'Sera ignorée si une vidéo est uploadée ci-dessous.',
        }),
        defineField({
          name: 'video',
          title: 'Vidéo de fond (MP4)',
          type: 'file',
          options: { accept: 'video/mp4' },
          description: 'Si renseignée, remplace l\'image de fond.',
        }),
      ],
    }),
    defineField({
      name: 'philosophy',
      title: 'Texte Philosophie',
      type: 'text',
      rows: 4,
      description: 'Le texte court affiché sous la section héros.',
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Projets Sélectifs',
      type: 'array',
      description: 'Sélectionnez les projets à afficher sur la page d\'accueil.',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'cinematicProjects',
      title: 'Expérience Cinématique',
      type: 'array',
      description: 'Projets affichés dans le slider plein écran.',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    }),
    defineField({
      name: 'cinematicAudio',
      title: 'Audio Cinématique',
      type: 'file',
      description: 'Musique de fond pour l\'expérience cinématique (mp3 recommandé).',
      options: { accept: 'audio/*' }
    }),
    defineField({
      name: 'services',
      title: 'Nos Services',
      type: 'array',
      description: 'Liste des services affichés sur la page d\'accueil.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Titre', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO de la page d\'accueil',
      type: 'seo',
      description: 'Remplace le SEO par défaut pour cette page.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Page d\'Accueil',
      }
    },
  },
})
