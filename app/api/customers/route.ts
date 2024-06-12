import Customer from "@/lib/database/models/Customer.model"
import { connectToDB } from "@/lib/database/mongoDb"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()
    const customers = await Customer.find({}).sort({ createdAt: "desc" })
    return NextResponse.json({ customers }, { status: 200 })
  } catch (error) {
    console.log("Customers_GET: ", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}
export const dynamic = "force-dynamic"
