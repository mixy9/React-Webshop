import React, { FC, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const sortOptions = [
  { name: 'Product A - Z', value: 'title', order: 'asc', current: true },
  { name: 'Product Z - A', value: 'title', order: 'desc', current: false },
  { name: 'Price Low to High', value: 'price', order: 'asc', current: false },
  { name: 'Price High to Low', value: 'price', order: 'desc', current: false },
] as const

type SortOption = {
  name: string
  value: string
  order: string
  current: boolean
}

type ProductSortingProps = {
  handleSortChange: (sort: string, order: string) => void
}

const ProductSorting: FC<ProductSortingProps> = ({
  handleSortChange,
}: ProductSortingProps) => {
  const [sortBy, setSortBy] = useState<SortOption | null>(null)

  const handleChange = (option: SortOption) => {
    setSortBy(option)

    handleSortChange(option.value, option.order)
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="group w-max inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          {sortBy?.name || 'Sort by'}
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
                onClick={() => handleChange(option)}
                className={`hover:font-medium cursor-pointer text-gray-900 text-gray-500 block px-4 py-2 text-sm data-[focus]
                            :bg-gray-100 hover:bg-gray-100 ${sortBy?.name === option.name ? 'font-medium bg-gray-100 pointer-events-none' : 'bg-white'}`}
              >
                {option.name}
              </a>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}

export default ProductSorting
