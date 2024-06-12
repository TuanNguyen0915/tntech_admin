'use client'
import { useState } from 'react'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { X } from 'lucide-react'
import { Button } from '../ui/button'

interface IMultiValueInputProps {
  placeholder: string
  value: string[]
  onChange: (value: string) => void
  onRemove: (value: string) => void
}

const MultiValueInput = ({ placeholder, value, onChange, onRemove }: IMultiValueInputProps) => {
  const [inputValue, setInputValue] = useState('')
  const addValue = (item: string) => {
    onChange(item)
    setInputValue('')
  }

  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            addValue(inputValue)
          }
        }}
      />
      <div className='flex items-center gap-2'>
        {value.map((item, idx) => (
          <Badge
            key={idx}
            className='bg-gray-600 border group border-gray-600 hover:border-primary hover:text-black transition-all text-white p-2 gap-2 rounded-lg lg:text-md flexBetween group hover:bg-transparent'>
            {item}
            <button
              onClick={() => onRemove(item)}
              className='ml-1 rounded-full p-1 outline-none group-hover:bg-red-500 group-hover:text-white transition-all'>
              <X className='h-3 w-3' />
            </button>
          </Badge>
        ))}
      </div>
    </>
  )
}

export default MultiValueInput
