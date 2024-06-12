import Customer from "../database/models/Customer.model"
import Order from "../database/models/Order.model"
import { connectToDB } from "../database/mongoDb"

export const getTotalSales = async () => {
  await connectToDB()
  const orders = await Order.find({})
  const totalOrders = orders.length
  let totalRevenue = (orders.reduce((acc, order) => acc + order.totalAmount, 0)).toFixed(2)
  totalRevenue = parseFloat(totalRevenue)
  return { totalOrders, totalRevenue }
}

export const getTotalCustomers = async () => {
  await connectToDB()
  const customers = await Customer.find({})
  return customers.length
}

export const getSalesPerMonth = async () => {
  await connectToDB()
  const orders = await Order.find()
  let salesPerMonth = orders.reduce((acc, order) => {
    const monthIndex = new Date(order.createdAt).getMonth()
   
    acc[monthIndex] = parseFloat(((acc[monthIndex] || 0) + order.totalAmount).toFixed(2))
    return acc
  }, {})
  const graphData = Array.from({ length: 12 }, (_, i) => {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      new Date(0, i),
    )
    return { name: month, sales: salesPerMonth[i] || 0 }
  })
  return graphData
}
