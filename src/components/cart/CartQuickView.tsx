import { Product } from '../../types/General'
import { useSnackbar } from '../../contextApi/SnackBarContext'
import { useEffect, useState } from 'react'
import CartItem from './CartItem'
import { useAuth } from '../../contextApi/AuthContext'

// TODO: add ellipsis to text - global class (use on product items)
export default function CartQuickView() {
  const { showSnackbar } = useSnackbar()
  const [cartItems, setCartItems] = useState<Product[] | null>(null)

  const { user } = useAuth()

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]') as Product[]
    setCartItems(cart.filter((cartItems) => cartItems.userId === user?.id))
  }, [])

  function removeFromCart(productId: Product['id']) {
    const updatedCartItems =
      cartItems?.filter((item: Product) => item.id !== productId) || []

    localStorage.setItem('cart', JSON.stringify(updatedCartItems))

    setCartItems(updatedCartItems)

    showSnackbar('Item removed from cart successfully!', 'success')
  }

  return (
    <div className="mt-8 overflow-auto h-[85vh]">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((product: Product) => (
              <CartItem
                key={product.id}
                product={product}
                removeFromCart={removeFromCart}
              />
            ))
          ) : (
            <li className="text-center text-gray-500 py-6">
              Your cart is empty.
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
