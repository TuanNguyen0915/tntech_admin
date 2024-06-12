export const getAllOrders = async () => {
  const res = await fetch(`/api/orders`)
  const data = await res.json()
  return data.orders
}

export const getOrderById = async (id: string) => {
  const res = await fetch(`/api/orders/${id}`)
  const data = await res.json()
  return data
}

export const getAllCustomers = async () => {
  const res = await fetch(`/api/customers`)
  const data = await res.json()
  return data.customers
}



export const voidEnterKey = (
  e:
    | React.KeyboardEvent<HTMLInputElement>
    | React.KeyboardEvent<HTMLTextAreaElement>,
) => {
  if (e.key === "Enter") {
    e.preventDefault()
  }
}
