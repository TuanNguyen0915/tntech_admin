export const createNewProduct = async (dataForm: {
  title: string
  description: string
  media: string[]
  category: string
  tags: string[]
  sizes: string[]
  colors: string[]
  price: number
  expense: number
  collections: string[]
}) => {
  const res = await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(dataForm),
  })
  const data = await res.json()
  return data
}

export const getAllProducts = async () => {
  const res = await fetch("/api/products")
  const data = await res.json()
  return data
}

export const getProductById = async (id: string) => {
  const res = await fetch(`/api/products/${id}`)
  const data = await res.json()
  return data
}

export const deleteProductById = async (id: string) => {
  const data = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  })
  return data
}

export const updatedProduct = async (
  id: string,
  dataForm: {
    title: string
    description: string
    media: string[]
    category: string
    tags: string[]
    sizes: string[]
    colors: string[]
    price: number
    expense: number
    collections: string[]
  },
) => {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(dataForm),
  })
  const data = await res.json()
  return data
}
