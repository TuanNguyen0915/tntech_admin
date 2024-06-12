"use client"

import { ColumnDef } from "@tanstack/react-table"
import Delete from "../shared/Delete"
import Link from "next/link"

import { ICollection, IProduct } from "@/lib/types"

export const columns: ColumnDef<IProduct>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original._id}`}
        className="text-lg capitalize hover:text-primary"
      >
        {row.original.title.length >= 40
          ? row.original.title.slice(0, 40) + "..."
          : row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original._id}`}
        className="text-lg capitalize hover:text-primary"
      >
        {row.original.category}
      </Link>
    ),
  },
  {
    accessorKey: "collections",
    header: "Collections",
    cell: ({ row }) => (
      <div className="flexCol gap-2">
        {row.original.collections?.map((collection: ICollection) => (
          <p className="text-md italic">{collection.title}</p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price ($)",
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original._id}`}
        className="text-lg capitalize hover:text-primary"
      >
        {row.original.price}
      </Link>
    ),
  },
  {
    accessorKey: "expense",
    header: "Cost ($) ",
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original._id}`}
        className="text-lg capitalize hover:text-primary"
      >
        {row.original.expense}
      </Link>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => <Delete itemId={row.original._id} type="product" />,
  },
]
