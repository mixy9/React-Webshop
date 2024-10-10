import { StarIcon } from '@heroicons/react/20/solid'
import { Product } from '../../types/General'
import { FC } from 'react'

type Props = {
  product: Product
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const ProductQuickView: FC<Props> = ({ product }: Props) => {
  return (
    <div className="grid w-full grid-cols-1 lg:grid-cols-2 lg:gap-x-8 gap-y-8 items-start">
      {/* Left side: Larger Image */}
      <div className="lg:col-span-1">
        <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100">
          <img
            alt={`product-thumbnail-${product.id}`}
            src={product.thumbnail}
            className="object-cover object-center w-full h-full"
          />
        </div>
      </div>

      {/* Right side: Product information */}
      <div className="lg:col-span-1 h-full flex flex-col justify-between">
        <section aria-labelledby="information-heading">
          <h3 id="information-heading" className="sr-only">
            Product information
          </h3>

          <p className="text-3xl font-bold text-gray-900">${product.price}</p>
          <p className="text-lg font-medium text-green-600">
            {product.availabilityStatus}
          </p>

          <div className="mt-4">
            <h4 className="sr-only">Reviews</h4>
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    aria-hidden="true"
                    className={classNames(
                      product.rating > rating
                        ? 'text-yellow-400'
                        : 'text-gray-200',
                      'h-5 w-5 flex-shrink-0'
                    )}
                  />
                ))}
              </div>
              <p className="sr-only">{product.rating} out of 5 stars</p>
              <p className="ml-3 text-sm font-medium text-cyan-700">
                {product.reviews.length} reviews
              </p>
            </div>
          </div>

          <p className="mt-4 text-base text-gray-800 leading-6">
            {product.description}
          </p>
        </section>

        <section
          aria-labelledby="options-heading"
          className="flex justify-between"
        >
          <h3 id="options-heading" className="sr-only">
            Product options
          </h3>

          <p className="mt-4 text-sm text-gray-800 leading-6">
            {product.shippingInformation}
          </p>
          {/*Add to cart*/}
        </section>
      </div>
    </div>
  )
}

export default ProductQuickView
