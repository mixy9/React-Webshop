import React from 'react'
import { Product } from '../../types/General'
import { useModal } from '../../ModalContext'
import AddToCart from '../cart/AddToCart'
import ProductQuickView from './ProductQuickView'

type Props = {
  product: Product
}

export default function ProductItem({ product }: Props) {
  const productDescription = product.description.slice(0, 100).trim() + '...'

  const { openModal } = useModal()

  const handleOpenModal = () => {
    openModal(<ProductQuickView product={product} />, product.title, 'center')
  }

  return (
    <button
      onClick={handleOpenModal}
      key={product.id}
      className="group text-left"
      type="button"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          loading="lazy"
          alt={`product-thumbnail-${product.id}`}
          src={product.thumbnail}
          className="group-hover:opacity-75 w-[284px] h-[284px]"
        />
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-700">
        {product.title}
      </h3>
      <p className="mt-1 text-sm text-lg text-gray-900">{productDescription}</p>
      <p className="mt-1 text-lg font-bold text-right text-gray-900">
        ${product.price}
      </p>
      <AddToCart product={product} />
    </button>
  )
}
