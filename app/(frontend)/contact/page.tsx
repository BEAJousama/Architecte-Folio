import { ContactClient } from './contact-client';
import { sanityFetch } from '@/sanity/lib/client';
import { contactPageQuery, globalSettingsQuery } from '@/sanity/lib/queries';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ContactPage() {
  const data = await sanityFetch<any>(contactPageQuery, {}, {});
  const globalSettings = await sanityFetch<any>(globalSettingsQuery, {}, {});
  
  return <ContactClient data={data} globalSettings={globalSettings} />;
}
