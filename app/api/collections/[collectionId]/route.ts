import Collection from "@/lib/database/models/Collection.model"
import Product from "@/lib/database/models/Product.model"
import { connectToDB } from "@/lib/database/mongoDb"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } },
) => {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    await connectToDB()
    const collection = await Collection.findByIdAndDelete(params.collectionId)
    await Product.updateMany(
      { collections: params.collectionId },
      { $pull: { collections: params.collectionId } },
    )
    return NextResponse.json(
      { message: "Collection deleted successfully", data: collection },
      { status: 200 },
    )
  } catch (error) {
    console.log("Collection_delete", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } },
) => {
  try {
    await connectToDB()
    const collection = await Collection.findById(params.collectionId).populate({
      path: "products",
      model: Product,
    })
    if (!collection) {
      return NextResponse.json(
        { message: "Collection not found", success: false },
        { status: 404 },
      )
    }
    return NextResponse.json({ collection, success: true }, { status: 200 })
  } catch (error) {
    console.log("Collection_get", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}

export const PUT = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } },
) => {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 },
      )
    }
    await connectToDB()
    let collection = await Collection.findById(params.collectionId)
    if (!collection) {
      return NextResponse.json(
        { message: "Collection not found", success: false },
        { status: 404 },
      )
    }
    const { title, description, image } = await req.json()
    if (!title || !description || !image) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 },
      )
    }
    collection = await Collection.findByIdAndUpdate(params.collectionId, {
      title,
      description,
      image,
    })
    collection.products.forEach(async (productId: string) => {
      await Product.findByIdAndUpdate(productId, {
        $pull: { collections: params.collectionId },
      })
    })
    return NextResponse.json(
      { message: "Collection updated successfully", collection, success: true },
      { status: 200 },
    )
  } catch (error) {
    console.log("Collection_edit", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}

export const dynamic = "force-dynamic"

