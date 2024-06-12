import Loader from '@/components/shared/Loader'
import React from 'react'

const loading = () => {
  return (
    <div className='w-full h-[80vh] flexCenter'>
      <Loader />
    </div>
  )
}

export default loading
