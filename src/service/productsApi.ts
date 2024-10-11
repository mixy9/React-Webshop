import { ProductList } from '../types/General'
import { fetchData } from './fetchData'

export const getProducts = async (
  page: number,
  limit: number,
  sortBy?: string,
  order?: string
): Promise<ProductList | undefined> => {
  const skip = (page - 1) * limit

  return await fetchData<ProductList>(`/products`, {
    limit: String(limit),
    skip: String(skip),
    sortBy,
    order,
  })
}

export const searchProducts = async (
  q: string
): Promise<ProductList | undefined> => {
  return await fetchData<ProductList>('/products/search', {
    q,
  })
}
