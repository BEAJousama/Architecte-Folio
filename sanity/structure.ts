import { StructureBuilder } from 'sanity/desk'
import { Settings, Home, Mail, Building2, FileText } from 'lucide-react'

// Define the singletons to filter them out of the regular document list
const singletons = ['globalSettings', 'homePage', 'contactPage']

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Contenu')
    .items([
      // 1. Global Settings
      S.listItem()
        .title('Paramètres Globaux')
        .id('globalSettings')
        .icon(Settings)
        .child(
          S.document()
            .schemaType('globalSettings')
            .documentId('globalSettings')
            .title('Paramètres Globaux')
        ),
      S.divider(),
      
      // 2. Home Page
      S.listItem()
        .title('Page d\'Accueil')
        .id('homePage')
        .icon(Home)
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Page d\'Accueil')
        ),
        
      // 3. Contact Page
      S.listItem()
        .title('Page Contact')
        .id('contactPage')
        .icon(Mail)
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId('contactPage')
            .title('Page Contact')
        ),
      S.divider(),
      
      // 4. Regular Documents (Projects, Pages)
      S.documentTypeListItem('project')
        .title('Projets')
        .icon(Building2),
        
      S.documentTypeListItem('page')
        .title('Pages (Légales)')
        .icon(FileText),

      // We filter out singletons from the main list
      // ...S.documentTypeListItems().filter(
      //   (listItem) => !singletons.includes(listItem.getId() as string)
      // ),
    ])
