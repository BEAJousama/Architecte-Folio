import { defineField, defineType } from 'sanity'

export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Informations de Contact',
  type: 'object',
  fields: [
    defineField({
      name: 'address',
      title: 'Adresse physique',
      type: 'string',
      description: "Ex: 24 Blvd d'Anfa, Quartier Racine, Casablanca, Maroc",
    }),
    defineField({
      name: 'mapCoordinates',
      title: 'Coordonnées GPS',
      type: 'string',
      description: 'Pour afficher sur la carte (Ex: 33.572404, -7.6601446 ou "33°35\'36\\"N 7°39\'38\\"W")',
    }),
    defineField({
      name: 'email',
      title: 'Adresse Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Numéro de téléphone / WhatsApp',
      type: 'string',
      description: 'Ex: +212 600 000 000',
    }),
    defineField({
      name: 'instagram',
      title: 'Lien Instagram',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      title: 'Lien LinkedIn',
      type: 'url',
    }),
  ],
})
