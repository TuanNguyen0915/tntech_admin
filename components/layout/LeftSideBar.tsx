'use client'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { navLinks } from '@/lib/constants'
const LeftSideBar = () => {
  const pathname = usePathname()

  return (
    <div className='h-screen w-[250px] left-0 top-0 sticky py-20 flexCol gap-10 bg-blue-400/60 shadow-xl max-lg:hidden'>
      <h1 className='font-bold tracking-wider text-4xl w-full flexCenter'>Tn Tech</h1>
      <div className='flexCenter flex-col gap-12 flex-1 px-5'>
        {navLinks.map((link) => {
          const isActiveLink = pathname === link.url
          return (
            <Link
              href={link.url}
              key={link.label}
              className={`${
                isActiveLink ? 'bg-blue-600 ml-6 text-white' : 'text-foreground'
              } w-full flex items-center gap-10 text-lg p-4 rounded-xl hover:bg-blue-400  hover:text-white transition-all fsemi`}>
              {link.icon}
              <p>{link.label}</p>
            </Link>
          )
        })}
      </div>
      <div className='w-full px-4 flexCenter'>
        <UserButton
          afterSignOutUrl='/'
          showName
          appearance={{
            elements: {
              userButtonBox: {
                flexDirection: 'row-reverse',
                color: 'white',
              },
            },
          }}
        />
      </div>
    </div>
  )
}

export default LeftSideBar
