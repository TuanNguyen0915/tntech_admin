import { auth } from "@clerk/nextjs/server"
import { connectToDB } from "@/lib/database/mongoDb"
import { NextRequest, NextResponse } from "next/server"
import Collection from "@/lib/database/models/Collection.model"

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 })
    }
    await connectToDB()
    const { title, description, image } = await req.json()
    const existingCollection = await Collection.findOne({ title })
    if (existingCollection) {
      return NextResponse.json(
        { message: "Collection already exists", success: false },
        { status: 400 },
      )
    }
    if (!title || !description || !image) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 },
      )
    }
    const collection = await Collection.create({
      title,
      description,
      image,
    })
    return NextResponse.json(
      { message: "Collection created successfully", collection, success: true },
      { status: 201 },
    )
  } catch (error) {
    console.log("Collection_newCollection", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB()
    const collections = await Collection.find({}).sort({ createdAt: "desc" })
    return NextResponse.json({ collections, success: true }, { status: 200 })
  } catch (error) {
    console.log("Collections_getAll", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    )
  }
}
export const dynamic = "force-dynamic"
