export type Product = {
  id: number
  brand: string
  description: string
  category: string
  title: string
  thumbnail: string
  price: number
  rating: number
  reviews: string[]
  availabilityStatus: string
  shippingInformation: string
  userId?: number
}

export type ProductList = {
  products: Product[]
  limit: number
  total: number
  skip: number
}

export type Category = {
  slug: string
  name: string
  url: string
}

export type PriceRange = {
  min: number
  max: number
}

export type User = {
  id: number
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
  image: string
}
