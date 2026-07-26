import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
});

async function run() {
  console.log("1. Removing references from homePage to avoid deletion conflicts...");
  try {
    await client
      .patch('homePage')
      .set({ featuredProjects: [], cinematicProjects: [] })
      .commit();
    console.log("homePage references cleared.");
  } catch (e: any) {
    console.log("No homePage to update or error:", e.message);
  }

  console.log("2. Fetching and deleting ALL projects...");
  const projects = await client.fetch(`*[_type == "project"]._id`);
  for (const id of projects) {
    try {
      await client.delete(id);
      console.log(`Deleted project ${id}`);
    } catch (e: any) {
      console.error(`Failed to delete project ${id}:`, e.message);
    }
  }

  console.log("3. Fetching and deleting ALL categories...");
  const categories = await client.fetch(`*[_type == "category"]._id`);
  for (const id of categories) {
    try {
      await client.delete(id);
      console.log(`Deleted category ${id}`);
    } catch (e: any) {
      console.error(`Failed to delete category ${id}:`, e.message);
    }
  }

  console.log("Cleanup completely done. Database is ready for a fresh seed!");
}

run();
