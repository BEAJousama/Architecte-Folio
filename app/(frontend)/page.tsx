import { HomeClient } from './home-client';
import { sanityFetch } from '@/sanity/lib/client';
import { homePageQuery } from '@/sanity/lib/queries';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const data = await sanityFetch<any>(homePageQuery, {}, {});
  
  return <HomeClient data={data} />;
}
