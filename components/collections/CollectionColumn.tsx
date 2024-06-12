'use client'

import { ColumnDef } from '@tanstack/react-table'
import Delete from '../shared/Delete'

import Link from 'next/link'
import { ICollection } from '@/lib/types'


export const columns: ColumnDef<ICollection>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <Link href={`/collections/${row.original._id}`} className='text-lg capitalize hover:text-primary'>
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: 'products',
    header: 'Products',
    cell: ({ row }) => (
      <Link href={`/collections/${row.original._id}/products`} className='text-lg hover:text-primary'>
        {row.original.products.length}
      </Link>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <Delete itemId={row.original._id}  type='collection'/>,
  },
]
