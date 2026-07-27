import { groq } from 'next-sanity'

// Fetch Global Settings
export const globalSettingsQuery = groq`*[_type == "globalSettings"][0]{
  siteTitle,
  logo {
    asset->{
      url
    }
  },
  footerCatchphrase,
  contact {
    address,
    mapCoordinates,
    email,
    phone,
    instagram,
    facebook,
    linkedin
  },
  seo {
    metaTitle,
    metaDescription,
    ogImage {
      asset->{
        url
      }
    }
  }
}`

// Fetch Home Page Data
export const homePageQuery = groq`*[_type == "homePage"][0]{
  hero {
    title,
    subtitle,
    description,
    image {
      asset->{
        url
      }
    },
    video {
      asset->{
        url
      }
    }
  },
  philosophy,
  services[] {
    title,
    description,
    image {
      asset->{
        url
      }
    }
  },
  featuredProjects[]->{
    "id": slug.current,
    title,
    location,
    year,
    "category": category->title,
    "image": coverImage.asset->url,
    "images": gallery[].asset->url
  },
  cinematicProjects[]->{
    "id": slug.current,
    title,
    location,
    year,
    "category": category->title,
    "image": coverImage.asset->url,
    "images": gallery[].asset->url
  },
  cinematicAudio {
    asset->{
      url
    }
  },
  seo {
    metaTitle,
    metaDescription
  }
}`

// Fetch All Projects
export const projectsQuery = groq`*[_type == "project"] | order(year desc) {
  "id": slug.current,
  title,
  "category": category->title,
  location,
  year,
  "image": coverImage.asset->url
}`

// Fetch Single Project
export const singleProjectQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  "id": slug.current,
  title,
  "category": category->title,
  location,
  year,
  "coverImage": coverImage.asset->url,
  "gallery": gallery[].asset->url,
  description,
  seo {
    metaTitle,
    metaDescription
  }
}`

// Fetch Contact Page Data
export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  heading,
  subheading,
  overrideContact,
  contactInfo {
    address,
    mapCoordinates,
    email,
    phone,
    instagram,
    facebook,
    linkedin
  },
  seo {
    metaTitle,
    metaDescription
  }
}`

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  hero,
  philosophy { heading, text, image { asset->{ url } } },
  manifesto { block1, image1 { asset->{ url } }, block2, image2 { asset->{ url } }, block3 },
  teamHeading,
  team[] { name, role, image { asset->{ url } } },
  closingStatement,
  seo { metaTitle, metaDescription }
}`


export const pageQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  content,
  seo { metaTitle, metaDescription }
}`
