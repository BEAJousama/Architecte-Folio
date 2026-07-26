import { AboutClient } from './about-client';
import { sanityFetch } from '@/sanity/lib/client';
import { aboutPageQuery } from '@/sanity/lib/queries';

export const revalidate = 60;

export default async function AboutPage() {
  const data = await sanityFetch(aboutPageQuery, {}, {});
  return <AboutClient data={data} />;
}
