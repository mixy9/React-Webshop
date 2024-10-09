import { ProductList } from '../types/General'
import { fetchData } from '../fetchData'

export const getProducts = async (
  page: number,
  limit: number,
  sortBy?: string,
  order?: string,
  minPrice?: number,
  maxPrice?: number,
  categoryType?: string
): Promise<ProductList | undefined> => {
  const skip = (page - 1) * limit
  const categories = categoryType ? `/category/${categoryType}` : ''

  return await fetchData<ProductList>(`/products${categories}`, {
    limit: String(limit),
    skip: String(skip),
    sortBy,
    order,
    minPrice: minPrice !== undefined ? String(minPrice) : undefined,
    maxPrice: maxPrice !== undefined ? String(maxPrice) : undefined,
  })
}

export const searchProducts = async (
  q: string
): Promise<ProductList | undefined> => {
  return await fetchData<ProductList>('/products/search', {
    q,
  })
}
