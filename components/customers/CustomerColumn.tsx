"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ICustomer } from "@/lib/types"

export const columns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: "name",
    header: "Full Name",
    cell: ({ row }) => (
      <p className="text-lg font-semibold">{row.original.name}</p>
    ),
  },
  {
    accessorKey: "clerkId",
    header: "ClerkId",
    cell: ({ row }) => <p className="text-lg ">{row.original.clerkId}</p>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <p className="text-lg">{row.original.email}</p>,
  },
]
