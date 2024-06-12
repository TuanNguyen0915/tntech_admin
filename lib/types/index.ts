export interface ICollection {
  _id: string
  title: string
  description: string
  image: string
  products: IProduct[]
  createdAt: Date
  updatedAt: Date
}

export interface IProduct {
  _id: string
  title: string
  description: string
  media: string[]
  category: string
  collections: ICollection[]
  tags: string[]
  sizes: string[]
  colors: string[]
  price: number
  expense: number
}

export interface ICustomer {
  _id: string
  clerkId: string
  name: string
  email: string
  orders: string[]
}


export interface IOrder {
  _id: string
  customerClerkId: string
  customer: ICustomer
  products: IProduct[]
  shippingAddress: {
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  shippingRate: string
  totalAmount: number
  createdAt: Date
  updatedAt: Date
}

export interface IOrderItem {
  product: IProduct
  color: string
  size: string
  quantity: number
}