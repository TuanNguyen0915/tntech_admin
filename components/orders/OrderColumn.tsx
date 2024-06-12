"use client"

import { ColumnDef } from "@tanstack/react-table"

import Link from "next/link"
import { IOrder } from "@/lib/types"

export const columns: ColumnDef<IOrder>[] = [
  {
    accessorKey: "order",
    header: "Order",
    cell: ({ row }) => (
      <Link
        href={`/orders/${row.original._id}`}
        className="text-lg capitalize hover:text-primary"
      >
        {row.original._id}
      </Link>
    ),
  },
  {
    accessorKey: "customer.name",
    header: "Customer Name",
    id: "customerName",
    cell: ({ row }) => <p className="text-lg">{row.original.customer.name}</p>,
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => (
      <p className="text-lg font-medium">${row.original.totalAmount}</p>
    ),
  },
  {
    accessorKey: "customer.orders.length",
    header: "Products",
    cell: ({ row }) => (
      <p className="text-lg">{row.original.products.length}</p>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Order Date",
    cell: ({ row }) => (
      <p className="text-lg">
        {new Date(row.original.createdAt).toLocaleDateString()}
      </p>
    ),
  },
]
