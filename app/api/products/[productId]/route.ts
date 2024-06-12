import Collection from "@/lib/database/models/Collection.model"
import Product from "@/lib/database/models/Product.model"
import { connectToDB } from "@/lib/database/mongoDb"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } },
) => {
  try {
    const product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    })
    return NextResponse.json({ product, success: true }, { status: 200 })
  } catch (error) {
    console.log("Products_getOne", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } },
) => {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }
    await connectToDB()
    const product = await Product.findByIdAndDelete(params.productId)
    product.collections.forEach(async (collectionId: string) => {
      await Collection.findByIdAndUpdate(collectionId, {
        $pull: { products: params.productId },
      })
    })
    return NextResponse.json(
      { message: "Product deleted successfully", data: product },
      { status: 200 },
    )
  } catch (error) {
    console.log("Products_delete", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}

export const PUT = async (
  req: NextRequest,
  { params }: { params: { productId: string } },
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
    const product = await Product.findById(params.productId)
    const stringProductCollection = product?.collections.map(
      (collectionId: string) => collectionId.toString(),
    )
    const updatedCollections = collections.filter(
      (collectionId: string) => !stringProductCollection.includes(collectionId),
    )
    const removedCollections = stringProductCollection.filter(
      (collectionId: string) => !collections.includes(collectionId),
    )
    await Promise.all([
      updatedCollections.forEach(async (collectionId: string) => {
        await Collection.findByIdAndUpdate(collectionId, {
          $push: { products: params.productId },
        })
      }),
      removedCollections.forEach(async (collectionId: string) => {
        await Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: params.productId },
        })
      }),
      ,
    ])
    const updatedProduct = await Product.findByIdAndUpdate(
      params.productId,
      {
        title,
        description,
        media,
        category,
        tags,
        sizes,
        colors,
        price,
        expense,
        collections,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    return NextResponse.json(
      {
        message: "Update successfully",
        product: updatedProduct,
        success: true,
      },
      { status: 200 },
    )
  } catch (error) {
    console.log("Products_update", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}
export const dynamic = "force-dynamic"
