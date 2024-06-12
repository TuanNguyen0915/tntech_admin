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

import MultiValueInput from "../shared/MultiValueInput"
import { useEffect, useState, useTransition } from "react"

import Loader from "../shared/Loader"
import MultiSelectInPut from "../shared/MultiSelectInPut"
import { getAllCollection } from "@/lib/services/collection.service"
import { voidEnterKey } from "@/lib/action"
import { ICollection, IProduct } from "@/lib/types"
import {
  createNewProduct,
  updatedProduct,
} from "@/lib/services/product.service"

const FormSchema = z.object({
  title: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(1000, {
      message: "Description must be less than 1000 characters.",
    })
    .trim(),
  media: z.array(z.string()),
  category: z.string(),
  collections: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1),
})

interface IProductFormProps {
  // formData?: {
  //   _id: string
  //   title: string
  //   description: string
  //   media: string[]
  //   category: string
  //   collections: ICollection[]
  //   tags: string[]
  //   sizes: string[]
  //   colors: string[]
  //   price: number
  //   expense: number
  // }
  formData?: IProduct | null
}
const ProductForm = ({ formData }: IProductFormProps) => {
  const router = useRouter()
  const [collections, setCollections] = useState<ICollection[] | null>()
  const [transition, setTransition] = useTransition()

  useEffect(() => {
    setTransition(async () => {
      const data = await getAllCollection()
      setCollections(data.collections)
    })
  }, [])
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: formData
      ? {
          ...formData,
          collections: formData.collections.map((item) => item._id),
        }
      : {
          title: "",
          description: "",
          media: [],
          category: "",
          collections: [],
          tags: [],
          sizes: [],
          colors: [],
          price: 0.1,
          expense: 0.1,
        },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let res
    if (formData?._id) {
      res = await updatedProduct(formData._id, data)
    } else {
      res = await createNewProduct(data)
    }
    if (!res.success) {
      toast.error(res.message)
      return
    }
    toast.success(res.message)
    router.push("/products")
  }

  if (transition) {
    return (
      <div className="flexCenter h-[60vh] w-full">
        <Loader />
      </div>
    )
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
        {/* TITLE */}
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
        {/* DESCRIPTION */}
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
        {/* MEDIA */}
        <FormField
          control={form.control}
          name="media"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-semibold tracking-wide">
                Image
              </FormLabel>
              <FormControl>
                <ImageUpload
                  value={field.value}
                  onChange={(url: string) =>
                    field.onChange([...field.value, url])
                  }
                  onRemove={(url: string) =>
                    field.onChange([
                      ...field.value.filter((image) => image !== url),
                    ])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* TODO: PRICE, EXPENSE, CATEGORY */}
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold tracking-wide">
                  Price ($)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Price"
                    {...field}
                    onKeyDown={voidEnterKey}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expense"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold tracking-wide">
                  Expense ($)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Expense"
                    {...field}
                    onKeyDown={voidEnterKey}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold tracking-wide">
                  Category
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Category"
                    {...field}
                    onKeyDown={voidEnterKey}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* TODO: TAGS, COLLECTION, COLORS AND SIZE */}
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold tracking-wide">
                  Tags
                </FormLabel>
                <FormControl>
                  <MultiValueInput
                    placeholder="Tags"
                    value={field.value}
                    onChange={(tag: string) =>
                      field.onChange([...field.value, tag])
                    }
                    onRemove={(tag: string) =>
                      field.onChange([
                        ...field.value.filter((item) => item !== tag),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="collections"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold tracking-wide">
                  Collection
                </FormLabel>
                <FormControl>
                  <MultiSelectInPut
                    placeholder="Collections"
                    collections={collections!}
                    value={field.value}
                    onChange={(id) => field.onChange([...field.value, id])}
                    onRemove={(id: string) =>
                      field.onChange([
                        ...field.value.filter((itemId) => itemId !== id),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colors"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold tracking-wide">
                  Colors
                </FormLabel>
                <FormControl>
                  <MultiValueInput
                    placeholder="Colors"
                    value={field.value}
                    onChange={(color: string) =>
                      field.onChange([...field.value, color])
                    }
                    onRemove={(color: string) =>
                      field.onChange([
                        ...field.value.filter((item) => item !== color),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold tracking-wide">
                  Sizes
                </FormLabel>
                <FormControl>
                  <MultiValueInput
                    placeholder="Sizes"
                    value={field.value}
                    onChange={(size: string) =>
                      field.onChange([...field.value, size])
                    }
                    onRemove={(size: string) =>
                      field.onChange([
                        ...field.value.filter((item) => item !== size),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* BUTTON */}
        <Button type="submit" size={"lg"}>
          Submit
        </Button>
        <Button
          type="button"
          size={"lg"}
          onClick={() => router.push("/products")}
          className="ml-10 bg-destructive/80 transition-all hover:bg-destructive"
        >
          Discard
        </Button>
      </form>
    </Form>
  )
}

export default ProductForm
