import { Category, ProductList } from '../types/General'
import { fetchData } from './fetchData'

export const getCategories = async (): Promise<Category[] | undefined> => {
  return await fetchData<Category[]>('/products/categories')
}

export const getProductsByCategory = async (
  page: number,
  limit: number,
  sortBy?: string,
  order?: string,
  categoryType?: string
): Promise<ProductList | undefined> => {
  const skip = (page - 1) * limit

  return await fetchData<ProductList>(`/products/category/${categoryType}`, {
    limit: String(limit),
    skip: String(skip),
    sortBy,
    order,
  })
}
