import React, { useState, useEffect, ChangeEvent, FC } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Category, PriceRange } from '../../types/General'
import { getCategories } from '../../service/categoriesApi'
import UiButton from '../ui/UiButton'

type ProductFiltersProps = {
  onCategoryChange: (value: string) => void
  onPriceChange: (value: PriceRange) => void
}

const ProductFilters: FC<ProductFiltersProps> = ({
  onCategoryChange,
  onPriceChange,
}: ProductFiltersProps) => {
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [priceRange, setPriceRange] = useState<PriceRange | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const defaultCategoryAll = {
    slug: '',
    name: 'All',
    url: '',
  } as const

  const fetchCategories = async () => {
    try {
      const data = await getCategories()
      if (data) setCategories([defaultCategoryAll, ...data])
    } catch (error) {
      console.log('Failed to load categories')
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handlePriceChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: 'min' | 'max'
  ) => {
    const value = parseInt(e.target.value, 10)

    // Ensure the value is a positive whole number
    if (!isNaN(value) && value > 0) {
      setPriceRange((prev: PriceRange | null) => {
        // Ensure that min and max are always numbers, defaulting to 0 if undefined
        const min = type === 'min' ? value : (prev?.min ?? 0)
        const max = type === 'max' ? value : (prev?.max ?? 0)

        const updatedPriceRange: PriceRange = {
          min,
          max,
        }

        // Ensure that min and max make sense before calling onPriceChange
        if (updatedPriceRange.min <= updatedPriceRange.max) {
          onPriceChange(updatedPriceRange)
        }

        return updatedPriceRange
      })
    }
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value)
    onCategoryChange(e.target.value)
  }

  const resetPriceRange = () => {
    setPriceRange(null)
    onPriceChange({ min: 0, max: 0 }) // Reset the price range to initial state
  }

  return (
    <form className="lg:block">
      <Disclosure as="div" className="border-b border-gray-200 py-6">
        <h3 className="-my-3 flow-root">
          <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">Category</span>
            <span className="ml-6 flex items-center">
              <PlusIcon
                aria-hidden="true"
                className="h-5 w-5 group-data-[open]:hidden"
              />
              <MinusIcon
                aria-hidden="true"
                className="h-5 w-5 [.group:not([data-open])_&]:hidden"
              />
            </span>
          </DisclosureButton>
        </h3>

        <DisclosurePanel className="pt-6">
          <div className="space-y-4">
            {categories &&
              categories.map((category: Category, index: number) => (
                <div key={category.slug} className="flex items-center">
                  <input
                    defaultValue={category.slug}
                    defaultChecked={
                      category.slug === selectedCategory || category.slug === ''
                    }
                    id={`filter-category-${index}`}
                    name={`category[]`}
                    type="radio"
                    onChange={handleCategoryChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`filter-category-${index}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {category.name}
                  </label>
                </div>
              ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      <Disclosure as="div" className="border-b border-gray-200 py-6">
        <h3 className="-my-3 flow-root">
          <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">Price</span>
            <span className="ml-6 flex items-center">
              <PlusIcon
                aria-hidden="true"
                className="h-5 w-5 group-data-[open]:hidden"
              />
              <MinusIcon
                aria-hidden="true"
                className="h-5 w-5 [.group:not([data-open])_&]:hidden"
              />
            </span>
          </DisclosureButton>
        </h3>
        <DisclosurePanel className="pt-6">
          <div className="relative mt-2 rounded-md shadow-sm flex items-center space-x-1">
            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                id="price-min"
                name="price-min"
                type="number"
                value={priceRange?.min || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value.length <= 6) {
                    handlePriceChange(e, 'min')
                  }
                }}
                placeholder="Min"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>

            <span className="mx-2 text-gray-500">-</span>

            <div className="relative w-full">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                id="price-max"
                name="price-max"
                type="number"
                value={priceRange?.max || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.value.length <= 6) {
                    handlePriceChange(e, 'max')
                  }
                }}
                placeholder="Max"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-4">
            <UiButton
              clickEvent={resetPriceRange}
              isDisabled={!priceRange?.min && !priceRange?.max}
              width="full"
            >
              Reset
            </UiButton>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </form>
  )
}

export default ProductFilters
