import React, { useEffect, useState, useCallback, ChangeEvent } from 'react'
import ProductItem from '../components/products/ProductItem'
import { PriceRange, Product, ProductList } from '../types/General'
import { Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductFilters from '../components/products/ProductFilters'
import InfiniteScrollObserver from '../components/InfiniteScrollObserver'
import { getProducts, searchProducts } from '../service/productsApi'
import ProductSorting from '../components/products/ProductSorting'
import useDebounce from '../hooks/useDebounce'
import ProductItemSkeleton from '../components/products/ProductItemSkeleton'
import { getProductsByCategory } from '../service/categoriesApi'

const ITEMS_PER_PAGE = 17

const ProductsPage = () => {
  const [page, setPage] = useState<number>(1)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const [category, setCategory] = useState<string | undefined>(undefined)
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null)

  const [sorting, setSorting] = useState<{ sortBy?: string; order?: string }>(
    {}
  )

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)

    try {
      let data: ProductList | undefined

      if (debouncedSearchQuery) {
        data = await searchProducts(debouncedSearchQuery as string)
      } else if (category) {
        data = await getProductsByCategory(
          page,
          ITEMS_PER_PAGE,
          sorting.sortBy,
          sorting.order,
          category
        )
      } else {
        setSearchQuery('')
        data = await getProducts(
          page,
          ITEMS_PER_PAGE,
          sorting.sortBy,
          sorting.order
        )
      }

      if (data?.products) {
        setProducts((prevProducts) =>
          page === 1 ? data!.products : [...prevProducts, ...data!.products]
        )
        setHasMore(
          data.products.length === ITEMS_PER_PAGE &&
            data.total > data.products.length
        )
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
  }, [debouncedSearchQuery, category, sorting, page])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const loadMoreProducts = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1)
    }
  }, [isLoading, hasMore])

  const handleSortChange = (sortBy: string, order: string) => {
    setSearchQuery('')
    setSorting({ sortBy, order })
    setPage(1)
  }

  const handleCategoryChange = (value: string) => {
    setCategory(value)
    setPage(1)
    setSearchQuery('')
  }

  const handlePriceChange = (value: PriceRange) => {
    setPriceRange(value)
  }

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setPage(1)
  }

  const filteredProducts = products.filter((product) => {
    if (!priceRange?.min || !priceRange?.max) return true
    return product.price >= priceRange.min && product.price <= priceRange.max
  })

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-14 flex-wrap gap-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Products
          </h1>

          <div className="flex items-center gap-8 flex-wrap md:flex-nowrap">
            <input
              type="text"
              onChange={handleSearchQueryChange}
              value={searchQuery}
              placeholder="Search products..."
              className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900
                ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
                focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-auto"
            />
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
            <ProductFilters
              onCategoryChange={handleCategoryChange}
              onPriceChange={handlePriceChange}
            />

            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                {filteredProducts.map((product) => (
                  <ProductItem key={product.id} product={product} />
                ))}
                {isLoading &&
                  [1, 2, 3, 4].map((key) => <ProductItemSkeleton key={key} />)}
              </div>
              {filteredProducts.length === 0 && !isLoading && (
                <div className="text-center">No data</div>
              )}

              {hasMore && !isLoading && !priceRange?.max && (
                <InfiniteScrollObserver onIntersect={loadMoreProducts} />
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ProductsPage
