import {
  FC,
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { Product } from '../types/General'
import { useAuth } from './AuthContext'

type CartContextType = {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  isInCart: (productId: number) => boolean
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CartProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth()
  const [cartItems, setCartItems] = useState<Product[]>([])

  // load cart from localStorage when the component mounts or when the user changes
  useEffect(() => {
    if (user) {
      const storedCart = JSON.parse(
        localStorage.getItem(`cart_${user.id}`) || '[]'
      ) as Product[]
      setCartItems(storedCart)
    } else {
      setCartItems([])
    }
  }, [user])

  // update localStorage whenever cartItems change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(cartItems))
    }
  }, [cartItems, user])

  const addToCart = (product: Product) => {
    setCartItems((prevItems: Product[]) => [...prevItems, product])
  }

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems: Product[]) =>
      prevItems.filter((item: Product) => item.id !== productId)
    )
  }

  const isInCart = (productId: number): boolean => {
    return cartItems.some((item: Product) => item.id === productId)
  }

  const cartCount = cartItems.length

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, isInCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export default CartProvider
