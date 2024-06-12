import Collection from "@/lib/database/models/Collection.model"
import Product from "@/lib/database/models/Product.model"
import { connectToDB } from "@/lib/database/mongoDb"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json()

    await connectToDB()
    const product = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    })
    // Add product to collection
    collections.forEach(async (collectionId: string) => {
      await Collection.findByIdAndUpdate(collectionId, {
        $push: { products: product._id },
      })
    })
    return NextResponse.json(
      { message: "Product created successfully", product, success: true },
      { status: 201 },
    )
  } catch (error) {
    console.log("product_create", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()
    const products = await Product.find({})
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection })
    return NextResponse.json({ products }, { status: 200 })
  } catch (error) {
    console.log("Products_getAll", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}
export const dynamic = "force-dynamic"
