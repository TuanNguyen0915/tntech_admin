"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import ImageUpload from "../image/ImageUpload"
import { useRouter } from "next/navigation"

import toast from "react-hot-toast"
import { voidEnterKey } from "@/lib/action"
import {
  createNewCollection,
  updatedCollection,
} from "@/lib/services/collection.service"

const FormSchema = z.object({
  title: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must be less than 500 characters.",
    })
    .trim(),
  image: z.string(),
})

interface ICollectionFormProps {
  formData?: {
    title: string
    description: string
    image: string
    _id: string
  }
}
const CollectionForm = ({ formData }: ICollectionFormProps) => {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: formData
      ? formData
      : {
          title: "",
          description: "",
          image: "",
        },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let res
    // updated collection
    if (formData?._id) {
      res = await updatedCollection(formData?._id, data)
    } else {
      // create new collection
      res = await createNewCollection(data)
    }
    if (!res.success) {
      toast.error(res.message)
      return
    }
    toast.success(res.message)
    router.push("/collections")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-semibold tracking-wide">
                Title
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Title"
                  {...field}
                  onKeyDown={voidEnterKey}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-semibold tracking-wide">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  {...field}
                  rows={10}
                  onKeyDown={voidEnterKey}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-semibold tracking-wide">
                Image
              </FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value ? [field.value] : []}
                  onChange={(url: any) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size={"lg"}
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          Submit
        </Button>
        <Button
          type="button"
          size={"lg"}
          onClick={() => router.push("/collections")}
          className="ml-10 bg-destructive/80 transition-all hover:bg-destructive"
        >
          Discard
        </Button>
      </form>
    </Form>
  )
}

export default CollectionForm
