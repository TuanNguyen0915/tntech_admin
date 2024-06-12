import { timeStamp } from "console"
import mongoose from "mongoose"
import { twJoin } from "tailwind-merge"

const ProductSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    media: [String],
    category: String,
    collections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
    tags: [String],
    sizes: [String],
    colors: [String],
    price: { type: Number, required: true },
    expense: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
    },
  },
)

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema)

export default Product
