'use client'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { navLinks } from '@/lib/constants'

const DropdownMenu = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className='relative md:hidden'>
      <Menu className='cursor-pointer ' onClick={() => setOpen(!open)} />
      {open && (
        <div className='absolute mt-8 min-w-[100px] flexCol gap-4 p-2 right-0 z-50 border border-blue-400 rounded-xl bg-black/10 backdrop-blur-xl shadow-lg'>
          {navLinks.map((link) => {
            const isActiveLink = pathname === link.url
            return (
              <Link
                onClick={() => setOpen(false)}
                href={link.url}
                key={link.label}
                className={`${
                  isActiveLink ? 'bg-blue-600  text-white' : 'text-foreground'
                } w-full flex items-center gap-10 text-lg p-4 rounded-xl hover:bg-blue-400  hover:text-white transition-all`}>
                {link.icon}
                <p>{link.label}</p>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default DropdownMenu
