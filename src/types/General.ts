export type Product = {
  id: number
  brand: string
  description: string
  category: string
  title: string
  thumbnail: string
  price: string
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
