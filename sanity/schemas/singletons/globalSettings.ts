import { defineField, defineType } from 'sanity'
import { Settings } from 'lucide-react'

export const globalSettings = defineType({
  name: 'globalSettings',
  title: 'Paramètres Globaux',
  type: 'document',
  icon: Settings,
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Titre du Site',
      type: 'string',
      description: 'Le nom de la marque (ex: LK Archi Groupe)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo du Site',
      type: 'image',
      description: 'Le logo principal du site.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'footerCatchphrase',
      title: 'Phrase d\'accroche (Footer)',
      type: 'string',
      description: 'Texte affiché en bas de page. Ex: "L\'espace est le souffle de l\'architecture."',
    }),
    defineField({
      name: 'contact',
      title: 'Informations de Contact Globales',
      type: 'contactInfo',
      description: 'Ces informations seront utilisées dans le footer et sur la page de contact par défaut.',
    }),
    defineField({
      name: 'seo',
      title: 'SEO par défaut',
      type: 'seo',
      description: 'Paramètres SEO appliqués si une page n\'a pas ses propres paramètres.',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Paramètres Globaux',
      }
    },
  },
})
