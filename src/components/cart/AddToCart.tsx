import React, { FC, useEffect, useState } from 'react'
import { Product } from '../../types/General'
import { useSnackbar } from '../../contextApi/SnackBarContext'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import UiButton from '../ui/UiButton'
import { useAuth } from '../../contextApi/AuthContext'
import Login from '../LogIn'
import { useModal } from '../../contextApi/ModalContext'

type Props = {
  product: Product
}

const AddToCart: FC<Props> = ({ product }: Props) => {
  const { showSnackbar } = useSnackbar()
  const [cartItems, setCartItems] = useState<Product[]>([])
  const { user } = useAuth()
  const { openModal } = useModal()

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]') as Product[]
    setCartItems(cart)
  }, [])

  const existingItem = cartItems?.find(
    (item: Product) => item?.id === product?.id
  )

  function openLoginModal() {
    openModal(<Login />, '', 'center')
  }

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (!user) {
      openLoginModal()
      return
    }

    const currentCart = JSON.parse(
      localStorage.getItem('cart') || '[]'
    ) as Product[]

    const existingItemInCart = currentCart.find(
      (item: Product) => item.id === product.id
    )

    if (existingItemInCart) {
      return
    }

    console.log(user)

    const updatedCart = [
      ...currentCart,
      {
        ...product,
        userId: user?.id,
      },
    ]

    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))

    showSnackbar('Item added to cart', 'success')
  }

  return (
    <UiButton clickEvent={handleAddToCart} isDisabled={!!existingItem}>
      <ShoppingCartIcon aria-hidden="true" className="h-6 w-6 text-white" />
    </UiButton>
  )
}

export default AddToCart
