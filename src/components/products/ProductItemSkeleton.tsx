import React from 'react'

export default function ProductItemSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="group text-left">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <div className="h-full w-full bg-gray-300 object-cover object-center w-[300px] h-[300px]" />
        </div>
        <div className="mt-4 w-full h-[280px] bg-gray-300 rounded" />
        <div className="mt-3 h-4 bg-gray-300 rounded w-full" />
        <div className="mt-1 h-4 bg-gray-300 rounded w-5/6" />
        <div className="mt-4 h-6 bg-gray-300 rounded w-1/4 ml-auto" />
      </div>
    </div>
  )
}
