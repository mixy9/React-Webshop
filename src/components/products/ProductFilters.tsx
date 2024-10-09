import React, { useState, useEffect, ChangeEvent } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { Category, PriceRange } from '../../types/General'
import { getCategories } from '../../service/categoriesApi'

type Props = {
  onFilterChange: (category: string, priceRange: PriceRange) => void
}

export default function ProductFilters({ onFilterChange }: Props) {
  const [categories, setCategories] = useState<Category[] | null>(null)
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 0 })
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const fetchCategories = async () => {
    try {
      const data = await getCategories()
      if (data)
        setCategories([
          {
            slug: '',
            name: 'All',
            url: '',
          },
          ...data,
        ])
    } catch (error) {
      console.log('Failed to load categories')
    }
    console.log('aaa')
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const onPriceChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: 'min' | 'max'
  ) => {
    const value = parseFloat(e.target.value)
    setPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }))
    onFilterChange(selectedCategory, { ...priceRange, [type]: value })
  }

  const onCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value)
    onFilterChange(e.target.value, priceRange)
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
                    onChange={onCategoryChange}
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
                value={priceRange.min}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onPriceChange(e, 'min')
                }
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
                value={priceRange.max}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  onPriceChange(e, 'max')
                }
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </form>
  )
}
