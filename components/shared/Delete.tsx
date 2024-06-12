"use client"
import { Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"

import toast from "react-hot-toast"
import { deleteCollectionById } from "@/lib/services/collection.service"
import { deleteProductById } from "@/lib/services/product.service"

const Delete = ({ itemId, type }: { itemId: string; type: string }) => {
  const handleDelete = async () => {
    if (type === "collection") {
      await deleteCollectionById(itemId)
    } else if (type === "product") {
      await deleteProductById(itemId)
    }
    toast.success(`Deleted ${type} successfully`)
    setTimeout(() => {
      window.location.href = `${type}s`
    }, 1000)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>
          <Trash2 size={24} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="space-y-10">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold  text-destructive">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg">
            This action cannot be undone. This will permanently delete your
            collection.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-muted-foreground text-lg text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-lg text-white hover:bg-destructive hover:brightness-125"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Delete
