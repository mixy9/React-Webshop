import React, { FC } from 'react'
import { Product } from '../../types/General'
import { useSnackbar } from '../../contextApi/SnackBarContext'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import UiButton from '../ui/UiButton'
import { useAuth } from '../../contextApi/AuthContext'
import Login from '../LogIn'
import { useModal } from '../../contextApi/ModalContext'
import { useCart } from '../../contextApi/CartContext'

type Props = {
  product: Product
}

const AddToCart: FC<Props> = ({ product }: Props) => {
  const { showSnackbar } = useSnackbar()
  const { user } = useAuth()
  const { openModal } = useModal()
  const { addToCart, isInCart } = useCart()

  const existingItem = isInCart(product.id)

  function openLoginModal() {
    openModal(<Login />, '', 'center')
  }

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (!user) {
      openLoginModal()
      return
    }

    if (existingItem) {
      showSnackbar('Item already added to cart', 'success')
      return
    }

    const productToAdd = {
      ...product,
      userId: user?.id,
    }

    addToCart(productToAdd)
    showSnackbar('Item added to cart', 'success')
  }

  return (
    <UiButton clickEvent={handleAddToCart} isDisabled={existingItem}>
      <ShoppingCartIcon aria-hidden="true" className="h-6 w-6 text-white" />
    </UiButton>
  )
}

export default AddToCart
