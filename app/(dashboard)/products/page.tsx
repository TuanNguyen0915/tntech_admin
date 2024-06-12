"use client"

import { columns } from "@/components/products/ProductColumns"
import { DataTable } from "@/components/shared/DataTable"
import Loader from "@/components/shared/Loader"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getAllProducts } from "@/lib/services/product.service"
import { IProduct } from "@/lib/types"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

const ProductsPage = () => {
  const router = useRouter()
  const [products, setProducts] = useState<IProduct[] | []>()
  const [transition, setTransition] = useTransition()
  useEffect(() => {
    setTransition(async () => {
      const data = await getAllProducts()
      setProducts(data.products)
    })
  }, [])

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
        <h1 className="pageTitle">Products</h1>
        <Button
          onClick={() => router.push("/products/new")}
          className="text-lg max-md:text-base"
        >
          <Plus />
          Create Product
        </Button>
      </div>
      <Separator className="bg-gray-500" />

      {!products || products?.length === 0 ? (
        <div className="flexCenter h-[30vh] w-full">
          <p className="text-lg">No Products found</p>{" "}
        </div>
      ) : (
        <DataTable columns={columns} data={products} searchKey="title" />
      )}
    </div>
  )
}

export default ProductsPage
