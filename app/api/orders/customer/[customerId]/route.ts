import Order from "@/lib/database/models/Order.model"
import Product from "@/lib/database/models/Product.model"
import { connectToDB } from "@/lib/database/mongoDb"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
  req: NextRequest,
  { params }: { params: { customerId: string } },
) => {
  try {
    await connectToDB()
    const orders = await Order.find({
      customerClerkId: params.customerId,
    }).populate({
      path: "products.product",
      model: Product,
    }).sort({ createdAt: "desc" })
    return NextResponse.json({ orders }, { status: 200 })
  } catch (error) {
    console.log("CustomerOrder_GET", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}
export const dynamic = "force-dynamic"
