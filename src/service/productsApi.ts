import { ProductList } from '../types/General'
import { fetchData } from '../fetchData'

export const getProducts = async (
  sortBy: string,
  order: string,
  page: number,
  limit: number,
  skip: number
): Promise<ProductList | undefined> => {
  return await fetchData<ProductList>('/products', {
    sortBy,
    order,
    page,
    limit,
    skip,
  })
}
