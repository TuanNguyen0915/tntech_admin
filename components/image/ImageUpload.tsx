'use client'
import { CldUploadWidget } from 'next-cloudinary'
import { Button } from '../ui/button'
import { Plus, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface IImageUploadProps {
  value: string[]
  onChange: (value: string) => void
  onRemove: (value: string) => void
}

const ImageUpload = ({ value, onChange, onRemove }: IImageUploadProps) => {
  return (
    <div className='w-full space-y-4'>
      <div className='flex items-center flex-wrap gap-4'>
        {value.map((url) => (
          <div
            className='relative w-[200px] h-[200px] group overflow-hidden rounded-xl border border-primary'
            key={url}>
            <div className='flexCenter p-2 bg-destructive/40 rounded-full backdrop-blur-sm scale-0 group-hover:scale-100 duration-500 cursor-pointer transition-all absolute top-2 right-2 z-10 hover:bg-white/80'>
              <Trash2 onClick={() => onRemove(url)} className='text-destructive  brightness-125' size={24} />
            </div>
            <Image
              src={url}
              alt='collection'
              className='object-contain rounded-xl group-hover:brightness-50 transition-all group-hover:scale-110'
              key={url}
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset='tn-tech' onUpload={(result:any) => onChange(result?.info?.secure_url ?? '')}>
        {({ open }) => {
          return (
            <Button type='button' onClick={() => open()} className='bg-muted-foreground flexCenter gap-4'>
              <Plus />
              Upload Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
