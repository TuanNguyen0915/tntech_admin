import Customer from "@/lib/database/models/Customer.model"
import Order from "@/lib/database/models/Order.model"
import Product from "@/lib/database/models/Product.model"
import { connectToDB } from "@/lib/database/mongoDb"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
  req: NextRequest,
  { params }: { params: { orderId: string } },
) => {
  try {
    await connectToDB()
    const order = await Order.findById(params.orderId).populate({
      path: "products.product",
      model: Product,
    })
    const customer = await Customer.findOne({ clerkId: order?.customerClerkId })
    return NextResponse.json(
      { order, customer, success: true },
      { status: 200 },
    )
  } catch (error) {
    console.log("Order_detail_get", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}
export const dynamic = "force-dynamic"
