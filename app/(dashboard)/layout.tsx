import Container from '@/components/layout/Container'
import LeftSideBar from '@/components/layout/LeftSideBar'
import TopBar from '@/components/layout/TopBar'
import React from 'react'
import { Toaster } from 'react-hot-toast'
const DashBoardLayOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full flex max-lg:flexCol'>
      <LeftSideBar />
      <TopBar />
      <div className='flex-1 p-4'>
        <Container>{children}</Container>
      </div>
      <div>
        <Toaster position='top-center' />
      </div>
    </div>
  )
}

export default DashBoardLayOut
