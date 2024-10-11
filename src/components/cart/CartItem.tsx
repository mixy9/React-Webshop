import { Product } from '../../types/General'

type Props = {
  product: Product
  removeFromCart: (product: Product['id']) => void
}

export default function CartItem({ product, removeFromCart }: Props) {
  return (
    <li key={product.id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          alt={product.title}
          src={product.thumbnail}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{product.title}</h3>
            <p className="ml-4">${product.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {product.availabilityStatus}
          </p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">{product.shippingInformation}</p>

          <div className="flex">
            <button
              onClick={() => removeFromCart(product.id)}
              type="button"
              className="font-medium text-cyan-500 hover:text-cyan-600"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}
