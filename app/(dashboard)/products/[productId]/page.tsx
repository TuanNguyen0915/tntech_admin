"use client"
import ProductForm from "@/components/products/ProductForm"
import Delete from "@/components/shared/Delete"
import Loader from "@/components/shared/Loader"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getProductById } from "@/lib/services/product.service"
import { IProduct } from "@/lib/types"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"

const ProductDetails = async ({
  params,
}: {
  params: { productId: string }
}) => {
  let formData
  const [product, setProduct] = useState<IProduct | null>()
  const [transition, setTransition] = useTransition()

  useEffect(() => {
    setTransition(async () => {
      const data = await getProductById(params.productId)
      setProduct(data.product)
    })
  }, [params.productId])
  if (product) {
    formData = {
      title: product?.title!,
      description: product?.description!,
      media: product?.media!,
      category: product?.category!,
      collections: product?.collections,
      tags: product?.tags!,
      sizes: product?.sizes!,
      colors: product?.colors!,
      price: product?.price!,
      expense: product?.expense!,
      _id: product?._id!,
    }
  }

  if (transition) {
    return (
      <div className="flexCenter h-[60vh] w-full">
        <Loader size={24} />
      </div>
    )
  }
  return (
    <div className="w-full space-y-4 px-4 py-10 lg:px-10">
      <div className="flexBetween w-full">
        <h1 className="pageTittle">Product Details</h1>
        <Delete itemId={product?._id!} type="product" />
      </div>
      <Separator className="bg-gray-500" />
      {!product ? (
        <div className="flexCenter h-[60vh] flex-col gap-10">
          <p className="text-lg">Product not found</p>
          <Button className="text-lg">
            <Link href={"/"}>Back to homepage</Link>
          </Button>
        </div>
      ) : (
        <div>
          <ProductForm formData={formData} />
        </div>
      )}
    </div>
  )
}

export default ProductDetails
