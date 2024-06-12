"use client"

import { columns } from "@/components/collections/CollectionColumn"
import { DataTable } from "@/components/shared/DataTable"
import Loader from "@/components/shared/Loader"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getAllCollection } from "@/lib/services/collection.service"
import { ICollection } from "@/lib/types"

import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"

const CollectionsPage = () => {
  const router = useRouter()
  const [collections, setCollections] = useState<ICollection[] | []>()
  const [transition, setTransition] = useTransition()

  useEffect(() => {
    setTransition(async () => {
      const data = await getAllCollection()
      setCollections(data.collections)
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
        <h1 className="pageTitle">Collections</h1>

        <Button
          onClick={() => router.push("/collections/new")}
          className="text-lg max-md:text-base"
        >
          <Plus />
          Create Collection
        </Button>
      </div>
      <Separator className="bg-gray-500" />
      {!collections || collections?.length === 0 ? (
        <div className="flexCenter h-[30vh] w-full">
        <p className="text-lg">No Collections found</p>{" "}
      </div>
      ) : (
        <DataTable columns={columns} data={collections} searchKey="title" />
      )}
    </div>
  )
}

export default CollectionsPage
