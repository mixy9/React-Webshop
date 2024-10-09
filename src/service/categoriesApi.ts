import { Category } from '../types/General'
import { fetchData } from '../fetchData'

export const getCategories = async (): Promise<Category[] | undefined> => {
  return await fetchData<Category[]>('/products/categories')
}
