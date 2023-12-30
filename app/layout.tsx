import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BasicLayout from '@/components/layouts/BasicLayout';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={ inter.className }
          data-theme={ 'mytheme' }>
    <body className={ "bg-green-50  max-h-screen" }>
    <BasicLayout>
      { children }
    </BasicLayout>
    </body>
    </html>
  )
}
