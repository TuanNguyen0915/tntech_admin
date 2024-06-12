import type { Metadata } from 'next'
import { Eczar } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

const eczar = Eczar({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TnTech - Admin Dashboard',
  description: 'Admin Dashboard to manage TnTech',
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={`${eczar.className} min-h-screen max-w-[1920px] mx-auto`} suppressHydrationWarning>{children}</body>
      </html>
    </ClerkProvider>
  )
}
