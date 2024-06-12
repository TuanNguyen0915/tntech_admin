import Customer from "@/lib/database/models/Customer.model"
import Order from "@/lib/database/models/Order.model"
import { connectToDB } from "@/lib/database/mongoDb"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  try {
  await connectToDB()
    const orders = await Order.find({}).sort({ createdAt: "desc" })
    const orderDetails = await Promise.all(
      orders.map(async (order) => {
        const customer = await Customer.findOne({
          clerkId: order.customerClerkId,
        })
        // return { ...order._doc, customer: customer?._doc }
        return { ...order._doc, customer: customer._doc }
      }),
    )
    return NextResponse.json({ orders: orderDetails }, { status: 200 })
  } catch (error) {
    console.log("Orders_GET", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}
export const dynamic = "force-dynamic"
