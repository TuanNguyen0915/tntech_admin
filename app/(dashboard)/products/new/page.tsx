import ProductForm from '@/components/products/ProductForm'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const NewProductPage = () => {
  return (
    <div className='w-full space-y-4 py-10 lg:px-10 px-4'>
      <h1 className='pageTitle'>Create Product</h1>
      <Separator className='bg-gray-500' />
      <ProductForm />
    </div>
  )
}

export default NewProductPage
