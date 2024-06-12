"use client"
import CollectionForm from "@/components/collections/CollectionForm"
import Delete from "@/components/shared/Delete"
import Loader from "@/components/shared/Loader"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getCollectionById } from "@/lib/services/collection.service"
import { ICollection } from "@/lib/types"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"

const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string }
}) => {
  let formData
  const [collection, setCollection] = useState<ICollection | null>()
  const [transition, setTransition] = useTransition()
  useEffect(() => {
    setTransition(async () => {
      const data = await getCollectionById(params.collectionId)
      setCollection(data.collection)
    })
  }, [params.collectionId])
  if (collection) {
     formData = {
      _id: collection?._id!,
      title: collection?.title!,
      description: collection?.description!,
      image: collection?.image!,
    }
  }

  if (transition) {
    return (
      <div className="flexCenter h-[60vh] w-full">
        <Loader size={24}/>
      </div>
    )
  }
  return (
    <div className="w-full space-y-4 px-4 py-10 lg:px-10">
      <div className="flexBetween w-full">
        <h1 className="pageTitle">Collection Details</h1>
        <Delete itemId={collection?._id!} type="collection" />
      </div>
      <Separator className="bg-gray-500" />
      {!collection ? (
        <div className="flexCenter h-[60vh] flex-col gap-10">
          <p className="text-lg">Collection not found</p>
          <Button className="text-lg">
            <Link href={"/"}>Back to homepage</Link>
          </Button>
        </div>
      ) : (
        <div>
          <CollectionForm formData={formData} />
        </div>
      )}
    </div>
  )
}

export default CollectionDetails
