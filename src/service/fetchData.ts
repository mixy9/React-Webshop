import api from './api'

export async function fetchData<T>(
  url: string,
  params?: Record<string, unknown>
): Promise<T | undefined> {
  try {
    const response = await api.get<T>(url, { params })
    return response.data
  } catch (error) {
    console.error(`Error fetching data from ${url}`, error)
    throw error // Optional: Re-throw to allow higher-level handling
  }
}
