import { createClient, type QueryParams } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'



export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})

/** Fetch from Sanity with retries; returns fallback instead of crashing on network errors. */
export async function sanityFetch<T>(
  query: string,
  params: QueryParams = {},
  fallback: T
): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params)
    return result ?? fallback
  } catch (error) {
    console.error('Sanity fetch failed:', error)
    return fallback
  }
}
