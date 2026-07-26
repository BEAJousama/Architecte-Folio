import { ProjectsClient } from './projects-client';
import { sanityFetch } from '@/sanity/lib/client';
import { projectsQuery, homePageQuery } from '@/sanity/lib/queries';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function ProjectsPage() {
  const allProjects = await sanityFetch(projectsQuery, {}, []);
  const homeData = await sanityFetch(homePageQuery, {}, {});
  
  const cinematicProjects = homeData?.cinematicProjects || [];

  return <ProjectsClient allProjects={allProjects} cinematicProjects={cinematicProjects} />;
}
