'use client'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '@/components/ui/command'


import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { ChevronsUpDown, X } from 'lucide-react'
import { Badge } from '../ui/badge'
import { ICollection } from '@/lib/types'

interface IMultiValueInputProps {
  placeholder: string
  value: string[]
  onChange: (value: string) => void
  onRemove: (value: string) => void
  collections: ICollection[]
}
const MultiSelectInPut = ({ placeholder, value, onChange, onRemove, collections }: IMultiValueInputProps) => {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)
  let selected: ICollection[]
  if (value.length === 0) {
    selected = []
  } else {
    selected = collections?.filter((item) => value.includes(item._id))
  }
  const selectableCollections = collections?.filter((item) => !value.includes(item._id))

  return (
    <div className='flexCol gap-4'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className='w-full'>
          <Button variant='ghost' className='border border-primary justify-between w-full'>
            <p>Select Collections</p>
            <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full'>
          <Command className='w-full'>
            <CommandInput
              placeholder={placeholder}
              value={inputValue}
              onValueChange={setInputValue}
              className='w-full'
            />
            <CommandList className='w-full'>
              <CommandEmpty>No collections found</CommandEmpty>
              {selectableCollections?.map((item) => (
                <CommandItem
                  key={item._id}
                  onMouseDown={(e) => {
                    e.preventDefault()
                  }}
                  onSelect={() => {
                    onChange(item._id)
                    setInputValue('')
                    setOpen(false)
                  }}
                  className='w-full'>
                  {item.title}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className='w-full flex items-center gap-2'>
        {selected?.map((item) => (
          <Badge
            key={item._id}
            className='bg-gray-600 group border border-gray-600 hover:border-primary hover:text-black transition-all text-white p-2 gap-2 rounded-lg lg:text-md flexBetween group hover:bg-transparent'>
            {item.title}
            <button
              onClick={() => onRemove(item._id)}
              className='ml-1 rounded-full p-1 outline-none group-hover:bg-red-500 group-hover:text-white transition-all'>
              <X className='h-3 w-3' />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default MultiSelectInPut
