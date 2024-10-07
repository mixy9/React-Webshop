import React, { useEffect, useState } from 'react'
import ProductItem from '../components/ProductItem'
import { Product } from '../types/General'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid'
import InfiniteScrollObserver from '../components/InfiniteScrollObserver'
import { getProducts } from '../service/productsApi'

const ITEMS_PER_PAGE = 20

const sortOptions = [
  { name: 'Product A - Z', value: 'title', order: 'asc', current: true },
  { name: 'Price Low to High', value: 'price', order: 'asc', current: false },
  { name: 'Price High to Low', value: 'price', order: 'desc', current: false },
]

export default function ProductsPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sortBy, setSortBy] = useState<string>('title') // Default sort by title
  const [order, setOrder] = useState<string>('asc') // Default order
  const [page, setPage] = useState<number>(1)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const fetchProducts = async () => {
    setIsLoading(true)

    try {
      const data = await getProducts(
        sortBy,
        order,
        page,
        ITEMS_PER_PAGE,
        (page - 1) * ITEMS_PER_PAGE
      )

      if (data?.products) {
        setProducts((prevProducts) => [...prevProducts, ...data.products])
        setHasMore(data.products.length === ITEMS_PER_PAGE)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      console.log('Failed to load products')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [page, sortBy, order])

  const handleSortChange = (value: string, order: string) => {
    setSortBy(value)
    setOrder(order)
    setPage(1)
    setProducts([])
  }

  const loadMoreProducts = () => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative z-20 ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              {/* Filters */}
            </DialogPanel>
          </div>
        </Dialog>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-6">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          onClick={() =>
                            handleSortChange(option.value, option.order)
                          }
                          className={`hover:font-medium cursor-pointer text-gray-900 text-gray-500 block px-4 py-2 text-sm data-[focus]
                            :bg-gray-100 hover:bg-gray-100 ${sortBy === option.value && order === option.order ? 'font-medium bg-gray-100' : 'bg-white'}`}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}

              {/* ProductItem grid */}
              <div className="lg:col-span-3">
                {isLoading && page === 1 && <div> Loading...</div>}
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))}
                </div>

                {/* Infinite Scroll Observer */}
                {hasMore && (
                  <InfiniteScrollObserver onIntersect={loadMoreProducts} />
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
