import { useSnackbar } from '../../contextApi/SnackBarContext'
import { useAuth } from '../../contextApi/AuthContext'
import { useCart } from '../../contextApi/CartContext'
import CartItem from './CartItem'
import React from 'react'

export default function CartQuickView() {
  const { showSnackbar } = useSnackbar()
  const { user } = useAuth()
  const { cartItems, removeFromCart } = useCart()

  // Filter cart items based on the current user
  const userCartItems = user
    ? cartItems.filter((item) => item.userId === user.id)
    : []

  function handleRemoveFromCart(productId: number) {
    removeFromCart(productId)
    showSnackbar('Item removed from cart successfully!', 'success')
  }

  return (
    <div className="mt-8 overflow-auto h-[85vh]">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {userCartItems && userCartItems.length > 0 ? (
            userCartItems.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                removeFromCart={handleRemoveFromCart}
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
