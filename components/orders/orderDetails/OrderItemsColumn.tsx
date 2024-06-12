"use client"

import { ColumnDef } from "@tanstack/react-table"

import Link from "next/link"

import Image from "next/image"
import { IOrderItem } from "@/lib/types"

export const columns: ColumnDef<IOrderItem>[] = [
  {
    accessorKey: "product.title",
    header: "Title",
    id: "title",
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original.product._id}`}
        className="text-lg capitalize hover:text-primary"
      >
        {row.original.product.title}
      </Link>
    ),
  },
  {
    accessorKey: "media[0]",
    header: "Image",
    cell: ({ row }) => (
      <Image
        src={row.original.product.media[0]}
        alt="product"
        width={100}
        height={100}
        className="rounded-lg"
      />
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <p className="text-lg">${row.original.product.price}</p>,
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => <p className="text-lg">{row.original.color}</p>,
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => <p className="text-lg">{row.original.size}</p>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <p className="text-lg">{row.original.quantity}</p>,
  },
]
