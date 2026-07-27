import { createClient } from 'next-sanity';
import fs from 'fs';
import path from 'path';

// Load env vars
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing Sanity credentials in environment.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

async function uploadImage(filePath: string) {
  const fullPath = path.resolve(process.cwd(), 'public', filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}, skipping image.`);
    return null;
  }
  const stream = fs.createReadStream(fullPath);
  const asset = await client.assets.upload('image', stream, {
    filename: path.basename(fullPath)
  });
  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id
    }
  };
}

async function uploadFile(filePath: string) {
  const fullPath = path.resolve(process.cwd(), 'public', filePath);
  if (!fs.existsSync(fullPath)) {
    console.warn(`File not found: ${fullPath}, skipping upload.`);
    return null;
  }
  const stream = fs.createReadStream(fullPath);
  const asset = await client.assets.upload('file', stream, {
    filename: path.basename(fullPath)
  });
  return {
    _type: 'file',
    asset: {
      _type: 'reference',
      _ref: asset._id
    }
  };
}

async function seed() {
  console.log("Seeding Sanity Data with NEW Real Images and Video...");

  // 1. Upload video
  console.log("Uploading video (this may take a bit)...");
  const heroVideo = await uploadFile('images/video.mp4');

  // Upload NEW real images
  console.log("Uploading images...");
  const heroImage = await uploadImage('images/Architecture Image from Unsplash (3).jpg');
  const philosophyImage = await uploadImage('images/Howard Bouchevereau Architecture.jpg');
  const manifestoImage2 = await uploadImage('images/Architecture Picture by Joakim Nadell.jpg');
  
  // Projects
  const projImg1 = await uploadImage('images/House Image 4K.jpg');
  const projImg2 = await uploadImage('images/Modern House Image from Unsplash.jpg');
  const projImg3 = await uploadImage('images/Modern House Picture (1).jpg');
  const projImg4 = await uploadImage('images/Architecture Building Image.jpg');
  const projImg5 = await uploadImage('images/Building Image from Unsplash.jpg');
  const projImg6 = await uploadImage('images/Architecture Image from Unsplash (1).jpg');
  const projImg7 = await uploadImage('images/Architecture Image from Unsplash (2).jpg');
  const projImg8 = await uploadImage('images/Architecture Building Image (1).jpg');
  
  // Services
  const srvImg1 = await uploadImage('images/Modern House Picture.jpg');
  const srvImg2 = await uploadImage('images/Architecture Building Image (1).jpg');
  const srvImg3 = await uploadImage('images/Architecture Image from Unsplash.jpg');
  const srvImg4 = await uploadImage('images/Architecture Image from Unsplash (4).jpg');

  // Keep old portraits for team
  const portraitLKarim = await uploadImage('images/portrait_3_1781266205065.png');
  const portraitABennani = await uploadImage('images/portrait_2_1781266193925.png');
  const portraitMTazi = await uploadImage('images/portrait_1_1781266185013.png');

  // 2. Global Settings
  console.log("Creating Global Settings...");
  await client.createOrReplace({
    _id: 'globalSettings',
    _type: 'globalSettings',
    siteTitle: 'LK Archi Groupe',
    footerCatchphrase: "L'espace est le souffle de l'architecture.",
    contact: {
      address: "L&K Architecture est une agence d'architecture, d'urbanisme et de design basée à Salé",
      mapCoordinates: "34.075416, -6.7879382",
      email: "lkarchigroupe@gmail.com",
      phone: "+212 636 866 105",
      instagram: "https://instagram.com/lkarchigroupe",
      facebook: "https://www.facebook.com/lkarchigroupe",
      linkedin: "https://linkedin.com/lkarchigroupe"
    },
    seo: {
      metaTitle: "LK Archi Studio | Espace, Lumière, Matière, Précision",
      metaDescription: "Studio d'architecture marocain. Fondé sur une philosophie de simplicité rigoureuse, notre studio crée des lieux où la lumière et la matière s'expriment sans artifice."
    }
  });

  // 3. Categories
  console.log("Creating Categories...");
  const catResidentiel = await client.createOrReplace({ _id: 'cat-residentiel', _type: 'category', title: 'Résidentiel', slug: { _type: 'slug', current: 'residentiel' } });
  const catInterieur = await client.createOrReplace({ _id: 'cat-interieur', _type: 'category', title: 'Intérieur', slug: { _type: 'slug', current: 'interieur' } });
  const catCommercial = await client.createOrReplace({ _id: 'cat-commercial', _type: 'category', title: 'Commercial', slug: { _type: 'slug', current: 'commercial' } });
  const catBureaux = await client.createOrReplace({ _id: 'cat-bureaux', _type: 'category', title: 'Bureaux', slug: { _type: 'slug', current: 'bureaux' } });
  const catHotellerie = await client.createOrReplace({ _id: 'cat-hotellerie', _type: 'category', title: 'Hôtellerie', slug: { _type: 'slug', current: 'hotellerie' } });
  const catCulturel = await client.createOrReplace({ _id: 'cat-culturel', _type: 'category', title: 'Culturel', slug: { _type: 'slug', current: 'culturel' } });

  // 4. Projects
  console.log("Creating Projects...");
  const project1 = await client.createOrReplace({
    _id: 'project-villa-horizon',
    _type: 'project',
    title: 'Villa Horizon',
    slug: { _type: 'slug', current: 'villa-horizon' },
    category: { _type: 'reference', _ref: catResidentiel._id },
    location: 'Casablanca',
    year: '2025',
    coverImage: projImg1 || heroImage,
    gallery: [projImg2, projImg3, projImg4].filter(Boolean),
    description: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Villas d'exception, demeures privées et chalets de luxe. Une conception sur-mesure de l'habitat où le volume dicte la fonction." }]
      }
    ]
  });

  const project2 = await client.createOrReplace({
    _id: 'project-maison-verre',
    _type: 'project',
    title: 'Maison de Verre',
    slug: { _type: 'slug', current: 'maison-de-verre' },
    category: { _type: 'reference', _ref: catInterieur._id },
    location: 'Marrakech',
    year: '2024',
    coverImage: projImg2 || philosophyImage,
    gallery: [projImg5, projImg6, projImg7].filter(Boolean),
    description: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Sublimation des espaces intérieurs par la lumière naturelle, la texture et des finitions d'une rare exigence." }]
      }
    ]
  });

  const project3 = await client.createOrReplace({
    _id: 'project-pavillon-sable',
    _type: 'project',
    title: 'Pavillon Sable',
    slug: { _type: 'slug', current: 'pavillon-sable' },
    category: { _type: 'reference', _ref: catResidentiel._id },
    location: 'Rabat',
    year: '2025',
    coverImage: projImg3 || manifestoImage2,
    gallery: [projImg8, projImg1, projImg2].filter(Boolean),
    description: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Création de mobilier exclusif et aménagement intégré pour une harmonie totale et radicale du projet." }]
      }
    ]
  });

  const project4 = await client.createOrReplace({
    _id: 'project-siege-administratif',
    _type: 'project',
    title: 'Siège Administratif',
    slug: { _type: 'slug', current: 'siege-administratif' },
    category: { _type: 'reference', _ref: catCommercial._id },
    location: 'Tanger',
    year: '2023',
    coverImage: projImg4 || heroImage,
    gallery: [projImg3, projImg5, projImg6].filter(Boolean),
    description: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Sièges sociaux, boutiques de prestige et espaces de restauration. L'identité de marque traduite en architecture spatiale." }]
      }
    ]
  });

  const project5 = await client.createOrReplace({
    _id: 'project-tour-altitude',
    _type: 'project',
    title: 'Tour Altitude',
    slug: { _type: 'slug', current: 'tour-altitude' },
    category: { _type: 'reference', _ref: catBureaux._id },
    location: 'Casablanca Finance City',
    year: '2024',
    coverImage: projImg5 || heroImage,
    gallery: [projImg7, projImg8, projImg1].filter(Boolean),
    description: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Une tour iconique redéfinissant la skyline urbaine." }]
      }
    ]
  });

  const project6 = await client.createOrReplace({
    _id: 'project-maison-brutaliste',
    _type: 'project',
    title: 'Maison Brutaliste',
    slug: { _type: 'slug', current: 'maison-brutaliste' },
    category: { _type: 'reference', _ref: catResidentiel._id },
    location: 'Bouskoura',
    year: '2022',
    coverImage: projImg6 || philosophyImage,
    gallery: [projImg2, projImg4, projImg8].filter(Boolean),
    description: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Le béton brut sublimé par des lignes pures et une végétation abondante." }]
      }
    ]
  });

  const project7 = await client.createOrReplace({
    _id: 'project-hotel-ocean',
    _type: 'project',
    title: 'Hôtel Océan',
    slug: { _type: 'slug', current: 'hotel-ocean' },
    category: { _type: 'reference', _ref: catHotellerie._id },
    location: 'Dakhla',
    year: '2025',
    coverImage: projImg7 || manifestoImage2,
    gallery: [projImg1, projImg3, projImg5].filter(Boolean),
    description: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Resort éco-responsable fusionnant avec les dunes de sable." }]
      }
    ]
  });

  const project8 = await client.createOrReplace({
    _id: 'project-galerie-art',
    _type: 'project',
    title: 'Galerie d\'Art Contemporain',
    slug: { _type: 'slug', current: 'galerie-art' },
    category: { _type: 'reference', _ref: catCulturel._id },
    location: 'Rabat',
    year: '2021',
    coverImage: projImg8 || heroImage,
    gallery: [projImg6, projImg7, projImg2].filter(Boolean),
    description: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Un espace dédié à la lumière et aux œuvres." }]
      }
    ]
  });

  // 4. Home Page
  console.log("Creating Home Page...");
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    hero: {
      title: "Façonner l'espace.",
      subtitle: "Sublimer la matière.",
      description: "Créateurs d'espaces d'exception. Nous concevons des œuvres architecturales intemporelles où le luxe réside dans l'épure, le détail et l'harmonie absolue avec l'environnement.",
      image: heroImage,
      video: heroVideo
    },
    philosophy: "Une approche centrée sur l'harmonie des volumes, la noblesse des matériaux et de la lumière. Nous créons des espaces intemporels, profondément ancrés dans leur contexte.",
    services: [
      {
        _key: 'srv1',
        title: "Architecture Résidentielle",
        description: "Villas d'exception, demeures privées et chalets de luxe. Une conception sur-mesure de l'habitat où le volume dicte la fonction.",
        image: srvImg1 || heroImage
      },
      {
        _key: 'srv2',
        title: "Design Commercial",
        description: "Sièges sociaux, boutiques de prestige et espaces de restauration. L'identité de marque traduite en architecture spatiale.",
        image: srvImg2 || philosophyImage
      },
      {
        _key: 'srv3',
        title: "Architecture d'Intérieur",
        description: "Sublimation des espaces intérieurs par la lumière naturelle, la texture et des finitions d'une rare exigence.",
        image: srvImg3 || manifestoImage2
      },
      {
        _key: 'srv4',
        title: "Design Sur Mesure",
        description: "Création de mobilier exclusif et aménagement intégré pour une harmonie totale et radicale du projet.",
        image: srvImg4 || heroImage
      }
    ],
    featuredProjects: [
      { _type: 'reference', _ref: project1._id, _key: 'fp1' },
      { _type: 'reference', _ref: project2._id, _key: 'fp2' },
      { _type: 'reference', _ref: project3._id, _key: 'fp3' },
      { _type: 'reference', _ref: project4._id, _key: 'fp4' },
      { _type: 'reference', _ref: project5._id, _key: 'fp5' },
      { _type: 'reference', _ref: project6._id, _key: 'fp6' }
    ],
    cinematicProjects: [
      { _type: 'reference', _ref: project2._id, _key: 'cp1' },
      { _type: 'reference', _ref: project5._id, _key: 'cp2' },
      { _type: 'reference', _ref: project8._id, _key: 'cp3' },
      { _type: 'reference', _ref: project1._id, _key: 'cp4' }
    ]
  });

  // 5. About Page
  console.log("Creating About Page...");
  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    hero: {
      title: "LK ARCHI",
      subtitle: "STUDIO"
    },
    philosophy: {
      heading: "Notre Philosophie",
      text: "Fondé sur une philosophie de simplicité rigoureuse, notre studio crée des lieux où la lumière et la matière s'expriment sans artifice. Nous concevons l'architecture comme un espace de silence et de justesse.",
      image: philosophyImage
    },
    manifesto: {
      block1: "Notre architecture n'est pas dictée par la forme, mais par l'expérience du vide.",
      image1: philosophyImage,
      block2: "Nous sculptons la lumière naturelle pour révéler la noblesse des matériaux.",
      image2: manifestoImage2,
      block3: "Chaque projet est ancré dans son contexte. Une réponse silencieuse, mais absolue."
    },
    teamHeading: "Le Studio",
    team: [
      { _key: 't1', name: "L. Karim", role: "Architecte Fondateur", image: portraitLKarim },
      { _key: 't2', name: "A. Bennani", role: "Directrice Artistique", image: portraitABennani },
      { _key: 't3', name: "M. Tazi", role: "Architecte d'Intérieur", image: portraitMTazi },
      { _key: 't4', name: "S. Chraibi", role: "Studio Manager", image: portraitABennani }
    ],
    closingStatement: "L'Éloge de l'Intemporel."
  });

  // 6. Contact Page
  console.log("Creating Contact Page...");
  await client.createOrReplace({
    _id: 'contactPage',
    _type: 'contactPage',
    heading: 'PARLONS',
    subheading: 'PROJET.',
    overrideContact: false
  });

  console.log("✅ Sanity data seeded successfully with NEW images!");
}

seed().catch(err => {
  console.error("Seeding failed:");
  console.error(err);
  process.exit(1);
});
