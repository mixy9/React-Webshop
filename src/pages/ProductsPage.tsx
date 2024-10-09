import React, { useEffect, useState, useCallback } from 'react'
import ProductItem from '../components/products/ProductItem'
import { PriceRange, Product } from '../types/General'
import { Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductFilters from '../components/products/ProductFilters'
import InfiniteScrollObserver from '../components/InfiniteScrollObserver'
import { getProducts } from '../service/productsApi'
import ProductSorting from '../components/products/ProductSorting'
import ProductItemSkeleton from '../components/products/ProductItemSkeleton'

const ITEMS_PER_PAGE = 20

export default function ProductsPage() {
  const [page, setPage] = useState<number>(1)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const [filters, setFilters] = useState<{
    category?: string
    priceRange?: PriceRange
  }>({})

  const [sorting, setSorting] = useState<{ sortBy?: string; order?: string }>(
    {}
  )

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)

    try {
      const data = await getProducts(
        page,
        ITEMS_PER_PAGE,
        sorting.sortBy,
        sorting.order,
        filters.priceRange?.min,
        filters.priceRange?.max,
        filters.category
      )

      if (data?.products) {
        setProducts((prevProducts) =>
          page === 1 ? data!.products : [...prevProducts, ...data!.products]
        )
        setHasMore(data.products.length === ITEMS_PER_PAGE)
      } else {
        if (page === 1) {
          setProducts([])
        }
        setHasMore(false)
      }
    } catch (error) {
      console.log('Failed to load products', error)
    } finally {
      setIsLoading(false)
    }
  }, [filters, sorting, page])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const loadMoreProducts = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1)
    }
  }, [isLoading, hasMore])

  const handleSortChange = (sortBy: string, order: string) => {
    setSorting({ sortBy, order })
    setPage(1)
  }

  const handleFiltersChange = (category?: string, priceRange?: PriceRange) => {
    setFilters({ category, priceRange })
    setPage(1)
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Products
          </h1>

          <div className="flex items-center gap-8">
            <ProductSorting handleSortChange={handleSortChange} />
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">View grid</span>
              <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <ProductFilters onFilterChange={handleFiltersChange} />

            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {products &&
                  products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))}
                {isLoading &&
                  [1, 2, 3, 4].map((key) => <ProductItemSkeleton key={key} />)}
              </div>

              {hasMore && !isLoading && (
                <InfiniteScrollObserver onIntersect={loadMoreProducts} />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
