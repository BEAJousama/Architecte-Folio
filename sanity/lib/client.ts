import { createClient, type QueryParams } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
  retries = 3
): Promise<Response> {
  let lastError: unknown

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fetch(input, init)
    } catch (error) {
      lastError = error
      if (attempt < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, 400 * 2 ** attempt))
      }
    }
  }

  throw lastError
}

/** Retry, then flip between api / apicdn hosts if the network path is flaky. */
async function fetchWithHostFailover(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  try {
    return await fetchWithRetry(input, init)
  } catch (primaryError) {
    const url = String(input)
    const alternate = url.includes('.apicdn.')
      ? url.replace('.apicdn.', '.api.')
      : url.includes('.api.')
        ? url.replace('.api.', '.apicdn.')
        : null

    if (!alternate) throw primaryError

    console.warn('Sanity primary host failed, trying alternate:', alternate)
    return await fetchWithRetry(alternate, init)
  }
}

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  fetch: fetchWithHostFailover,
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
