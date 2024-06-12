'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'

import { navLinks } from '@/lib/constants'
import { Menu } from 'lucide-react'
import DropdownMenu from './DropdownMenu'

const TopBar = () => {
  const pathname = usePathname()
  return (
    <div className='sticky z-20 top-0 w-full flexBetween gap-4 p-4 bg-blue-400/60 shadow-xl lg:hidden'>
      <h1 className='font-bold tracking-wider text-2xl'>Tn Tech</h1>
      <div className='flexCenter flex-1 max-md:hidden overflow-x-auto'>
        {navLinks.map((link) => {
          const isActiveLink = pathname === link.url
          return (
            <Link
              href={link.url}
              key={link.label}
              className={`${
                isActiveLink ? 'bg-blue-600 text-white' : 'text-foreground'
              } w-full flexCenter gap-2 px-2 rounded-xl  group transition-all relative flex-col`}>
              <div className='flexCenter gap-2 items-center pt-2 group-hover:text-white'>
                <p>{link.label}</p>
              </div>
              <div
                className={`group-hover:w-full w-0 h-[2px] bg-blue-400 transition-all duration-300 ${
                  isActiveLink && 'group-hover:w-0'
                }`}
              />
            </Link>
          )
        })}
      </div>
      <div className='flex items-center justify-end gap-4'>
        <DropdownMenu />
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  )
}

export default TopBar
